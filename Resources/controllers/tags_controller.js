Controllers.tags = {
	db: Db("tags"),
	
	create: function(view, params) {
		var friend = params.friend;
		
		this.db.save(friend, function(new_tag) {
			var story = Views.stories._form.source;
			if(!stories.tag_ids) story.tag_ids = [];
			story.tag_ids.unshift(new_tag.id);
		});
		
		if(!view.source) view.source = [];
		view.source.unshift(friend);
		view.render();
	},

	init: function(view, params) {
		var date = new Date;
		var tag = {id: "temp-" + Ti.Utils.md5HexDigest(date.toString())};
		this.db.all(function(users) { view.render(users); });
	},
	
	destroy: function(view, params) {
		alert("poo");
	}
};
