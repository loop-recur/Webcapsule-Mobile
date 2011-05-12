Views.stories.edit = Views.extend();

Views.stories.edit.template = function() {
	var self = this;
	
	var activeMovie = Titanium.Media.createVideoPlayer({
		media:self.source.upload,
		backgroundColor:'#111',
		movieControlStyle:Titanium.Media.VIDEO_CONTROL_NONE,
		scalingMode:Titanium.Media.VIDEO_SCALING_MODE_FILL,
		autoplay:false
	});
	
	var play_pause_button = Titanium.UI.createButton({
		backgroundImage:"images/playercontrols/play_btn.png",
		backgroundColor:'black',
		height:36,
		width:38,
		top:180,
		left:0,
		visible:false
	});
	
	Views.stories._form.play_pause_toggle = function (state) {
		play_pause_button.visible = state;
	};
	
	play_pause_button.addEventListener('click', function() {
		if(activeMovie.playing) {
			activeMovie.stop();
			play_pause_button.backgroundImage = "images/playercontrols/play_btn.png";		
		} else {
			activeMovie.play();
			play_pause_button.backgroundImage = "images/playercontrols/pause_btn.png";
		}
	});

	var close_btn = Titanium.UI.createButton({
		backgroundImage:"images/postrecord/return.png",
		height:36,
		width:38,
		top:0,
		left:0
	});
	
	close_btn.addEventListener('click', function() {
		self.win.close();
		Layouts.stories();
	});

	self.win.add(activeMovie);
	self.win.add(close_btn);
	self.win.add(play_pause_button);
	
	Views.stories._form.render(self.source, {win: self.win, enable:true});
	Views.stories._form.accept_button_toggle(true);
	Views.stories._form.play_pause_toggle(true);
};
