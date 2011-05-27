Controllers.sharings = {
	db: Db("sharings"),

	create: function(view, params) {
		var sharing = params.sharing;
		
		this.db.save(sharing, function(new_sharing) {
			params.success();
		});
	},

	init: function(view, params) {
		var sharing;
		
		if(params.story.twitter || params.story.facebook) {
			sharing = {twitter : params.story.twitter, facebook: params.story.facebook};
		} else {
			sharing = {id: TempId.generate(), story_id : params.story.id};
		}

		view.render(sharing, params);
	}
};
