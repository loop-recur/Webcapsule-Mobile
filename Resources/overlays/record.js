var win = Titanium.UI.currentWindow;

var button = Titanium.UI.createButton({
	color:'black',
	backgroundImage:'../images/BUTT_grn_on.png',
	backgroundSelectedImage:'../images/BUTT_grn_off.png',
	backgroundDisabledImage: '../images/BUTT_gry_on.png',
	bottom:10,
	width:120,
	height:40,
	font:{fontSize:16,fontWeight:'bold',fontFamily:'Helvetica Neue'},
	title:'Start Video'
});

var overlay = Titanium.UI.createView();
overlay.add(button);

var cameraFlash = Ti.UI.createButton({
	color:'black',
	title:"auto",
	left:20,
	top:20,
	height:40,
	width:80,
	backgroundImage:"../images/BUTT_drk_on.png",
	font:{fontSize:16,fontWeight:'bold',fontFamily:'Helvetica Neue'}
});
overlay.add(cameraFlash);

var current = Ti.Media.CAMERA_FLASH_AUTO;
var cameraFlashModes = Ti.Media.availableCameraFlashModes;
cameraFlash.addEventListener('click',function()
{
	if (Ti.Media.cameraFlashMode == Ti.Media.CAMERA_FLASH_AUTO)
	{
		cameraFlash.title = "on";
		Ti.Media.cameraFlashMode = Ti.Media.CAMERA_FLASH_ON;
	}
	else if (Ti.Media.cameraFlashMode == Ti.Media.CAMERA_FLASH_ON)
	{
		cameraFlash.title = "off";
		Ti.Media.cameraFlashMode = Ti.Media.CAMERA_FLASH_OFF;
	}
	else
	{
		cameraFlash.title = "auto";
		Ti.Media.cameraFlashMode = Ti.Media.CAMERA_FLASH_AUTO;
	}
});

var cameraType = Ti.UI.createButton({
	color:'black',
	title:"front",
	top:20,
	right:20,
	height:40,
	width:80,
	backgroundImage:"../images/BUTT_drk_on.png",
	font:{fontSize:16,fontWeight:'bold',fontFamily:'Helvetica Neue'}
});

var cameras = Ti.Media.availableCameras;
for (var c=0;c<cameras.length;c++)
{
	// if we have a rear camera ... we add switch button
	if (cameras[c]==Ti.Media.CAMERA_REAR)
	{
		overlay.add(cameraType);

		cameraType.addEventListener('click',function()
		{
			if (Ti.Media.camera == Ti.Media.CAMERA_FRONT)
			{
				cameraType.title = "front";
				Ti.Media.switchCamera(Ti.Media.CAMERA_REAR);
			}
			else
			{
				cameraType.title = "rear";
				Ti.Media.switchCamera(Ti.Media.CAMERA_FRONT);
			}
		});
		break;
	}
}

button.addEventListener('click',function()
{
	Ti.Media.startVideoCapture();
	button.title = "Stop Video";
	button.backgroundImage = "../images/BUTT_red_on.png";
	button.backgroundSelectedImage = '../images/BUTT_red_off.png';
	cameraType.visible = false;
	cameraFlash.visible = false;
});

Titanium.Media.showCamera({

	success:function(event)
	{
		Ti.API.debug("video was taken");

		// programatically hide the camera
		Ti.Media.hideCamera();

		var activeMovie = Titanium.Media.createVideoPlayer({
			media:event.media,
			backgroundColor:'#111',
			movieControlMode:Titanium.Media.VIDEO_CONTROL_DEFAULT,
			movieControlStyle:Titanium.Media.VIDEO_CONTROL_FULLSCREEN,
			scalingMode:Titanium.Media.VIDEO_SCALING_MODE_FILL
		});
		win.add(activeMovie);
		
		var functionalityView = Titanium.UI.createView({
			backgroundColor:'black',
			height:225,
			bottom:-190
		}); 

		var open = Titanium.UI.createButton({
			value:false,
			title:"open",
			top:0,
			left:30,
			height:30,
			width:50
		});

		open.addEventListener('click', function() {
			functionalityView.animate({bottom:0, duration:500});
		});

		var close = Titanium.UI.createButton({
			value:false,
			title:"close",
			top:0,
			right:30,
			height:30,
			width:50
		});

		close.addEventListener('click', function() {
			functionalityView.animate({bottom:-190, duration:500});
		});

		var storyTitle = Titanium.UI.createTextField({  
		    color:'#303030',
				backgroundColor:'#d6d6d6',
				borderRadius:4,
				paddingLeft:5,
		    top:50,  
		    width:300,  
		    height:30,  
		    hintText:'Title',  
		    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
		    returnKeyType:Titanium.UI.RETURNKEY_DONE 
		});

		var tagFriendsButton = Titanium.UI.createButton({
			value:false,
			top:100,
			left: 20,
			height:56,
			width:55,
			backgroundImage:'../images/record/tag_normal.png',
			backgroundSelectedImage:'../images/record/tag_pressed.png'
		});

		var locationButton = Titanium.UI.createButton({
			value:false,
			top:100,
			left: 94,
			height:56,
			width:55,
			backgroundImage:'../images/record/location_normal.png',
			backgroundSelectedImage:'../images/record/location_pressed.png'
		});

		var addPhotosButton = Titanium.UI.createButton({
			value:false,
			top:100,
			right: 94,
			height:56,
			width:55,
			backgroundImage:'../images/record/addphotos_normal.png',
			backgroundSelectedImage:'../images/record/addphotos_pressed.png'
		});

		var addDateButton = Titanium.UI.createButton({
			value:false,
			top:100,
			right: 20,
			height:56,
			width:55,
			backgroundImage:'../images/record/date_normal.png',
			backgroundSelectedImage:'../images/record/date_pressed.png'
		});

		var saveButton = Titanium.UI.createButton({
			value:false,
			top:170,
			height:44,
			width:131,
			backgroundImage:'../images/record/save_btn.png'
		});
		
		functionalityView.add(open);
		functionalityView.add(close);
		functionalityView.add(storyTitle);
		functionalityView.add(tagFriendsButton);
		functionalityView.add(locationButton);
		functionalityView.add(addPhotosButton);
		functionalityView.add(addDateButton);
		functionalityView.add(saveButton);
		win.add(functionalityView);
	},
	cancel:function()
	{
	},
	error:function(error)
	{
		var a = Titanium.UI.createAlertDialog({title:'Camera'});
		if (error.code == Titanium.Media.NO_CAMERA)
		{
			a.setMessage('Please run this test on device');
		}
		else
		{
			a.setMessage('Unexpected error: ' + error.code);
		}
		a.show();
	},
	overlay:overlay,
	showControls:false,	// don't show system controls
	mediaTypes:Ti.Media.MEDIA_TYPE_VIDEO,
	videoQuality:Ti.Media.QUALITY_640x480,
	autohide:false 	// tell the system not to auto-hide and we'll do it ourself
});