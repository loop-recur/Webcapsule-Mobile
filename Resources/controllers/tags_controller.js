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
		view.source.unshift(friend);
		view.render();
	},

	init: function(view, params) {
		this.db.all(function(users) {
			fixed_users = Functional.map(function(u){ if(u.image.match("/files")) u.image = App.file_url + u.image; return u; }, users);
			view.source = fixed_users;
		});
		
		view.template.toggle_tag_tray(true);	
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
