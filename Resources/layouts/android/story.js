Layouts.story = function(id) {
	// var win = Titanium.UI.createWindow({backgroundImage:'images/app_wide/bg_full.png'});
	
	var player = Titanium.Media.createVideoPlayer({
		movieControlMode:Titanium.Media.VIDEO_CONTROL_DEFAULT,
		scalingMode:Titanium.Media.VIDEO_SCALING_MODE_FILL,
		contentURL:'movie.mp4'
	});
	
	// Ti.API.info("call show");
	// App.action(win, "stories#show", {id: id, player: player});
	// Ti.API.info("open");
	// win.open();
	
	var movieLabel = Titanium.UI.createLabel({
		text:'Do not try this at home',
		width:'auto',
		height:35,
		color:'white',
		font:{fontSize:24,fontFamily:'Helvetica Neue'}
	});

	// add label to view
	player.add(movieLabel);

	// label click
	movieLabel.addEventListener('click',function()
	{
		movieLabel.text = "You clicked the video label. Sweet!";
	});

	player.addEventListener('load',function()
	{
		// animate label
		var t = Titanium.UI.create2DMatrix();
		t = t.scale(3);
		movieLabel.animate({transform:t, duration:500, color:'red'},function()
		{
			var t = Titanium.UI.create2DMatrix();
			movieLabel.animate({transform:t, duration:500, color:'white'});
		});
	});
	
	player.addEventListener('complete',function()
	{
		var dlg = Titanium.UI.createAlertDialog({title:'Movie', message:'Completed!'});
		dlg.addEventListener('click', function(e) {
			player.hide();
			win.close();
		});
		dlg.show();
	});

	player.play();

	win.addEventListener('close', function() {
		player.stop();
	});
};
