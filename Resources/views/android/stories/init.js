Views.stories.init = Views.extend();

Views.stories.init.template = function() {
	var video, progress_bar, bar_area, story;
	var videoUri;
	var win = this.win;
	
	var recordButton = Titanium.UI.createButton({
	    top: 100, left: 10, right: 10, height: 35, title: 'Record Video'
	});
	win.add(recordButton);
	
	var saveButton = Titanium.UI.createButton({
	    top: 100, left: 10, right: 10, height: 35,
	    title: 'Save Recorded Video', visible: false
	});
	win.add(saveButton);

	/**
	 * We'll use the following variable to keep track of the result of our recording action.
	 */
	var videoUri = null;
	var videoIntent = null;

	recordButton.addEventListener('click', function() {
	    // http://developer.android.com/reference/android/provider/MediaStore.html
	    var intent = Titanium.Android.createIntent({ 
				action: 'android.media.action.VIDEO_CAPTURE' 
			});
			
	    Titanium.Android.currentActivity.startActivityForResult(intent, function(e) {
	        if (e.error) {
	            Ti.UI.createNotification({
	                duration: Ti.UI.NOTIFICATION_DURATION_LONG,
	                message: 'Error: ' + e.error
	            }).show();
	        } else {
	            if (e.resultCode === Titanium.Android.RESULT_OK) {
	                videoUri = e.intent.data;
									videoIntent = e.intent;
	                Ti.UI.createNotification({
	                    duration: Ti.UI.NOTIFICATION_DURATION_LONG,
	                    message: 'Video captured; save it!'
	                }).show();
	                // note that this isn't a physical file! it's a URI in to the MediaStore.
	                saveButton.visible = true;
	            } else {
	                Ti.UI.createNotification({
	                    duration: Ti.UI.NOTIFICATION_DURATION_LONG,
	                    message: 'Canceled/Error? Result code: ' + e.resultCode
	                }).show();
	            }
	        }
	    });
	});
	
	function afterRecord(source) {
		var target = Ti.Filesystem.getFile('appdata://movie.3gp');
		source.copy(target.nativePath);
		video = target.read();
		story = {};
		
		progress_bar = Titanium.UI.createProgressBar({
			width:240,
			top:10,
			height:0,
			min:0,
			max:1,
			value:0,
			color:'black'
		});	

		progress_bar.show();
		bar_area = makeProgressArea();
		
		saveVideo();
		win.add(bar_area);
		App.action(win, "stories#edit", {story : story, upload : video});		
	};
	
	function saveVideo() {
		App.action(win, "videos#create", {
			video: {name : "movie", upload : video },
			success: function (uploaded_video) {
				if(uploaded_video) {
					var story = Views.stories.form.source;
					story.video_id = uploaded_video.id;
					// bar_area.visible = false;
				};
			},
			error : function() {
				alert("There was an error uploading, please try again");
				bar_area.visible = false;
			},
			http_options : {}
		});
	};

	function makeProgressArea() {
		var view = Titanium.UI.createView({
			top:0,
			width:320,
			height:26,
			backgroundColor:'black',
			zIndex:999
		});
		
		var cancel_button = Titanium.UI.createButton({  
			backgroundImage:"images/uploadbar/upload_cancel.png",
	    top:0,
	  	right:0,
	    width:26,
	    height:26
		});
		
		var activity = Titanium.UI.createActivityIndicator({
			top:0,
			left:1,
			height:26,
			width:26
		});

		activity.show();
		
		var retry_button = Titanium.UI.createButton({  
			backgroundImage:"images/uploadbar/upload_retry.png",
	    top:0,
	  	right:0,
	    width:26,
	    height:26,
			visible: false
		});
		
		retry_button.addEventListener("click", function() {
			trySaving();
		});
	
		cancel_button.addEventListener('click', function() {
			if(Ti.App.current_xhr) Ti.App.current_xhr.abort();
			activity.hide();
			retry_button.visible = true;
			cancel_button.visible = false;
		});
		
		var trySaving = function() {
			cancel_button.visible = true;
			retry_button.visible = false;
			activity.show();
			if(!story.video_id){ saveVideo(); };
		};
		
		view.add(cancel_button);
		view.add(activity);
		view.add(retry_button);
		view.add(progress_bar);
		
		cancel_button.visible = true;
		retry_button.visible = false;
		activity.show();
		
		return view;
	};
};
