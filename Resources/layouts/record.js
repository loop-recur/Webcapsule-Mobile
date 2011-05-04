Layouts.record = function() {	
	var win = Titanium.UI.createWindow({backgroundColor: "#ccc"});
	
	var overlay = Titanium.UI.createView();
	
	var close_btn = Titanium.UI.createButton({
		backgroundImage:"images/postrecord/return.png",
		height:36,
		width:38,
		top:0,
		left:0
	});

	close_btn.addEventListener('click', function() {
		Ti.Media.hideCamera();
		win.close();
		Layouts.stories();
	});
		
	overlay.add(close_btn);
	
	var camera_flash = Ti.UI.createButton({
		color:'#fff',
		title:"auto",
		left:20,
		top:20,
		height:40,
		width:80,
		backgroundImage:"images/record/BUTT_drk_on.png",
		font:{fontSize:16,fontWeight:'bold',fontFamily:'Helvetica Neue'}
	});
	
	var camera_type = Ti.UI.createButton({
		color:'#fff',
		value:false,
		top:20,
		right:20,
		height:40,
		width:68,
		backgroundImage:"images/postrecord/rotate_cameras.png",
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
		if (cameras[c]==Ti.Media.CAMERA_REAR)
		{
			overlay.add(camera_type);

			camera_type.addEventListener('click',function()
			{
				if (Ti.Media.camera == Ti.Media.CAMERA_FRONT)
				{
					// camera_type.title = "rear";
					Ti.Media.switchCamera(Ti.Media.CAMERA_REAR);
				}
				else
				{
					// camera_type.title = "front";
					Ti.Media.switchCamera(Ti.Media.CAMERA_FRONT);
				}
			});
			break;
		}
	}
	
	overlay.add(camera_flash);

	// TODO: Remove need for branching due to dev.  Mocks are better.
	if(App.isDevelopment) win.add(overlay);
	
	App.action(win, "stories#init", {overlay: overlay});
	win.open();
};
