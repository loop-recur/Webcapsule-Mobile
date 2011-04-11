Titanium.include('../lib/framework/support/functional.js');
Titanium.include('../lib/framework/lib/base.js');
Titanium.include('../lib/framework/lib/http_client.js');
Titanium.include('../initializers/bootstrap.js');
App.bootstrap();

AuthController = function(alerter) {
	function login(username, password) {
		var authstr = makeAuthString(username, password);
		App.http_client.credentials = authstr;
		
		App.http_client.get("http://webcapsule.dev/i_phone/accounts.json", {}, {
			success: function(response) {
				cache(authstr);
				var json = JSON.parse(response.responseText);
				alerter("Login successful");
				return App.current_user = json.user;
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
