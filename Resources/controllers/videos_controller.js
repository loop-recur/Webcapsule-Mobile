Controllers.videos = {
	db: Db("videos"),

	create: function(view, params) {
		var video = params.video;
		this.db.save(video, {
			success : function(updated_vid) {
				App.http_client.expireCache();
				params.success(updated_vid);
			},
			error : params.error
			},
			params.http_options
		);
	},

	init: function(view, params) {
		var video = {id: TempId.generate(), story_id : params.story.id};
		view.render(video, params);
	}	
};
