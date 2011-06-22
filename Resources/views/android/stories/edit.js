Views.stories.edit = Views.extend();

Views.stories.edit.template = function() {
	var self = this;
	var win = self.win;
	var bar_area = self.params.bar_area;
	var url = self.params.upload ? self.params.upload.nativePath : App.file_url+self.source.android_url;
	// alert(self.params.upload.nativePath);
	
	var player = Titanium.Media.createVideoPlayer({
		movieControlMode:Titanium.Media.VIDEO_CONTROL_DEFAULT,
		url: url
	});
	
	win.addEventListener('close', function() {
		player.stop();
		player.hide();
	});
	
	player.play();
	
	Views.stories.form.render(self.source, {win: win, player:player});
	if(self.params.progress_bar) self.params.progress_bar.show();
};
