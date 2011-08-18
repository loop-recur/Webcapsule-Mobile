Controllers.comments = {
	db: Db("comments"),

	create: function(view, params) {
		var comment = params.comment;
		var story = params.story;
		
		this.db.save(comment, function(new_comment) {
			Ti.App.fireEvent('addedMedia', {type: "comment", source: new_comment});
			story.comments.push(new_comment);
			params.success();
		});
	},

	init: function(view, params) {
		var comment = {id: TempId.generate(), story_id : params.story.id};
		view.render(comment, params);
	}
};
