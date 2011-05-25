Views.photos.create = Views.extend();

Views.photos.create.template = function() {
	var self = this;
	var story = self.story;
	var added_photo_view = self.added_photo_view;
	var hide_delete = self.hide_delete || false;
	
	update();
	
	function update() {
		if(self.view) added_photo_view.remove(self.view);
		self.view = makeView();
		added_photo_view.add(self.view);
		makePhotos();
		Views.photos.init.lockDone(false);
	};
	
	function makeView() {
		 return Titanium.UI.createView({
			top:10,
			height:96
		});
	};
	
	function makePhotos(position, photo) {
		Functional.reduce(makePhoto, {left:10, top:0}, (self.source || []));
	}
	
	function makePhoto(position, photo) {
		
		var added_photo = Titanium.UI.createView({
			top:position.top,
			left:position.left,
			width:86,
			height:86
		});
		
		var added_photo_border = Titanium.UI.createView({
			width:86,
			height:86,
			backgroundImage:'images/add_photo/photo_box.png'
		});

		var image = Titanium.UI.createImageView({
			top:8,
			width:65,
			height:65
		});
		
		image.image = photo.upload || Helpers.images.escape(photo.thumb);
		
		added_photo.add(image);
		added_photo.add(added_photo_border);

		if(!hide_delete && Helpers.user.canEdit(photo, story)) {
			var delete_button = Titanium.UI.createView({
				backgroundImage:'images/add_tag/remove_icon.png',
				right:-5,
				top: -5,
				width: 25,
				height: 25
			});

			delete_button.addEventListener('click', function() {
				App.action(self.view, "photos#destroy", {photo : photo, story: story});
				update();
			});
			
			added_photo.add(delete_button);
		};
		
		
		self.view.add(added_photo);

		function buildAndUpdatePosition (current_position) {
			var horizontal_spacing = 96;
			var vertical_spacing = 96;

			current_position.left += horizontal_spacing;
			
			if(current_position.left > 297) {
				current_position.top += vertical_spacing;
				current_position.left = 10;
				self.view.height += vertical_spacing;
			};
		};
		
		buildAndUpdatePosition(position);
		
		return position;
	};
	
};
