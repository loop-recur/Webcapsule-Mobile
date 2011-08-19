Controllers.tags = {
	db: Db("tags"),
	
	create: function(view, params) {
		var friends = Views.tags.create.source || [];
		var friend = params.friend;
		var story = params.story;
		friend.name = friend.label;
		
		this.db.save(friend, function(new_tag) {
			var story = Views.stories._form.source;
			if(!story.tag_ids) story.tag_ids = "";
			var old_val = story.tag_ids.split(',');
			old_val.unshift(new_tag.id);
			var new_val = old_val.join(',');
			story.tag_ids = new_val;
		});
		
		if(!view.source) view.source = [];
		if(!Views.stories._form.source.tags) Views.stories._form.source.tags = [];
		view.source.unshift(friend);
		Views.stories._form.source.tags = view.source;
		view.render(view.source, {story: story});
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
		var story = params.story;
		
		if(!story.tag_ids) story.tag_ids = Functional.map(".id", friends).join(",");
		var old_val = story.tag_ids.split(',');
		old_val.splice(old_val.indexOf(id),1);
		var new_val = old_val.join(',');
		story.tag_ids = new_val;
		
		Helpers.array_funs.removeById(id, friends);
	},
	
	normalizeFriends: function(friend) {
		friend.label = (friend.label || "").toLowerCase();
		friend.image = Helpers.images.escape(friend.image);
		return friend;
	}
};
