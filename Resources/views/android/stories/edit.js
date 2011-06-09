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
	
	Views.stories.form.render(self.source, {win: player, enable:true, player:player});
};
