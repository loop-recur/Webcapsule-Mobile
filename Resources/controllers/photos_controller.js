Controllers.photos = {
	db: Db("photos"),

	create: function(view, params) {
		// reset source
		Views.photos.init.source = {story_id: params.story.id, id: TempId.generate()};
		
		var photos = Views.photos.create.source || [];
		var photo = params.photo;
		var story = params.story;

		photo.story_id = story.id;
		photo.user_id = App.currentUser().id;
		
		this.db.save(photo, function(new_photo) {
			// var story = (story || Views.stories._form.source);
			Ti.API.info("====================SENDING EVENT!!!!!============");
			Ti.App.fireEvent('addedMedia', {type: "photo", source: new_photo});
			if(!story.photo_ids) story.photo_ids = "";
			var old_val = story.photo_ids.split(',');
			old_val.unshift(new_photo.id);
			var new_val = old_val.join(',');
			story.photo_ids = new_val;
		});
		
		if(!view.source) view.source = [];
		view.source.unshift(photo);
		view.render(view.source);
	},

	init: function(view, params) {
		var photo = {story_id: params.story_id, id: TempId.generate()};
		view.render(photo, params);
	},
	
	destroy: function(view, params) {
		var photos = Views.photos.create.source || [];
		var photo = params.photo;
		var id = photo.id;
		var story = params.story;
		if(!story.photo_ids) story.photo_ids = Functional.map(".id", photos).join(",");
		
		story.photo_ids = Helpers.array_funs.removeInString(id, story.photo_ids);
		Helpers.array_funs.removeById(id, photos);
		App.http_client.expireCache();
		if(!TempId.isTemp(story.id)) this.db.destroy(photo, function(){ Ti.App.fireEvent('removedMedia', {id: id}) });
	}
	
};
