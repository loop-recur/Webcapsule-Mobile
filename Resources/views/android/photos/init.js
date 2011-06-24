Views.photos.init = Views.extend();

Views.photos.init.template = function() {
	var self = this;
	var player = self.win;
	
	var win = Titanium.UI.createWindow({zIndex:999, fullscreen: true});
	
	var photo_tray = Titanium.UI.createView({
		top:0,
		height:"240dp",
		backgroundImage:'images/add_photo/add_photos_tray.png',
		zIndex:100
	});
	
	var added_photo_view = Titanium.UI.createScrollView({
		top:15,
		height:"140dp",
		width:"300dp",
		contentwidth:"300dp",
		contentheight:'auto',
		showHorizontalScrollIndicator:false,
		showVerticalScrollIndicator:true
	});

	var take_picture = Titanium.UI.createButton({  
	    value:false,
			backgroundImage:'images/add_photo/take_picture_normal.png',
			backgroundSelectedImage:'images/add_photo/take_picture_pressed.png',  
	  	left:15,
			bottom:20,
	    width:"53dp",  
	    height:"55dp"
	});

	take_picture.addEventListener('click', function() {
		player.hide();
		Layouts.take_photo(win, self.source, self.params.story);
	});

	var done_button = Titanium.UI.createButton({  
	    value:false,
			backgroundImage:'images/app_wide/ok_normal.png',
			backgroundSelectedImage:'images/app_wide/ok_pressed.png',  
	  	right:15,
			bottom:20,
	    width:"83dp",  
	    height:"49dp"
	});

	done_button.addEventListener('click', function() {
		win.close();
		if(self.params.from_show) Views.stories.show.makePlayer();
	});
	
	var lock_done_button = Titanium.UI.createButton({  
	    value:false,
			backgroundImage:'images/app_wide/ok_normal.png',
			backgroundSelectedImage:'images/app_wide/ok_pressed.png',
	  	right:15,
			bottom:20,
	    width:"83dp",
	    height:"49dp",
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
	
	win.open();
};
