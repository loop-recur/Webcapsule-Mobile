Controllers.photos = {
	db: Db("photos"),

	create: function(view, params) {
		var photos = Views.photos.create.source || [];
		var photo = params.photo;
		var story = params.story;
		photo.story_id = story.id;
		
		this.db.save(photo, function(new_photo) {
			if(!story.photo_ids) story.photo_ids = Functional.map(".id", photos).join(",");
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
		var story = params.story;
		if(!story.photo_ids) story.photo_ids = Functional.map(".id", photos).join(",");
		
		story.photo_ids = Helpers.array_funs.removeInString(id, story.photo_ids);
		Helpers.array_funs.removeById(id, photos);
	}
	
};
