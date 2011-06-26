Views.photos.create = Views.extend();

Views.photos.create.template = function() {
	var self = this;
	var story = self.story;
	var added_photo_view = self.added_photo_view;
	var hide_delete = self.hide_delete || false;
	
	if (Helpers.application.densityIsMedium())
	  {
	  var makeView_top = 10;
		var makePhotos_top = 10;
		var makePhotos_left = 0;
		var image_top = 8;
		var delete_button_top = -5;
		var delete_button_left = -5;
	  }
	else
	  {
	  var makeView_top = 10;
		var makePhotos_top = 10;
		var makePhotos_left = 0;
		var image_top = 8;
		var delete_button_top = -5;
		var delete_button_left = -5;
	  }
	
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
			top:makeView_top,
			height:"96dp"
		});
	};
	
	function makePhotos(position, photo) {
		Functional.reduce(makePhoto, {left:makePhotos_left, top:makePhotos_top}, (self.source || []));
	}
	
	function makePhoto(position, photo) {
		
		var added_photo = Titanium.UI.createView({
			top:position.top,
			left:position.left,
			width:"86dp",
			height:"86dp"
		});
		
		var added_photo_border = Titanium.UI.createView({
			width:"86dp",
			height:"86dp",
			backgroundImage:'images/add_photo/photo_box.png'
		});

		var image = Titanium.UI.createImageView({
			top:image_top,
			width:"65dp",
			height:"65dp"
		});
		
		image.image = photo.upload || Helpers.images.escape(photo.thumb);
		
		added_photo.add(image);
		added_photo.add(added_photo_border);

		if(!hide_delete && Helpers.user.canEdit(photo, story)) {
			var delete_button = Titanium.UI.createView({
				backgroundImage:'images/add_tag/remove_icon.png',
				left:delete_button_left,
				top:delete_button_top,
				width:"25dp",
				height:"25dp"
			});

			delete_button.addEventListener('click', function() {
				App.action(self.view, "photos#destroy", {photo : photo, story: story});
				update();
			});
			
			added_photo.add(delete_button);
		};
		
		
		self.view.add(added_photo);

		function buildAndUpdatePosition (current_position) {
			var horizontal_spacing = "96dp";
			var vertical_spacing = "96dp";

			current_position.left += horizontal_spacing;
			
			if(current_position.left > "297dp") {
				current_position.top += vertical_spacing;
				current_position.left = "10dp";
				self.view.height += vertical_spacing;
			};
		};
		
		buildAndUpdatePosition(position);
		
		return position;
	};
	
};
