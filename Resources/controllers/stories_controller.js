Controllers.stories = {
	db: Db("stories"),

	index: function(view, params) {
		this.db.all(function(stories){ view.render(stories); }, params);
	},
	
	edit: function(view, params) {
		view.render(params.story, params);
	},
	
	init: function(view, params) {
		var date = new Date();
		var story = {id: TempId.generate(), when: date};
		try{ Layouts.geolocation(story); } catch(e){};
		view.render(story, params);
	},
	
	show: function(view, params) {
		this.db.find(params.id, function(story){ view.render(story, params); });
	},
	
	update: function(view, params) {
		var story = params.story;
		
		this.db.save(story, {
			success: function(updated_story){
				Views.stories._form.source = updated_story;
				if(params.success) params.success(updated_story);
			},
			error: params.error
		}, (params.http_options || {}));
	}
};
