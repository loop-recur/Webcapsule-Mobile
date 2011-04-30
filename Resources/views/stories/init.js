Views.stories.init = function(win, story) {
	
	var overlay = Titanium.UI.createView();
	
	var close_btn = Titanium.UI.createButton({
		backgroundImage:"images/postrecord/return.png",
		height:36,
		width:38,
		top:40,
		left:3
	});

	close_btn.addEventListener('click', function() {
		win.close();
	});
	
	overlay.add(close_btn);

	var start_stop_button = Titanium.UI.createButton({
		color:'#fff',
		backgroundImage:'images/record/BUTT_grn_on.png',
		backgroundSelectedImage:'images/record/BUTT_grn_off.png',
		backgroundDisabledImage:'images/record/BUTT_gry_on.png',
		top:20,
		width:120,
		height:40,
		font:{fontSize:16,fontWeight:'bold',fontFamily:'Helvetica Neue'},
		title:'Start Video'
	});
	
	start_stop_button.addEventListener('click',function()
	{
		Ti.Media.startVideoCapture();
		start_stop_button.title = "Stop Video";
		start_stop_button.backgroundImage = "images/record/BUTT_red_on.png";
		start_stop_button.backgroundSelectedImage = 'images/record/BUTT_red_off.png';
		camera_type.visible = false;
		camera_flash.visible = false;
	});
	
	var camera_flash = Ti.UI.createButton({
		color:'#fff',
		title:"auto",
		right:20,
		top:60,
		height:40,
		width:80,
		backgroundImage:"images/record/BUTT_drk_on.png",
		font:{fontSize:16,fontWeight:'bold',fontFamily:'Helvetica Neue'}
	});
	
	overlay.add(start_stop_button);
	overlay.add(camera_flash);
	Layouts.video_options(overlay, story);
	
	var camera_type = Ti.UI.createButton({
		color:'#fff',
		title:"front",
		top:20,
		right:20,
		height:40,
		width:80,
		backgroundImage:"images/record/BUTT_drk_on.png",
		font:{fontSize:16,fontWeight:'bold',fontFamily:'Helvetica Neue'}
	});

	var current = Ti.Media.CAMERA_FLASH_AUTO;
	var cameraFlashModes = Ti.Media.availableCameraFlashModes;
	
	camera_flash.addEventListener('click',function()
	{
		if (Ti.Media.cameraFlashMode == Ti.Media.CAMERA_FLASH_AUTO)
		{
			camera_flash.title = "on";
			Ti.Media.cameraFlashMode = Ti.Media.CAMERA_FLASH_ON;
		}
		else if (Ti.Media.cameraFlashMode == Ti.Media.CAMERA_FLASH_ON)
		{
			camera_flash.title = "off";
			Ti.Media.cameraFlashMode = Ti.Media.CAMERA_FLASH_OFF;
		}
		else
		{
			camera_flash.title = "auto";
			Ti.Media.cameraFlashMode = Ti.Media.CAMERA_FLASH_AUTO;
		}
	});

	var cameras = Ti.Media.availableCameras;
	for (var c=0;c<cameras.length;c++)
	{
		// if we have a rear camera ... we add switch button
		if (cameras[c]==Ti.Media.CAMERA_REAR)
		{
			overlay.add(camera_type);

			camera_type.addEventListener('click',function()
			{
				if (Ti.Media.camera == Ti.Media.CAMERA_FRONT)
				{
					camera_type.title = "front";
					Ti.Media.switchCamera(Ti.Media.CAMERA_REAR);
				}
				else
				{
					camera_type.title = "rear";
					Ti.Media.switchCamera(Ti.Media.CAMERA_FRONT);
				}
			});
			break;
		}
	}

	Titanium.Media.showCamera({
		success: function(event){
			var progress = progressBar();
			story.upload = event.media;
			App.action(win, "stories#create", {story: story, progress: progress});
		},
		cancel:function(){},
		error:function(error)
		{
			win.add(overlay);
			win.open();
		},
		overlay:overlay,
		showControls:false,	// don't show system controls
		mediaTypes:Ti.Media.MEDIA_TYPE_VIDEO,
		videoQuality:Ti.Media.QUALITY_640x480,
		autohide:false 	// tell the system not to auto-hide and we'll do it ourself
	});
	
	function progressBar() {
		return Titanium.UI.createProgressBar({
			width:200,
			height:40,
			min:0,
			max:1,
			value:0,
			style:Titanium.UI.iPhone.ProgressBarStyle.PLAIN,
			top:30,
			message:'Uploading',
			font:{fontSize:12, fontWeight:'bold'},
			color:'black'
		});	
	};
};
