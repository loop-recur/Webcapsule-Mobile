Views.stories.create = function(win, story, progress) {
	// programatically hide the camera
	Ti.Media.hideCamera();

	var activeMovie = Titanium.Media.createVideoPlayer({
		media:story.upload,
		backgroundColor:'#111',
		movieControlStyle:Titanium.Media.VIDEO_CONTROL_NONE,
		scalingMode:Titanium.Media.VIDEO_SCALING_MODE_FILL,
		autoplay:false
	});

	var close_btn = Titanium.UI.createButton({
		backgroundImage:"images/postrecord/return.png",
		height:36,
		width:38,
		top:3,
		left:3
	});

	close_btn.addEventListener('click', function() {
		win.close();
	});

	win.add(activeMovie);
	win.add(close_btn);
	win.add(progress);
	progress.show();
	Layouts.video_options(win, story);
};
