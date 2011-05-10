Views.stories.init = Views.extend();

Views.stories.init.template = function() {
	var self = this;
	var story = self.source;
	
	Views.stories._form.render(story, {win: self.params.overlay});

	Layouts.record.toggle_flash(true);
	Layouts.record.toggle_camera_type(true);
	Views.stories._form.toggle_upload(true);
	Views.stories._form.toggle_start_stop(true);
	
	Titanium.Media.showCamera({
		success: function(event){
			story.upload = event.media;
			App.action(self.win, "stories#edit", {story: story});
		},
		cancel:function(){},
		error:function(error)
		{
		},
		overlay:self.params.overlay,
		showControls:false,	// don't show system controls
		mediaTypes:Ti.Media.MEDIA_TYPE_VIDEO,
		videoQuality:Ti.Media.QUALITY_MEDIUM,
		autohide:true
	});	

};
