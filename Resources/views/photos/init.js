Views.photos.init = Views.extend();

Views.photos.init.template = function() {
	var self = this;
	
	var win = Titanium.UI.createWindow({
		backgroundColor:'pink'
	});
	
	var photo_tray = Titanium.UI.createView({
		top:0,
		height:240,
		backgroundImage:'images/add_photo/add_photos_tray.png',
		zIndex:100,
	});
	
	var added_photo_view = Titanium.UI.createScrollView({
		top:15,
		height:140,
		width:300,
		contentWidth:'auto',
		contentHeight:140,
		showHorizontalScrollIndicator:true
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

	photo_tray.add(added_photo_view);
	photo_tray.add(done_button);
	photo_tray.add(take_picture);
	photo_tray.add(choose_existing);

	win.add(photo_tray);

	Views.photos.create.added_photo_view = added_photo_view;
	Views.photos.create.render(self.params.photos);

	win.open();
};
