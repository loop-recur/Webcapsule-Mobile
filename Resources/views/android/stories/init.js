Views.stories.init = Views.extend();

Views.stories.init.template = function() {
	var win = this.win;
	
	var b = Titanium.UI.createButton({
		title:'Record Movie',
		width:200,
		height:40,
		top:20
	});
	win.add(b);

	b.addEventListener('click', function()
	{
		if (b.title == 'Play Movie')
		{
			var activeMovie = Titanium.Media.createVideoPlayer({
				backgroundColor:'#111',
				movieControlMode:Titanium.Media.VIDEO_CONTROL_DEFAULT,
				scalingMode:Titanium.Media.VIDEO_SCALING_ASPECT_FILL,
				//contentURL:movieFile.nativePath
				media:movieFile			// note you can use either contentURL to nativePath or the file object
			});
			activeMovie.play();

			activeMovie.addEventListener('complete', function()
			{
				movieFile.deleteFile();
				b.title = 'Record Movie';
			});

			if (parseFloat(Titanium.Platform.version) >= 3.2)
			{
				win.add(activeMovie);
			}
		}
		else
		{
			Titanium.Media.showCamera({

				success:function(event)
				{
					var video = event.media;
					movieFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'mymovie.mov');
					movieFile.write(video);
					b.title = 'Play Movie';
				},
				cancel:function()
				{

				},
				error:function(error)
				{
					// create alert
					var a = Titanium.UI.createAlertDialog({title:'Video'});

					// set message
					if (error.code == Titanium.Media.NO_VIDEO)
					{
						a.setMessage('Device does not have video recording capabilities');
					}
					else
					{
						a.setMessage('Unexpected error: ' + error.code);
					}

					// show alert
					a.show();
				},
				mediaTypes: Titanium.Media.MEDIA_TYPE_VIDEO,
				videoMaximumDuration:10000,
				videoQuality:Titanium.Media.QUALITY_HIGH
			});

		}

	});

	
	
	
	
	// var self = this;
	// var story = self.source;
	// var video, progress_bar, bar_area;
	// var quality = Ti.Network.networkType == Ti.Network.NETWORK_WIFI ? Ti.Media.QUALITY_MED : Ti.Media.QUALITY_LOW;
	// 
	// Views.stories.form.render(story, {win: self.params.overlay});
	// 
	// // Layouts.record.toggle_flash(true);
	// Layouts.record.toggle_camera_type(true);
	// Views.stories.form.toggle_upload(true);
	// Views.stories.form.toggle_start_stop(true);
	// Views.stories.form.toggle_record_tray(true);
	// 
	// // called below
	// self.takeVideo = function() {
	// 	Titanium.Media.showCamera({
	// 		success: function(e) {
	// 			Titanium.Media.saveToPhotoGallery(e.media);
	// 			afterRecord(e),
	// 		},
	// 		cancel:function(){},
	// 		error:function(error){},
	// 		overlay:self.params.overlay,
	// 		showControls:false,
	// 		mediaTypes:Ti.Media.MEDIA_TYPE_VIDEO,
	// 		videoQuality:quality,
	// 		autohide:true
	// 	});
	// };
	// 
	// var activity = Titanium.UI.createActivityIndicator({
	// 	bottom:14,
	// 	right:14,
	// 	height:26,
	// 	width:26,
	// 	style:Titanium.UI.iPhone.ActivityIndicatorStyle.PLAIN
	// });
	// self.win.add(activity);
	// 
	// // called from form
	// self.chooseVideo = function() {
	// 	Ti.Media.hideCamera();
	// 	activity.show();
	// 	setTimeout(openGallery,1800);
	// };
	// 
	// function openGallery() {
	// 	Titanium.Media.openPhotoGallery({
	// 		success: afterRecord,
	// 		cancel:function(){ self.takeVideo(); activity.hide(); Views.stories.form.toggle_upload(true); },
	// 		error:function(error){},
	// 		allowEditing:false,
	// 		videoQuality: quality,
	// 		mediaTypes:[Ti.Media.MEDIA_TYPE_VIDEO]
	// 	});	
	// }
	// 
	// function afterRecord(event) {
	// 	Views.stories.form.toggle_start_stop(false);
	// 	progress_bar = Helpers.ui.progressBar();
	// 	bar_area = makeProgressArea();
	// 	
	// 	video = {upload : event.media};
	// 	saveVideo();
	// 	App.action(self.win, "stories#edit", {story : self.source, upload : video.upload});
	// 	self.win.add(bar_area);
	// };
	// 
	// function saveVideo() {
	// 	var story = Views.stories.form.source;
	// 	
	// 	App.action(self.win, "videos#create", {
	// 		video: video,
	// 		success: function (uploaded_video) {
	// 			if(uploaded_video) {
	// 				var story = Views.stories.form.source;
	// 				story.video_id = uploaded_video.id;
	// 				self.win.remove(bar_area);
	// 			};
	// 		},
	// 		error : function() {
	// 			alert("There was an error uploading, please try again");
	// 			self.win.remove(bar_area);
	// 		},
	// 		http_options : {progress_bar : progress_bar}
	// 	});
	// };
	// 
	// function makeProgressArea() {
	// 	var view = Titanium.UI.createView({
	// 		top:0,
	// 		width:320,
	// 		height:26,
	// 		backgroundColor:'black',
	// 		zIndex:999
	// 	});
	// 	
	// 	var cancel_button = Titanium.UI.createButton({  
	// 		backgroundImage:"images/uploadbar/upload_cancel.png",
	//     top:0,
	//   	right:0,
	//     width:26,
	//     height:26
	// 	});
	// 	
	// 	var activity = Helpers.ui.spinner({top:0, left:1});
	// 	
	// 	var retry_button = Titanium.UI.createButton({  
	// 		backgroundImage:"images/uploadbar/upload_retry.png",
	//     top:0,
	//   	right:0,
	//     width:26,
	//     height:26,
	// 		visible: false
	// 	});
	// 	
	// 	retry_button.addEventListener("click", function() {
	// 		trySaving();
	// 	});
	// 
	// 	cancel_button.addEventListener('click', function() {
	// 		if(Ti.App.current_xhr) Ti.App.current_xhr.abort();
	// 		activity.hide();
	// 		retry_button.visible = true;
	// 		cancel_button.visible = false;
	// 	});
	// 	
	// 	var trySaving = function() {
	// 		cancel_button.visible = true;
	// 		retry_button.visible = false;
	// 		activity.show();
	// 		if(!story.video_id){ saveVideo(); };
	// 	};
	// 	
	// 	view.add(cancel_button);
	// 	view.add(activity);
	// 	view.add(retry_button);
	// 	view.add(progress_bar);
	// 	
	// 	cancel_button.visible = true;
	// 	retry_button.visible = false;
	// 	activity.show();
	// 	
	// 	return view;
	// };
	// 
	// self.takeVideo();
	// try{ Layouts.geolocation(story); } catch(e){};
};
