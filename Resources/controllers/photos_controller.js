Controllers.photos = {
	db: Db("photos"),

	create: function(view, params) {
		var photo = params.photo;
		
		this.db.save(photo, function(new_photo) {
			var story = Views.stories._form.source;
			if(!story.photo_ids) story.photo_ids = "";
			var old_val = story.photo_ids.split(',');
			old_val.unshift(new_photo.id);
			var new_val = old_val.join(',');
			story.photo_ids = new_val;
		});
		
		if(!view.source) view.source = [];
		view.source.unshift(photo);
		view.render();
	},

	init: function(view, params) {
		var photo = {story_id: params.story_id, id: TempId.generate()};
		view.render(photo, params);
	},
	
	destroy: function(view, params) {
		var photos = Views.photos.create.source || [];
		var photo = params.photo;
		var id = photo.id.toString();
		var story = Views.stories._form.source;
		
		if(!story.photo_ids) story.photo_ids = "";
		var old_val = story.photo_ids.split(',');
		old_val.splice(old_val.indexOf(id),1);
		var new_val = old_val.join(',');
		story.photo_ids = new_val;

		photos.splice(photos.indexOf(photo),1);
	}
	
};
