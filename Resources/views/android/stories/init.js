Views.stories.init = Views.extend();

Views.stories.init.template = function() {
	var self = this;
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

	/**
	 * When they click this, we'll start the video capture activity and wait to hear back from it.
	 */
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

	/**
	 * When they click this, we'll save the video to the SDCard and tell the user where to find it.
	 */
	saveButton.addEventListener('click', function() {
	    var source = Ti.Filesystem.getFile(videoUri);
	    var target = Ti.Filesystem.getFile('appdata://samplee.3gp');
	    // note: source.exists() will return false, because this is a URI into the MediaStore.
	    // BUT we can still call "copy" to save the data to an actual file
			
			Ti.API.info("------------------------------------------------------HERE------------------------------------------------------------------------------------------------------------------");
	    Ti.API.info(source);
	    Ti.API.info(target);
			source.copy(target.nativePath);
			
			Ti.API.info("------------------------------------------------------HERE------------------------------------------------------------------------------------------------------------------");

	    // Ti.UI.createNotification({
	    //     duration: Ti.UI.NOTIFICATION_DURATION_LONG,
	    //     message: 'Saved to: ' + target.nativePath
	    // }).show();
			
			afterRecord(source);
	});
	
	
	function afterRecord(source) {
		video = source; //{upload : event.media};
		saveVideo();
		App.action(win, "stories#edit", {story : self.source, upload : video});
	};
	
	function saveVideo() {
		var story = Views.stories.form.source;
		
		App.action(win, "videos#create", {
			video: video,
			success: function (uploaded_video) {
				if(uploaded_video) {
					var story = Views.stories.form.source;
					story.video_id = uploaded_video.id;
					alert("Video Uploaded");
				};
			},
			error : function() {
				alert("There was an error uploading, please try again");
			},
			http_options : {}
		});
	};
	
};
