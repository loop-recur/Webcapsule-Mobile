Views.stories.init = Views.extend();

Views.stories.init.template = function() {
	var win = this.win;

	var recordButton = Titanium.UI.createButton({
	    top: 100, left: 10, right: 10, height: 35, title: 'Record Video'
	});
	win.add(recordButton);
	var shareButton = Titanium.UI.createButton({
	    top: 50, left: 10, right: 10, height: 35,
	    title: 'Share Recorded Video', visible: false
	});
	win.add(shareButton);
	var saveButton = Titanium.UI.createButton({
	    top: 100, left: 10, right: 10, height: 35,
	    title: 'Save Recorded Video', visible: false
	});
	win.add(saveButton);

	/**
	 * We'll use the following variable to keep track of the result of our recording action.
	 */
	var videoUri = null;

	/**
	 * When they click this, we'll start the video capture activity and wait to hear back from it.
	 */
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
	                    message: 'Video captured; now share or save it!'
	                }).show();
	                // note that this isn't a physical file! it's a URI in to the MediaStore.
	                shareButton.visible = true;
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
	 * When they click this, we'll start an activity with an intent chooser to let the user
	 * choose how they want to share their video.
	 */
	shareButton.addEventListener('click', function() {
	    var intent = Titanium.Android.createIntent({
	        action: Titanium.Android.ACTION_SEND,
	        type: 'application/octet-stream'
	    });
	    intent.putExtraUri(Titanium.Android.EXTRA_STREAM, videoUri);
	    Titanium.Android.currentActivity.startActivity(
	            Titanium.Android.createIntentChooser(intent, 'Send Video via'));
	});

	/**
	 * When they click this, we'll save the video to the SDCard and tell the user where to find it.
	 */
	saveButton.addEventListener('click', function() {
	    var source = Ti.Filesystem.getFile(videoUri);
	    var target = Ti.Filesystem.getFile('appdata://sample.3gp');
	    // note: source.exists() will return false, because this is a URI into the MediaStore.
	    // BUT we can still call "copy" to save the data to an actual file
	    source.copy(target.nativePath);

	    Ti.UI.createNotification({
	        duration: Ti.UI.NOTIFICATION_DURATION_LONG,
	        message: 'Saved to: ' + target.nativePath
	    }).show();
	});
};