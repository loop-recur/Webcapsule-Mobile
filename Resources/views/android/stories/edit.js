Views.stories.edit = Views.extend();

Views.stories.edit.template = function() {
	var self = this;
	
	var activeMovie = Titanium.Media.createVideoPlayer({
		backgroundColor:'#111',
		movieControlStyle:Titanium.Media.VIDEO_CONTROL_NONE,
		scalingMode:Titanium.Media.VIDEO_SCALING_MODE_FILL,
		autoplay:false
	});
	
	if(self.params.upload) {
		activeMovie.media = self.params.upload;
	} else {
		activeMovie.url = App.file_url+self.source.video_url;
	};

	var close_btn = Titanium.UI.createButton({
		backgroundImage:"images/postrecord/return.png",
		height:26,
		width:26,
		top:5,
		left:5
	});
	
	close_btn.addEventListener('click', function() {
		self.win.close();
		Layouts.stories();
	});

	self.win.add(activeMovie);
	self.win.add(close_btn);
	
	Views.stories.form.render(self.source, {win: self.win, enable:true, player:activeMovie});
	Views.stories.form.accept_button_toggle(true);
	if(Layouts.story.toggle_compact_play_controls) Layouts.story.toggle_compact_play_controls(false);
	Views.stories.form.player_controls_toggle(true);
};
