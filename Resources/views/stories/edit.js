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

	var close_btn = Titanium.UI.createButton({
		backgroundImage:"images/postrecord/return.png",
		height:36,
		width:38,
		top:180,
		left:0
	});
	
	close_btn.addEventListener('click', function() {
		self.win.close();
		Layouts.stories();
	});

	self.win.add(activeMovie);
	self.win.add(close_btn);
	
	Views.stories._form.render(self.source, {win: self.win});
};
