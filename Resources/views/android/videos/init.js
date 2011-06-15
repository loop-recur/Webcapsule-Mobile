Views.videos.init = Views.extend();

Views.videos.init.template = function() {
	var self = this;
	var video = self.source;
	var win = Titanium.UI.createWindow({backgroundColor: "#ccc"});

	 // http://developer.android.com/reference/android/provider/MediaStore.html
	function record() {
		var intent = Titanium.Android.createIntent({ action: 'android.media.action.VIDEO_CAPTURE' });
	  Titanium.Android.currentActivity.startActivityForResult(intent, function(e) {
	  	if (e.error) {
				alert("There was an error uploading");
	    } else {
	       if (e.resultCode === Titanium.Android.RESULT_OK) {
					 videoUri = e.intent.data;
		  		 var source = Ti.Filesystem.getFile(videoUri);
					 afterRecord(source);
	       } else {
					alert("Error replying");
	       }
	    }
	 	});
	}


	function afterRecord(source) {
		var target = Ti.Filesystem.getFile('appdata://reply.3gp');
		source.copy(target.nativePath);
		video.upload = target.read();

		
		App.action(win, "videos#create", {
			video : video,
			success : function(updated_video) {
				win.close();
			},
			error : function(errors) {
				alert("There was an error uploading, please try again");
				win.close();
			}
		});
	};

	win.open();
	record();
};