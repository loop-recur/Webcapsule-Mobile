Views.stories.create = function(win, story) {
	// programatically hide the camera
	Ti.Media.hideCamera();

	var activeMovie = Titanium.Media.createVideoPlayer({
		media:story.upload,
		backgroundColor:'#111',
		movieControlMode:Titanium.Media.VIDEO_CONTROL_DEFAULT,
		movieControlStyle:Titanium.Media.VIDEO_CONTROL_FULLSCREEN,
		scalingMode:Titanium.Media.VIDEO_SCALING_MODE_FILL
	});
	
	var a = Titanium.UI.createButton({
		title:'Play',
		height:30,
		width:150,
		top:0,
		right:50
	});
	
	win.add(a);

	var b = Titanium.UI.createButton({
		title:'Close',
		height:30,
		width:150,
		top:0,
		right:0
	});

	win.add(b);
	
	a.addEventListener("click", function() {
		win.add(activeMovie);
	})

	b.addEventListener('click', function() {
		win.close();
	});
	

	Layouts.proof();
};
