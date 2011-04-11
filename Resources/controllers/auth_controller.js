AuthController = function(alerter) {
	function login(username, password) {
		var authstr = makeAuthString(username, password);
		App.http_client.credentials = authstr;
		
		App.http_client.get("http://localhost:3000/i_phone/accounts.json", {}, {
			success: function(response) {
				cache(authstr);
				var json = JSON.parse(response.responseText);
				alerter("Login successful");
				App.current_user = json.user;
				Views.nav();
			},
			error: function(response) {
				alerter("Invalid login");
			}
		});
	}
	
	// private
	
	function makeAuthString(username, password) {
		return 'Basic ' + Titanium.Utils.base64encode(username+":"+password);
	}
	
	function cache(authstr) {
		var dir = Titanium.Filesystem.applicationDataDirectory;
		var file = Titanium.Filesystem.getFile(dir,'credentials');
		file.write(authstr);
	}
	
	return {login:login};
};
