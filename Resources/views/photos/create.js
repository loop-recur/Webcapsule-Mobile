Views.photos.create = Views.extend();

Views.photos.create.template = function() {
	var self = this;
	
	update();
	
	function update() {
		if(self.view) self.win.remove(self.view);
		self.win.add(makeView());
		makePhotos();
	};
	
	function makeView() {
		// needs real scroll
		self.view = Ti.UI.createView({
			top : 130,
			height:140,
			width: 300
		});
		return self.view;
	}
	
	function makePhotos(position, photo) {
		Functional.reduce(makePhoto, 10, self.source);
	}
	
	function makePhoto(position, photo) {
		
		var thumb = Ti.UI.createView({
			top:0,
			left:position,
			height:70,
			width: 70
		});
		
		var image = Titanium.UI.createImageView({
			image: (photo.upload || App.file_url+photo.url),
			defaultImage:'images/avatar_medium.jpg',
			top:0,
			left: 0,
			width:50,
			height:50
		});
		
		var delete_button = Titanium.UI.createButton({
			title:"X",
			right:3,
			top: -5,
			width: 20,
			height: 20
		});
				
		delete_button.addEventListener('click', function() {
			App.action(self.view, "photos#destroy", {photo : photo});
			update();
		});
		
		thumb.add(image);
		thumb.add(delete_button);
		self.view.add(thumb);
		return position+70;
	};
	
};
