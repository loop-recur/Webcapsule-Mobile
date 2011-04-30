var win = Titanium.UI.currentWindow;

var photo_tray = Titanium.UI.createView({
	height:240,
	backgroundImage:'../images/add_photo/add_photos_tray.png',
});

var take_picture = Titanium.UI.createButton({  
    value:false,
		backgroundImage:'../images/add_photo/take_picture_normal.png',
		backgroundSelectedImage:'../images/add_photo/take_picture_pressed.png',  
  	left:15,
		bottom:20,
    width:53,  
    height:55
});

take_picture.addEventListener('click', function() {
	var take_picture_window = Titanium.UI.createWindow({
		url:'still_camera.js',
		background:'black'
	});
	
	take_picture_window.open();
});

var choose_existing = Titanium.UI.createButton({  
    value:false,
		backgroundImage:'../images/add_photo/add_photo_normal.png',
		backgroundSelectedImage:'../images/add_photo/add_photo_pressed.png',  
  	left:73,
		bottom:20,
    width:53,  
    height:55
});

choose_existing.addEventListener('click', function() {
	var choose_existing_window = Titanium.UI.createWindow({
		url:'choose_photo.js',
		background:'black'
	});
	
	choose_existing_window.open();
});

var done_button = Titanium.UI.createButton({  
    value:false,
		backgroundImage:'../images/app_wide/ok_normal.png',
		backgroundSelectedImage:'../images/app_wide/ok_pressed.png',  
  	right:15,
		bottom:20,
    width:83,  
    height:49
});

done_button.addEventListener('click', function() {
	win.close();
});

photo_tray.add(done_button);

photo_tray.add(take_picture);
photo_tray.add(choose_existing);

win.add(photo_tray);