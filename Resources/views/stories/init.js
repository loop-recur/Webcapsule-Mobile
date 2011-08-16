Views.stories.init = Views.extend();

Views.stories.init.template = function() {
	var self = this;
	var story = self.source;
	var video, progress_bar, bar_area, orientation;
	
	Views.stories._form.render(story, {win: self.params.overlay});

	// Layouts.record.toggle_flash(true);
	Layouts.record.toggle_camera_type(true);
	Views.stories._form.toggle_upload(true);
	Views.stories._form.toggle_start_stop(true);
	Views.stories._form.toggle_record_tray(true);
	
	
	// called below
	self.takeVideo = function() {
		Titanium.Media.showCamera({
			success: function(e) {
				orientation = e.orientation;
				Titanium.Media.saveToPhotoGallery(e.media);
				Titanium.Media.startVideoEditing({
					media: e.media,
					videoQuality: Ti.Media.QUALITY_MED,
					success:afterRecord
				});
			},
			cancel:function(){},
			error:function(error){},
			overlay:self.params.overlay,
			showControls:false,
			mediaTypes:Ti.Media.MEDIA_TYPE_VIDEO,
			autohide:true
		});
	};
	
	var activity = Titanium.UI.createActivityIndicator({
		bottom:14,
		right:14,
		height:26,
		width:26,
		style:Titanium.UI.iPhone.ActivityIndicatorStyle.PLAIN
	});
	self.win.add(activity);
	
	// called from form
	self.chooseVideo = function() {
		Ti.Media.hideCamera();
		activity.show();
		setTimeout(openGallery,1800);
	};
	
	function openGallery() {
		Titanium.Media.openPhotoGallery({
			success: afterRecord,
			cancel:function(){ self.takeVideo(); activity.hide(); Views.stories._form.toggle_upload(true); },
			error:function(error){},
			allowEditing:true,
			videoQuality: Ti.Media.QUALITY_MED,
			mediaTypes:[Ti.Media.MEDIA_TYPE_VIDEO]
		});	
	}
	
	function afterRecord(event) {
		Views.stories._form.toggle_start_stop(false);
		progress_bar = Helpers.ui.progressBar();
		bar_area = makeProgressArea();
		video = {upload : event.media, orientation: Orientation.current(orientation || event.orientation)};
		saveVideo();
		App.action(self.win, "stories#edit", {story : self.source, upload : video.upload});
		self.win.add(bar_area);
	};
	
	function saveVideo() {
		var story = Views.stories._form.source;
		
		App.action(self.win, "videos#create", {
			video: video,
			success: function (uploaded_video) {
				if(uploaded_video) {
					var story = Views.stories._form.source;
					story.video_id = uploaded_video.id;
					self.win.remove(bar_area);
				};
			},
			error : function() {
				alert("There was an error uploading, please try again");
				self.win.remove(bar_area);
			},
			http_options : {progress_bar : progress_bar}
		});
	};
	
	function makeProgressArea() {
		var view = Titanium.UI.createView({
			top:0,
			width:320,
			height:26,
			backgroundColor:'black',
			zIndex:999
		});
		
		var cancel_button = Titanium.UI.createButton({  
			backgroundImage:"images/uploadbar/upload_cancel.png",
	    top:0,
	  	right:0,
	    width:26,
	    height:26
		});
		
		var activity = Helpers.ui.spinner({top:0, left:1});
		
		var retry_button = Titanium.UI.createButton({  
			backgroundImage:"images/uploadbar/upload_retry.png",
	    top:0,
	  	right:0,
	    width:26,
	    height:26,
			visible: false
		});
		
		retry_button.addEventListener("click", function() {
			trySaving();
		});

		cancel_button.addEventListener('click', function() {
			if(Ti.App.current_xhr) Ti.App.current_xhr.abort();
			activity.hide();
			retry_button.visible = true;
			cancel_button.visible = false;
		});
		
		var trySaving = function() {
			cancel_button.visible = true;
			retry_button.visible = false;
			activity.show();
			if(!story.video_id){ saveVideo(); };
		};
		
		view.add(cancel_button);
		view.add(activity);
		view.add(retry_button);
		view.add(progress_bar);
		
		cancel_button.visible = true;
		retry_button.visible = false;
		activity.show();
		
		return view;
	};
	
	self.takeVideo();
	try{ Layouts.geolocation(story); } catch(e){};
	
};
