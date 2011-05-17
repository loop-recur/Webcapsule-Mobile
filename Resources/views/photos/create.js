Views.photos.create = Views.extend();

Views.photos.create.template = function() {
	var self = this;
	var photos = self.source || [];
	
	update();
	
	function update() {
		if(self.view) Views.photos.create.added_photo_view.remove(self.view);
		self.view = makeView();
		Views.photos.create.added_photo_view.add(self.view);
		makePhotos();
	};
	
	function makeView() {
		 return Titanium.UI.createView({
			top:10,
			height:140
		});
	}
	
	function makePhotos(position, photo) {
		Functional.reduce(makePhoto, 10, photos);
	}
	
	function makePhoto(position, photo) {
		
		var added_photo = Titanium.UI.createView({
			top:0,
			left:position,
			width:86,
			height:86
		});
		
		var added_photo_border = Titanium.UI.createView({
			width:86,
			height:86,
			backgroundImage:'images/add_photo/photo_box.png'
		});

		var image = Titanium.UI.createImageView({
			defaultImage:'images/avatar_medium.jpg',
			top:2,
			// left:8,
			width:65,
			height:65
		});
		
		image.image = photo.upload || Helpers.images.escape(photo.thumb);

		var delete_button = Titanium.UI.createView({
			backgroundImage:'images/add_tag/remove_icon.png',
			right:-5,
			top: -5,
			width: 25,
			height: 25
		});
				
		delete_button.addEventListener('click', function() {
			App.action(self.view, "photos#destroy", {photo : photo});
			update();
		});
		
		added_photo.add(image);
		added_photo.add(added_photo_border);
		added_photo.add(delete_button);
		self.view.add(added_photo);
		return position+96;
	};
	
};
