Views.stories.show = Views.extend();

Views.stories.show.template = function() {
	var self = this;
	var story = self.source;
	var win = self.win;	
	var url = App.file_url+story.android_url;
	
	Views.stories.show.makePlayer = function() {
		var player = Titanium.Media.createVideoPlayer({
			movieControlMode:Titanium.Media.VIDEO_CONTROL_DEFAULT,
			url:url,
			id: "show player"
		});
		
		var started;
		player.addEventListener('load', function() {
			if(!started) {
				Helpers.player.timeMonitor(player, player, story.comments, story.photos);
				started = true;
			}
		});
		
		win.addEventListener('close', function() {
			player.stop();
			player.hide();
		});
		
		// for really poor design where we ask for the form's source everywhere to get the story.
		Views.stories.form.source = story;
		Views.stories.show_form.render(story, {win: win, player:player});
		player.play();
	};
	
	Views.stories.show.makePlayer();
};
