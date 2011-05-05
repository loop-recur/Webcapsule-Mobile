Layouts.story = function(id) {
	var win = Titanium.UI.createWindow({backgroundColor: "#ccc"});
	
	var player = Titanium.Media.createVideoPlayer({
		backgroundColor:'#111',
		movieControlStyle:Titanium.Media.VIDEO_CONTROL_DEFAULT,
		scalingMode:Titanium.Media.VIDEO_SCALING_MODE_FILL,
		autoplay: false
	});
	
	var close_button = Titanium.UI.createButton({
		title:'Close',
		height:30,
		width:150,
		top:0,
		right:0
	});
	
	close_button.addEventListener('click', function() {
		if (player.playing) { player.stop(); };
		win.close();
	});
	
	// Currently you have to click the video to start this, which covers the close button's click and ignores the play button.
	// This is why there is no overlay yet - it would cover the player's click.  We can make a play button an invisible view or something.
	// Also, system_buttons in kitchen sink gives us rewind and ff so we might consider it.
	player.addEventListener('click',function() {
		if (player.playing) {
			player.stop();
		} else {
			player.play();
			Helpers.player.timeMonitor(win, player, player.comments, player.photos);
		};
	});
	
	win.add(player);
	win.add(close_button);
	
	App.action(win, "stories#show", {id: id, player: player});
	
};
