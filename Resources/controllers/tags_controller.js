Controllers.tags = {
	db: Db("tags"),
	
	create: function(view, params) {
		var friend = params.friend;
		friend.name = friend.label;
		
		this.db.save(friend, function(new_tag) {
			var story = Views.stories._form.source;			
			story.tag_ids = Helpers.array_funs.addInString(new_tag.id, story.tag_ids);
		});
		
		if(!view.source) view.source = [];
		if(!Views.stories._form.source.tags) Views.stories._form.source.tags = [];
		view.source.unshift(friend);
		Views.stories._form.source.tags = view.source;
		view.render();
	},

	init: function(view, params) {
		view.render([], params);
		
		this.db.all(function(users) {
			var normalized_users = Functional.map(Controllers.tags.normalizeFriends, users);
			view.source = normalized_users;
			view.finishLoading();
		});
	},
	
	destroy: function(view, params) {
		var friends = Views.tags.create.source || [];
		var id = params.friend.id;
		var story = Views.stories._form.source;
		
		story.tag_ids = Helpers.array_funs.removeInString(id, story.tag_ids);
		Helpers.array_funs.removeById(id, friends);
	},
	
	normalizeFriends: function(friend) {
		friend.label = (friend.label || "").toLowerCase();
		friend.image = Helpers.images.escape(friend.image);
		return friend;
	}
};
