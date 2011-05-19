Controllers.tags = {
	db: Db("tags"),
	
	create: function(view, params) {
		var friend = params.friend;
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
		view.render();
	},

	init: function(view, params) {
		view.render([], params);
		
		this.db.all(function(users) {
			view.source = users;
			view.finishLoading();
		});
	},
	
	destroy: function(view, params) {
		var friends = Views.tags.create.source || [];
		var friend = params.friend;
		var id = friend.id.toString();
		var story = Views.stories._form.source;
		
		if(!story.tag_ids) story.tag_ids = "";
		var old_val = story.tag_ids.split(',');
		old_val.splice(old_val.indexOf(id),1);
		var new_val = old_val.join(',');
		story.tag_ids = new_val;
		
		friends.splice(friends.indexOf(friend),1);
	}
};
