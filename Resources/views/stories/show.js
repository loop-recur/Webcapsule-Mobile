Views.stories.show = Views.extend();

Views.stories.show.template = function() {
	var self = this;
	var story = self.source;
	var win = self.win;
	var player = self.params.player;
	
	// TODO: offline
	player.url =  App.file_url+story.video_url;
	
	Helpers.player.comments = story.comments;
	Helpers.player.photos = story.photos;
		
	Views.stories._show_form.render(story, {win: win, player:player});
};
