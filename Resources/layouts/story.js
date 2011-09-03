Layouts.story = function(id) {
	var win = Titanium.UI.createWindow({backgroundImage:'images/app_wide/bg_full.png'});
	var view = Titanium.UI.createView({});
	
	var activity = Helpers.ui.spinner({});
	view.add(activity);
	
	var player = Titanium.Media.createVideoPlayer({
		movieControlStyle:Titanium.Media.VIDEO_CONTROL_FULLSCREEN,
		scalingMode:Titanium.Media.VIDEO_SCALING_MODE_FILL,
		height: 533,
		autoplay:true,
		id:"player"
	});

	var asset_overlay = Titanium.UI.createView({
		height:180,
		top:20,
		id:"story play asset overlay"
	});
	
	var close_button = Titanium.UI.createButton({
		backgroundImage:"images/postrecord/return.png",
		height:26,
		width:26,
		top:28,
		left:5
	});
	
	close_button.addEventListener('click', function() {
		Views.photos.create.source = [];
		Views.tags.create.source = [];
		if (player.playing) { player.stop(); };
		win.close();
	});
	
	var compact_play_controls = Titanium.UI.createView({
		backgroundImage:"images/playercontrols/player_overlay-compact.png",
		height:61,
		width:176,
		zIndex:150,
		visible:false
	});
	
	Layouts.story.toggle_compact_play_controls = function(state) {
		compact_play_controls.visible = state;
	};
	
	var play_pause_button = Titanium.UI.createButton({
		backgroundImage:"images/playercontrols/play_btn.png",
		height:32,
		width:32
	});
	
	var ff_button = Titanium.UI.createButton({
		backgroundImage:"images/playercontrols/ffw_btn.png",
		height:32,
		width:32,
		right:20
	});
	
	ff_button.addEventListener('click', function() {
		player.stop();
		player.initialPlaybackTime = player.currentPlaybackTime + 5;
		player.play();
		updateControls();
	});
	
	var rw_button = Titanium.UI.createButton({
		backgroundImage:"images/playercontrols/rw_btn.png",
		height:32,
		width:32,
		left:20
	});
	
	rw_button.addEventListener('click', function() {
		player.stop();
		player.initialPlaybackTime = player.currentPlaybackTime - 5;
		player.play();
		updateControls();
	});
	
	win.addEventListener('click', function() {
		compact_play_controls.opacity = 1;
		updateControls(3400);
	});
	
	
	var set = false;
	function updateControls(time) {
		if(!time) time = 1200;
		
		if(player.playbackState != 1) {
			play_pause_button.backgroundImage = "images/playercontrols/play_btn.png";
		} else {
			play_pause_button.backgroundImage = "images/playercontrols/pause_btn.png";
			
			if(!set) {
				set = true;
				setTimeout(function(){
					set = false;
					compact_play_controls.animate({opacity:0,duration:1000});
				}, time);
			}
		}
	}
	
	var started;
	var time_monitor = Helpers.player.timeMonitor(asset_overlay, player);
	play_pause_button.addEventListener('click', function() {
		if(player.playbackState != 1) {
			player.play();
			if(!started) {
				time_monitor.start();
				started = true;
			}
		} else {
			player.pause();
		}
		updateControls();
	});
	
	player.addEventListener('complete',function() {
		player.stop();
		play_pause_button.backgroundImage = "images/playercontrols/play_btn.png";
	});

	view.add(player);
	win.add(view);
	win.add(asset_overlay);
	compact_play_controls.add(play_pause_button);
	compact_play_controls.add(ff_button);
	compact_play_controls.add(rw_button);	
	win.add(compact_play_controls);
	win.add(close_button);
	
	App.action(win, "stories#show", {id: id, player: player});
	win.open();
};
