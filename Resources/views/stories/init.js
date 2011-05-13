Views.stories.init = Views.extend();

Views.stories.init.template = function() {
	var self = this;
	var story = self.source;
	
	Views.stories._form.render(story, {win: self.params.overlay});

	Layouts.record.toggle_flash(true);
	Layouts.record.toggle_camera_type(true);
	Views.stories._form.toggle_upload(true);
	Views.stories._form.toggle_start_stop(true);
	
	// called below
	self.takeVideo = function() {
		Titanium.Media.showCamera({
			success: afterRecord,
			cancel:function(){},
			error:function(error){},
			overlay:self.params.overlay,
			showControls:false,	// don't show system controls
			saveToPhotoGallery:true,
			mediaTypes:Ti.Media.MEDIA_TYPE_VIDEO,
			videoQuality:Ti.Media.QUALITY_MEDIUM,
			autohide:false
		});
	};
	
	// called from form
	self.chooseVideo = function() {
		var popoverView;
		var arrowDirection;

		Titanium.Media.openPhotoGallery({
			success: afterRecord,
			cancel:function(){ self.takeVideo(); },
			error:function(error){},
			allowEditing:false,
			popoverView:popoverView,
			arrowDirection:arrowDirection,
			mediaTypes:[Ti.Media.MEDIA_TYPE_VIDEO]
		});
	};
	
	function afterRecord(event) {
		Ti.Media.hideCamera();
		var story = Views.stories._form.source;
		var progress_bar = Helpers.ui.progressBar();
		var video = {upload : event.media};

		App.action(self.win, "videos#create", {
			video: video,
			success: function (uploaded_video) {
				var story = Views.stories._form.source;
				story.video_id = uploaded_video.id;
				self.win.remove(progress_bar);
			},
			error : function() {
				alert("There was an error uploading, please try again");
				self.win.remove(progress_bar);
			},
			http_options : {progress_bar : progress_bar}
		});
		
		Views.stories.edit.win = self.win;
		Views.stories.edit.render(story, {upload : video.upload});
		self.win.add(progress_bar);
	};
	
	self.takeVideo();
	
};
