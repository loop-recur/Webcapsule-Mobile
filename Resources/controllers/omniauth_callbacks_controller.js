Controllers.omniauth_callbacks = {
	db: Db("omniauth_callbacks"),

	create: function(view, params) {
		var authentication = params.data;
		
		this.db.save(authentication, function(user) {
			App.current_user = user;
			params.success();
		});
	},

	init: function(view, params) {
		var comment = {id: TempId.generate(), story_id : params.story.id};
		view.render(comment, params);
	}	
};
