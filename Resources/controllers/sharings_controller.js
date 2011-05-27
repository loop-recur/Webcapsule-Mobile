Controllers.sharings = {
	db: Db("sharings"),

	create: function(view, params) {
		var sharing = params.sharing;
		
		this.db.save(sharing, function(new_sharing) {
			params.success();
		});
	},

	init: function(view, params) {
		var sharing = {id: TempId.generate(), story_id : params.story.id};
		view.render(sharing, params);
	}
};
