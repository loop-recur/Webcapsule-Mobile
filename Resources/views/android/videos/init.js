Views.videos.init = Views.extend();

Views.videos.init.template = function() {
	var self = this;
	var video = self.source;
	var player = self.win;

	 // http://developer.android.com/reference/android/provider/MediaStore.html
	function record() {
		var intent = Titanium.Android.createIntent({ action: 'android.media.action.VIDEO_CAPTURE' });
	  Titanium.Android.currentActivity.startActivityForResult(intent, function(e) {
	  	if (e.error) {
				alert("There was an error uploading");
	    } else {
				if (e.resultCode === Titanium.Android.RESULT_OK) {
					 Views.stories.show.makePlayer();
					 videoUri = e.intent.data;
					 var source = Ti.Filesystem.getFile(videoUri);
					 afterRecord(source);
	       } else {
					alert("Error replying");
	       }
	    }
	 	});
	};

	function afterRecord(source) {
		var target = Ti.Filesystem.getFile('appdata://reply.3gp');
		source.copy(target.nativePath);
		video.upload = target.read();
		
		var progress_bar = Titanium.UI.createActivityIndicator({
			
			type:Titanium.UI.ActivityIndicator.DETERMINANT,
			message:'Uploading',
			min:0,
			max:1,
			zIndex:999,
			value:0
		});
		
		progress_bar.show();
		
		App.action(null, "videos#create", {
			video : video,
			success : function(updated_video) {
				progress_bar.hide();
			},
			error : function(errors) {
				alert("There was an error uploading, please try again");
				progress_bar.hide();
			},
			http_options : {progress_bar : progress_bar}
		});
	};

	record();
};