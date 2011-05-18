Views.stories.edit = Views.extend();

Views.stories.edit.template = function() {
	var self = this;
	var story = self.source;
	
	var activeMovie = Titanium.Media.createVideoPlayer({
		backgroundColor:'#111',
		movieControlStyle:Titanium.Media.VIDEO_CONTROL_NONE,
		scalingMode:Titanium.Media.VIDEO_SCALING_MODE_FILL,
		autoplay:false
	});
	
	if(self.params.upload) {
		activeMovie.media = self.params.upload;
	} else {
		activeMovie.url = App.file_url+story.video_url;
	};

	var close_btn = Titanium.UI.createButton({
		backgroundImage:"images/postrecord/return.png",
		height:39,
		width:45,
		top:0,
		left:0
	});
	
	close_btn.addEventListener('click', function() {
		self.win.close();
		Layouts.stories();
	});

	self.win.add(activeMovie);
	self.win.add(close_btn);
	
	Views.stories._form.render(story, {win: self.win, enable:true, player:activeMovie});
	Views.stories._form.accept_button_toggle(true);
	Views.stories._form.player_controls_toggle(true);
};
