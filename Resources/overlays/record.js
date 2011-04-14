var win = Titanium.UI.currentWindow;

var button = Titanium.UI.createButton({
	color:'#fff',
	// backgroundImage:'../images/BUTT_grn_on.png',
	// backgroundSelectedImage:'../images/BUTT_grn_off.png',
	// backgroundDisabledImage: '../images/BUTT_gry_on.png',
	bottom:10,
	width:120,
	height:40,
	font:{fontSize:16,fontWeight:'bold',fontFamily:'Helvetica Neue'},
	title:'Start Video'
});

var overlay = Titanium.UI.createView();
overlay.add(button);

var cameraFlash = Ti.UI.createButton({
	color:'#fff',
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
	color:'#fff',
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
	// button.backgroundImage = "../images/BUTT_red_on.png";
	// button.backgroundSelectedImage = '../images/BUTT_red_off.png';
	cameraType.visible = false;
	cameraFlash.visible = false;
});


Titanium.Media.showCamera({
	success: function(event){
		win.add(progressBar());
		App.action(win, "stories#create", {video: event.media, progress: progress});
	},
	cancel:function(){},
	error:function(error)
	{
		var a = Titanium.UI.createAlertDialog({title:'Camera'});
		if (error.code == Titanium.Media.NO_CAMERA)
		{
			a.setMessage('Please run this test on device');
		}
		else
		{
			a.setMessage('Unexpected error: ' + error);
		}
		a.show();
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
		height:80,
		min:0,
		max:1,
		value:0,
		style:Titanium.UI.iPhone.ProgressBarStyle.PLAIN,
		top:10,
		message:'',
		font:{fontSize:12, fontWeight:'bold'},
		color:'#888'
	});	
};