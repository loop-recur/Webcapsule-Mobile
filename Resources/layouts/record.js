Layouts.record = function(story) {	
	var win = Titanium.UI.createWindow({
		backgroundColor: "white",
		id:"record.js window"
	});
	
	var overlay = Titanium.UI.createView();
	
	var close_btn = Titanium.UI.createButton({
		backgroundImage:"images/postrecord/return.png",
		height:26,
		width:26,
		top:5,
		left:5
	});

	close_btn.addEventListener('click', function(e) {
		Views.photos.create.source = [];
		Views.tags.create.source = [];
		Ti.Media.hideCamera();
		win.close();
		Layouts.stories();
	});

	overlay.add(close_btn);
	Layouts.close_btn = close_btn;
	
	var camera_flash = Ti.UI.createButton({
		color:'#fff',
		title:"auto",
		top:20,
		height:40,
		width:80,
		backgroundImage:"images/record/BUTT_drk_on.png",
		font:{fontSize:16,fontWeight:'bold',fontFamily:'Helvetica Neue'},
		visible:false
	});
	
	Layouts.record.toggle_flash = function(state) {
		camera_flash.visible = state;
	};

	Layouts.record.toggle_camera_type = function(state) {
		camera_type.visible = state;
	};
	
	var camera_type = Ti.UI.createButton({
		color:'#fff',
		value:false,
		height:26,
		width:26,
		top:5,
		right:5,
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
	

	var quality_label = Titanium.UI.createLabel({
		text:'Medium Quality',
		top:40,
		width:80,
		height:20,
		color:'white',
		backgroundColor:"black",
		textAlign:'center',
		font:{fontFamily:'Arial',fontWeight:'bold',fontSize:10}
	});
	
	var quality_selector = Titanium.UI.createSlider({
		min:0,
		max:2,
		value:1,
		width:100,
		height:30,
		top:8
	});
	
	quality_selector.addEventListener('change',function(e)
	{
		var quality = Math.round(e.value);
		
		if(quality == 0){
			quality_label.text = "Low Quality";
		} else if (quality == 1) {
			quality_label.text = "Medium Quality";
		} else if (quality == 2) {
			quality_label.text = "High Quality";
		}
	});
	
	overlay.add(quality_selector);
	overlay.add(quality_label);
	

	// TODO: Remove need for branching due to dev.  Mocks are better.
	if(App.isDevelopment) win.add(overlay);
	
	App.action(win, "stories#init", {overlay: overlay, story: story});
	win.open();
};
