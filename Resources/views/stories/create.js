Views.stories.create = function(win, story, progress) {
	// programatically hide the camera
	Ti.Media.hideCamera();

	var activeMovie = Titanium.Media.createVideoPlayer({
		media:story.upload,
		backgroundColor:'#111',
		movieControlMode:Titanium.Media.VIDEO_CONTROL_DEFAULT,
		movieControlStyle:Titanium.Media.VIDEO_CONTROL_FULLSCREEN,
		scalingMode:Titanium.Media.VIDEO_SCALING_MODE_FILL,
		autoplay:false
	});

	var close_btn = Titanium.UI.createButton({
		title:'Close',
		height:30,
		width:150,
		top:0,
		right:0
	});

	close_btn.addEventListener('click', function() {
		win.close();
	});

	win.add(activeMovie);
	win.add(close_btn);
	win.add(progress);
	progress.show();
	Layouts.proof(win);
};
