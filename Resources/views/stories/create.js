Views.stories.create = function(win, progress) {
	var activeMovie = Titanium.Media.createVideoPlayer({
		media:event.media,
		backgroundColor:'#111',
		movieControlMode:Titanium.Media.VIDEO_CONTROL_DEFAULT,
		movieControlStyle:Titanium.Media.VIDEO_CONTROL_FULLSCREEN,
		scalingMode:Titanium.Media.VIDEO_SCALING_MODE_FILL
	});
	
	Ti.Media.hideCamera();
	
	progress.hide();
	win.add(activeMovie);
};
