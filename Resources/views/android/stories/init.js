Views.stories.init = Views.extend();

Views.stories.init.template = function() {
	var self = this;
	var video, progress_bar, story;
	var videoUri;
	var win = self.win;
	var story = self.source;
	
	var recordButton = Titanium.UI.createButton({
		top: 10, left: 10, right: 10, height: 35, title: 'Record Video'
	});
	win.add(recordButton);

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
			value:0
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
};
