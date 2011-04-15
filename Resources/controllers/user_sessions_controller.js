Controllers.user_sessions = {
	alerter : alert,
	
	create: function(username, password) {
		var authstr = this.makeAuthString(username, password);
		App.http_client.credentials = authstr;
		
		App.http_client.get("/accounts.json", {
			success: function(response) {
				Controllers.user_sessions.cache(authstr);
				var json = JSON.parse(response.responseText);
				App.current_user = json.user;
				Layouts.nav();
			},
			error: function(response) {
				Controllers.user_sessions.alerter("Invalid login");
			}
		});
	},
	
	destroy: function() {
		var dir = Titanium.Filesystem.applicationDataDirectory;
		var file = Titanium.Filesystem.getFile(dir,'credentials');
		file.deleteFile();
		App.http_client.credentials = "";
		Layouts.login();
	},
	
	makeAuthString: function(username, password) {
		return 'Basic ' + Titanium.Utils.base64encode(username+":"+password);	
	},
	
	cache: function(authstr) {
		var dir = Titanium.Filesystem.applicationDataDirectory;
		var file = Titanium.Filesystem.getFile(dir,'credentials');
		file.write(authstr);
	}
};
