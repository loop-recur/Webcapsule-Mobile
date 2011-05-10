Views.photos.init = Views.extend();

Views.photos.init.template = function() {
	var self = this;
	
	var win = Titanium.UI.createWindow({
		opacity:0.9,
		backgroundColor:'black'
	});
	
	var photo_tray = Titanium.UI.createView({
		height:240,
		backgroundImage:'images/add_photo/add_photos_tray.png'
	});

	var take_picture = Titanium.UI.createButton({  
	    value:false,
			backgroundImage:'images/add_photo/take_picture_normal.png',
			backgroundSelectedImage:'images/add_photo/take_picture_pressed.png',  
	  	left:15,
			bottom:20,
	    width:53,  
	    height:55
	});

	take_picture.addEventListener('click', function() {
		Layouts.take_photo(win, self.source);
	});

	var choose_existing = Titanium.UI.createButton({  
	    value:false,
			backgroundImage:'images/add_photo/add_photo_normal.png',
			backgroundSelectedImage:'images/add_photo/add_photo_pressed.png',  
	  	left:73,
			bottom:20,
	    width:53,  
	    height:55
	});

	choose_existing.addEventListener('click', function() {
		Layouts.choose_photo(win, self.source);
	});

	var done_button = Titanium.UI.createButton({  
	    value:false,
			backgroundImage:'images/app_wide/ok_normal.png',
			backgroundSelectedImage:'images/app_wide/ok_pressed.png',  
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
	win.open({fullscreen: true});	

	Views.photos.create.win = win;
	Views.photos.create.render(self.params.photos);
};
