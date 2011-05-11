Views.stories.show = Views.extend();

Views.stories.show.template = function() {
	var self = this;
	var story = self.source;
	var win = self.win;
	var player = self.params.player;
	
	// TODO: test this on phone.
	
	if(story.upload) {
		player.media = story.upload;
	} else {
		player.url = App.file_url+story.video_url;
	};
	
	player.comments = story.comments;
	player.photos = story.photos;

	Views.stories._show_form.render(story, {win: win, player:player});

	win.open();
};
