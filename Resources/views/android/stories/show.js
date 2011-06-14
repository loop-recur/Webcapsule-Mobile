Views.stories.show = Views.extend();

Views.stories.show.template = function() {
	var self = this;
	var story = self.source;
	var win = self.win;	
	var url = App.file_url+story.android_url;
	
	var player = Titanium.Media.createVideoPlayer({
		movieControlMode:Titanium.Media.VIDEO_CONTROL_DEFAULT,
		url:url
	});
	
	win.addEventListener('close', function() {
		player.stop();
		player.hide();
	});
	
	var started;
	player.addEventListener('load', function() {
		Ti.API.info("loaded!");
		if(!started) {
			Helpers.player.timeMonitor(player, player, story.comments, story.photos);
			started = true;
		}
	});

	player.play();
	
	Views.stories.show_form.render(story, {win: win, player:player});
};
