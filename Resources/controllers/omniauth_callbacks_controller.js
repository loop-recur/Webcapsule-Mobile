Controllers.omniauth_callbacks = {
	db: Db("omniauth_callbacks"),

	create: function(view, params) {
		var authentication = params.data;
		
		this.db.save(authentication, function(user) {
			App.current_user = user;
			Ti.API.info(user);
			App.http_client.auth_token = user.authentication_token;
			Controllers.omniauth_callbacks.cache(user.authentication_token, user);
			params.success();
		});
	},

	init: function(view, params) {
		var comment = {id: TempId.generate(), story_id : params.story.id};
		view.render(comment, params);
	},
	
	cache: function(auth_token, user) {
		var dir = Titanium.Filesystem.applicationDataDirectory;
		var auth_file = Titanium.Filesystem.getFile(dir,'auth_token');
		var user_file = Titanium.Filesystem.getFile(dir,'current_user');
		auth_file.write(auth_token);
		user_file.write(JSON.stringify(user));
	}
	
};
