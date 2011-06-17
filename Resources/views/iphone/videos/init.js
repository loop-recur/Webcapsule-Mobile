Views.videos.init = Views.extend();

Views.videos.init.template = function() {
	var self = this;
	var video = self.source;
	var win = Titanium.UI.createWindow({backgroundColor: "#ccc"});
	var progress_bar = Helpers.ui.progressBar();
	var quality = Ti.Network.networkType == Ti.Network.NETWORK_WIFI ? Ti.Media.QUALITY_MED : Ti.Media.QUALITY_LOW;
	
	
	Titanium.Media.showCamera({
		success:function(event)
		{
			video.upload = event.media;
			progress_bar.show();
			win.add(progress_bar);
			
			App.action(win, "videos#create", {
				video : video,
				success : function(updated_video) {
					win.remove(progress_bar);
					win.close();
				},
				error : function(errors) {
					alert("There was an error uploading, please try again");
					win.remove(progress_bar);
					win.close();
				},
				http_options : {progress_bar : progress_bar}
			});
		},
		cancel:function() {
			win.close();
		},
		error:function(error)
		{
			alert("can't show");
			win.close();
		},
		mediaTypes: Titanium.Media.MEDIA_TYPE_VIDEO,
		videoQuality:quality
	});
	
	
	win.open();
};