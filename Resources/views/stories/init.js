Views.stories.init = Views.extend();

Views.stories.init.template = function() {
	var self = this;
	var story = self.source;
	var video, progress_bar, bar_area;
	
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
		progress_bar = Helpers.ui.progressBar();
		bar_area = makeProgressArea();
		video = {upload : event.media};
		
		saveVideo();
		App.action(self.win, "stories#edit", {story : story, upload : video.upload});
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
		
		var activity = Titanium.UI.createActivityIndicator({
			top:0, 
			left:0,
			height:26,
			width:26,
			style:Titanium.UI.iPhone.ActivityIndicatorStyle.PLAIN
		});
		
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
	
};
