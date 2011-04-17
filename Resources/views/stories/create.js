Views.stories.create = function(win) {
	// programatically hide the camera
	Ti.Media.hideCamera();

	var activeMovie = Titanium.Media.createVideoPlayer({
		media:event.media,
		backgroundColor:'#111',
		movieControlMode:Titanium.Media.VIDEO_CONTROL_DEFAULT,
		movieControlStyle:Titanium.Media.VIDEO_CONTROL_FULLSCREEN,
		scalingMode:Titanium.Media.VIDEO_SCALING_MODE_FILL
	});
	win.add(activeMovie);

	var b = Titanium.UI.createButton({
		title:'Close',
		height:30,
		width:150,
		top:0,
		right:0
	});

	win.add(b);

	b.addEventListener('click', function() {
		win.close();
	});

	Layouts.proof();
};
