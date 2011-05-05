Controllers.comments = {
	db: Db("comments"),

	create: function(view, params) {
		var comment = params.comment;
		
		this.db.save(comment, function(new_comment) {
			var story = Views.stories._form.source;
			story.comments.push(new_comment);
			params.success();
		});
	},

	init: function(view, params) {
		var comment = {id: TempId.generate(), story_id : params.story.id};
		view.render(comment, params);
	}	
};
