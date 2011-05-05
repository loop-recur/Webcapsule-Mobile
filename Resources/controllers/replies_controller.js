Controllers.replies = {
	db: Db("replies"),

	create: function(view, params) {
		var reply = params.reply;
		this.db.save(reply, {success : params.success, error : params.error}, params.http_options);
	},

	init: function(view, params) {
		var reply = {id: TempId.generate(), story_id : params.story.id};
		view.render(reply, params);
	}	
};
