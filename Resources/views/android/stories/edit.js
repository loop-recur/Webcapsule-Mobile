Views.stories.edit = Views.extend();

Views.stories.edit.template = function() {
	var self = this;
	
	var player = Titanium.Media.createVideoPlayer({
		movieControlMode:Titanium.Media.VIDEO_CONTROL_DEFAULT
	});
	
	if(self.params.upload) {
		player.media = self.params.upload;
	} else {
		player.url = App.file_url+self.source.video_url;
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

	// self.win.add(activeMovie);
	self.win.add(close_btn);
	
	Views.stories.form.render(self.source, {win: player, enable:true, player:player});
};
