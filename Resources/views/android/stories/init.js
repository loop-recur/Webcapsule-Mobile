Views.stories.init = Views.extend();

Views.stories.init.template = function() {
	var self = this;
	var video, progress_bar, story;
	var win = self.win;
	var story = self.source;
	
	var recordButton = Titanium.UI.createButton({
		top: 70, left: 10, right: 10, height:"35dp", title: 'Record Video'
	});
	win.add(recordButton);
	
	var saveButton = Titanium.UI.createButton({
	    top: 100, left: 10, right: 10, height:"35dp",
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
	    var intent = Titanium.Android.createIntent({ action: 'android.media.action.VIDEO_CAPTURE' });
	    Titanium.Android.currentActivity.startActivityForResult(intent, function(e) {
	        if (e.error) {
	            Ti.UI.createNotification({
	                duration: Ti.UI.NOTIFICATION_DURATION_LONG,
	                message: 'Error: ' + e.error
	            }).show();
	        } else {
            if (e.resultCode === Titanium.Android.RESULT_OK) {
                videoUri = e.intent.data;
                Ti.UI.createNotification({
                    duration: Ti.UI.NOTIFICATION_DURATION_LONG,
                    message: 'Finished!'
                }).show();
                // note that this isn't a physical file! it's a URI in to the MediaStore.
						    var source = Ti.Filesystem.getFile(videoUri);
								afterRecord(source);
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
	
		progress_bar = Titanium.UI.createActivityIndicator({
			
			type:Titanium.UI.ActivityIndicator.DETERMINANT,
			message:'Uploading',
			min:0,
			max:1,
			zIndex:999,
			value:0,
			width:"240dp",
			top:10,
			height:"0dp",
			color:'black'
		});
		
		App.action(win, "stories#edit", {story : story, upload : target, progress_bar: progress_bar});
		saveVideo();
	};
	
	function saveVideo() {
		App.action(win, "videos#create", {
			video: {name : "movie", upload : video },
			success: function (uploaded_video) {
				if(uploaded_video) {
					var story = Views.stories.form.source;
					story.video_id = uploaded_video.id;
					progress_bar.hide();
				};
			},
			error : function() {
				alert("There was an error uploading, please try again");
				progress_bar.hide();
			},
			http_options : {progress_bar : progress_bar}
		});
	};

	function makeProgressArea() {
		var view = Titanium.UI.createView({
			top:0,
			width:"320dp",
			height:"26dp",
			backgroundColor:'black',
			zIndex:999
		});
		
		var cancel_button = Titanium.UI.createButton({  
			backgroundImage:"images/uploadbar/upload_cancel.png",
	    top:0,
	  	right:0,
	    width:"26dp",
	    height:"26dp"
		});
		
		activity = Titanium.UI.createActivityIndicator({
			top:0,
			left:1,
			height:"26dp",
			width:"26dp"
		});

		activity.show();
		
		var retry_button = Titanium.UI.createButton({  
			backgroundImage:"images/uploadbar/upload_retry.png",
	    top:0,
	  	right:0,
	    width:"26dp",
	    height:"26dp",
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
