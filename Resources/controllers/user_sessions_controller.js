Controllers.user_sessions = {
	alerter : alert,
	
	create: function(username, password) {
		App.http_client.expireCache();
		var authstr = this.makeAuthString(username, password);
		App.http_client.credentials = authstr;
		
		App.http_client.get("/accounts.json", {
			success: function(response) {
				var user = JSON.parse(response.responseText);
				App.setCurrentUser(user);
				App.http_client.auth_token = user.authentication_token;
				Controllers.user_sessions.cache(authstr);
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
		Functional.map(getAndDelete, files);
		App.setCurrentUser({});
		Layouts.login();
		
		function getAndDelete(name) {
			var file = Titanium.Filesystem.getFile(dir,name);
			file.deleteFile();
			App.http_client[name] = null;
		};
	},
	
	makeAuthString: function(username, password) {
		return 'Basic ' + Titanium.Utils.base64encode(username+":"+password);	
	},
	
	cache: function(authstr) {
		var dir = Titanium.Filesystem.applicationDataDirectory;
		var auth_file = Titanium.Filesystem.getFile(dir,'credentials');
		auth_file.write(authstr);
	}
};
