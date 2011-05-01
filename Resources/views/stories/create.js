Views.stories.create = Views.extend();

Views.stories.create.template = function() {
	var self = this;
	
	Ti.Media.hideCamera();

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
		top:3,
		left:3
	});

	close_btn.addEventListener('click', function() {
		self.win.close();
	});

	self.win.add(activeMovie);
	self.win.add(close_btn);
	self.win.add(self.params.progress);
	
	Views.stories._form.render(self.source, {win: self.win});
	
	progress.show();
};
