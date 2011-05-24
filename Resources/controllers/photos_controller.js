Controllers.photos = {
	db: Db("photos"),

	create: function(view, params) {
		var photo = params.photo;
		photo.story_id = Views.stories._form.source.id;
		
		this.db.save(photo, function(new_photo) {
			var story = Views.stories._form.source;			
			story.photo_ids = Helpers.array_funs.addInString(new_photo.id, story.photo_ids);
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
		var id = params.photo.id;
		var story = Views.stories._form.source;
		
		story.photo_ids = Helpers.array_funs.removeInString(id, story.photo_ids);
		Helpers.array_funs.removeById(id, photos);
	}
	
};
