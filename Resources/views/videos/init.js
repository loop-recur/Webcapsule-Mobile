Views.videos.init = Views.extend();

Views.videos.init.template = function() {
	var self = this;
	var video = self.source;
	var win = Titanium.UI.createWindow({backgroundColor: "#ccc"});
	var progress_bar = Helpers.ui.progressBar();
	
	
	Titanium.Media.showCamera({
		success:function(event)
		{
			video.upload = event.media;
			progress_bar.show();
			win.add(progress_bar);
			
			App.action(win, "videos#create", {
				video : video,
				success : function(updated_video) {
					alert("it was uploaded!");
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
		cancel:function() {},
		error:function(error)
		{
			alert("can't show");
		},
		mediaTypes: Titanium.Media.MEDIA_TYPE_VIDEO,
		videoQuality:Ti.Media.QUALITY_MEDIUM
	});
	
	
	win.open();
}