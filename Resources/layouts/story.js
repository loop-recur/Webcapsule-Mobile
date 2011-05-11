Layouts.story = function(id) {
	var win = Titanium.UI.createWindow({backgroundColor: "#ccc"});
	
	var player = Titanium.Media.createVideoPlayer({
		backgroundColor:'#111',
		movieControlStyle:Titanium.Media.VIDEO_CONTROL_NONE,
		scalingMode:Titanium.Media.VIDEO_SCALING_MODE_FILL,
		autoplay:false,
		id:"player"
	});
	
	var asset_overlay = Titanium.UI.createView({
		height:180,
		top:20,
		opacity:.8,
		id:"story play asset overlay"
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
		Titanium.API.info("Close button on player");
		win.close();
	});
	
	var play_pause_button = Titanium.UI.createButton({
		backgroundImage:"images/playercontrols/play_btn.png",
		backgroundColor:'black',
		height:36,
		width:38,
		top:200,
		left:0
	});
	
	play_pause_button.addEventListener('click', function() {
		if(player.playing) {
			player.stop();
			play_pause_button.backgroundImage = "images/playercontrols/play_btn.png";		
		} else {
			player.play();
			play_pause_button.backgroundImage = "images/playercontrols/pause_btn.png";
			Helpers.player.timeMonitor(asset_overlay, player, player.comments, player.photos);
		}
	});
		
	win.add(player);
	win.add(asset_overlay);
	win.add(play_pause_button);
	win.add(close_button);
	Titanium.API.info("1) added player, assets overlay, play/pause, close");
	
	App.action(win, "stories#show", {id: id, player: player});
	
};
