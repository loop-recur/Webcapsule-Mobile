Views.photos.init = Views.extend();

Views.photos.init.template = function() {
	var self = this;
	var parent_win = self.win;
	
	var win = Titanium.UI.createView();
	
	var photo_tray = Titanium.UI.createView({
		top:0,
		height:240,
		backgroundImage:'images/add_photo/add_photos_tray.png',
		zIndex:100
	});
	
	var added_photo_view = Titanium.UI.createScrollView({
		top:15,
		height:140,
		width:300,
		contentWidth:300,
		contentHeight:'auto',
		showHorizontalScrollIndicator:false,
		showVerticalScrollIndicator:true
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
		Layouts.take_photo(win, self.source, self.params.story);
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
		(Helpers.application.isBlank(Views.photos.create.source)) ? Views.stories.form.toggle_photo_icon(false) : Views.stories.form.toggle_photo_icon(true);
		win.visible = false;
	});
	
	var lock_done_button = Titanium.UI.createButton({  
	    value:false,
			backgroundImage:'images/app_wide/ok_normal.png',
			backgroundSelectedImage:'images/app_wide/ok_pressed.png',
	  	right:15,
			bottom:20,
	    width:83,
	    height:49,
			enabled: false,
			visible: false,
			zIndex: 99
	});
	
	self.lockDone = function(state) {
		lock_done_button.visible = state;
	};

	photo_tray.add(added_photo_view);
	photo_tray.add(done_button);
	photo_tray.add(lock_done_button);
	photo_tray.add(take_picture);

	win.add(photo_tray);
	
	Views.photos.create.added_photo_view = added_photo_view;
	Views.photos.create.story = self.params.story;
	Views.photos.create.hide_delete = self.params.hide_delete;
	Views.photos.create.render(self.params.photos);

	parent_win.add(win);
};
