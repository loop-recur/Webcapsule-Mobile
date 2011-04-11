function proof() {
	var win = Titanium.UI.currentWindow;  

	var basicSwitch = Titanium.UI.createSwitch({
		value:false,
		top:10,
		backgroundImage:'../images/sharestory/handle.png',
		icon:'../images/sharestory/handle.png',
		image:'../images/sharestory/handle.png'
	});

	var shareButton = Titanium.UI.createButton({
		value:false,
		top:50,
		height:44,
		width:131,
		backgroundImage:'../images/sharestory/share_btn.png'
	});

	// BUTTON GROUP ON RECORD PAGE 

	var uploadButton = Titanium.UI.createButton({
		value:false,
		top:100,
		left:20,
		height:110,
		width:128,
		backgroundImage:'../images/record/upload_btn.png'
	});

	var recordButton = Titanium.UI.createButton({
		value:false,
		top:100,
		right:20,
		height:110,
		width:128,
		backgroundImage:'../images/record/record_btn.png'
	});

	var tagFriendsButton = Titanium.UI.createButton({
		value:false,
		top:250,
		left: 20,
		height:56,
		width:55,
		backgroundImage:'../images/record/tag_normal.png',
		backgroundSelectedImage:'../images/record/tag_pressed.png'
	});

	var locationButton = Titanium.UI.createButton({
		value:false,
		top:250,
		left: 94,
		height:56,
		width:55,
		backgroundImage:'../images/record/location_normal.png',
		backgroundSelectedImage:'../images/record/location_pressed.png'
	});

	var addPhotosButton = Titanium.UI.createButton({
		value:false,
		top:250,
		right: 94,
		height:56,
		width:55,
		backgroundImage:'../images/record/addphotos_normal.png',
		backgroundSelectedImage:'../images/record/addphotos_pressed.png'
	});

	var addDateButton = Titanium.UI.createButton({
		value:false,
		top:250,
		right: 20,
		height:56,
		width:55,
		backgroundImage:'../images/record/date_normal.png',
		backgroundSelectedImage:'../images/record/date_pressed.png'
	});

	// BUTTON GROUP ON RECORD PAGE 

	win.add(basicSwitch);
	win.add(shareButton);

	win.add(recordButton);
	win.add(uploadButton);

	win.add(tagFriendsButton);
	win.add(locationButton);
	win.add(addPhotosButton);
	win.add(addDateButton);
	
}
