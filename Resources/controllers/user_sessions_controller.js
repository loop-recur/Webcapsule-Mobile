Controllers.user_sessions = {
	alerter : alert,
	
	create: function(username, password) {
		App.http_client.expireCache();
		var authstr = this.makeAuthString(username, password);
		App.http_client.credentials = authstr;
		
		App.http_client.get("/accounts.json", {
			success: function(response) {
				var user = JSON.parse(response.responseText);
				App.current_user = user;
				Controllers.user_sessions.cache(authstr, response.responseText);
				Layouts.site();
			},
			error: function(response) {
				Controllers.user_sessions.alerter("Invalid login");
			}
		});
	},
	
	destroy: function() {
		var dir = Titanium.Filesystem.applicationDataDirectory;
		var files = ["credentials", "auth_token", "current_user"]
		var getAndDelete = function(name) {
			var file = Titanium.Filesystem.getFile(dir,name);
			file.deleteFile();
			App.http_client[name] = null;
		}
		Functional.map(getAndDelete, files);
		App.current_user = null;
		Layouts.login();
	},
	
	makeAuthString: function(username, password) {
		return 'Basic ' + Titanium.Utils.base64encode(username+":"+password);	
	},
	
	cache: function(authstr, user) {
		var dir = Titanium.Filesystem.applicationDataDirectory;
		var auth_file = Titanium.Filesystem.getFile(dir,'credentials');
		var user_file = Titanium.Filesystem.getFile(dir,'current_user');
		auth_file.write(authstr);
		user_file.write(user);
	}
};
