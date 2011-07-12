Views.stories.init = Views.extend();

Views.stories.init.template = function() {
	var self = this;
	var story = self.source;
	var video, progress_bar, bar_area;
	
	var quality_selector = Titanium.UI.createSlider({
		min:0,
		max:2,
		width:100,
		height:30,
		top:8
	});
	
	var quality = self.quality || getQuality();
	
	Views.stories._form.render(story, {win: self.params.overlay});

	// Layouts.record.toggle_flash(true);
	Layouts.record.toggle_camera_type(true);
	Views.stories._form.toggle_upload(true);
	Views.stories._form.toggle_start_stop(true);
	Views.stories._form.toggle_record_tray(true);
	
	quality_selector.addEventListener('touchend',function(e)
	{
		var quality = Math.round(e.value);
		switchQualityImage(quality);
		
		if(quality == 0){
			switchQuality(Ti.Media.QUALITY_LOW);
		} else if (quality == 1) {
			switchQuality(Ti.Media.QUALITY_MED);
		} else if (quality == 2) {
			switchQuality(Ti.Media.QUALITY_HIGH);
		}
	});
	
	function switchQualityImage(num) {
		types = {0 : "low", 1 : "med", 2 : "high"};
		var img = "images/quality/"+types[num]+".png";
		quality_selector.thumbImage = img;
		quality_selector.highlightedThumbImage = img;
	}
	
	function switchQuality(qual) {
		quality = qual;		
		
		setTimeout(function(){
			Ti.Media.hideCamera();	
		}, 300);
		
		setTimeout(function(){ 
			self.takeVideo();
			changing = false;
		},2200);
	}
	
	self.params.overlay.add(quality_selector);
	
	// called below
	self.takeVideo = function() {
		Titanium.Media.showCamera({
			success: function(e) {
				Titanium.Media.saveToPhotoGallery(e.media);
				afterRecord(e),
			},
			cancel:function(){},
			error:function(error){},
			overlay:self.params.overlay,
			showControls:false,
			mediaTypes:Ti.Media.MEDIA_TYPE_VIDEO,
			videoQuality:quality,
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
			allowEditing:false,
			videoQuality: quality,
			mediaTypes:[Ti.Media.MEDIA_TYPE_VIDEO]
		});	
	}
	
	function afterRecord(event) {
		Views.stories._form.toggle_start_stop(false);
		progress_bar = Helpers.ui.progressBar();
		bar_area = makeProgressArea();
		
		video = {upload : event.media, orientation: event.orientation};
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
	
	function getQuality() {
		if(Ti.Network.networkType == Ti.Network.NETWORK_WIFI) {
			switchQualityImage(2);
			quality_selector.value = 2;
			return Ti.Media.QUALITY_HIGH;
		} else {
			switchQualityImage(0);
			quality_selector.value = 0;
			return Ti.Media.QUALITY_LOW;
		}
	}
};
