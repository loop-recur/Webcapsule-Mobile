Controllers.stories = {
	db: Db("stories"),

	index: function(view, params) {
		this.db.all(view, params);
	},
	
	create: function(view, params) {
		var story = params.story;
		var progress = params.progress;
		
		this.db.save(story, function(new_story) {
				progress.hide();
				Views.stories.edit(params.overlay, new_story);
			},
			{ progress_bar : progress }
		);
		view(story, progress, params.overlay);
	},
	
	init: function(view, params) {
		var date = new Date;
		var story = {id: "temp-" + Ti.Utils.md5HexDigest(date.toString())};
		view(params.overlay, story);
	},
	
	show: function(view, params) {
		this.db.find(params.id, view);
	},
	
	update: function(view, params) {
		var story = params.story;
		this.db.save(story, {
			success: params.success,
			error: params.error
		});
	}
};
