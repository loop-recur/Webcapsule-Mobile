Controllers.stories = {
	db: Db("stories"),

	index: function(view, params) {
		this.db.all(function(stories){ view.render(stories); }, params);
	},
	
	create: function(view, params) {
		var story = params.story;
		var progress = params.progress;
		
		this.db.save(story, function(new_story) {
				progress.hide();
				Views.stories._form.source = new_story;
			},
			{ progress_bar : progress }
		);
		view.render(story, {progress : progress});
	},
	
	init: function(view, params) {
		var date = new Date;
		var story = {id: "temp-" + Ti.Utils.md5HexDigest(date.toString())};
		view.render(story, params);
	},
	
	show: function(view, params) {
		this.db.find(params.id, function(story){ view.render(story); });
	},
	
	update: function(view, params) {
		var story = params.story;
		this.db.save(story, {
			success: function(updated_story){
				Views.stories._form.source = updated_story;
				if(params.success) params.success();
			},
			error: params.error
		});
	}
};
