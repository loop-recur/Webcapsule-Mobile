if(Ti.Platform.osname == "iphone") {Titanium.UI.iPhone.statusBarStyle = Titanium.UI.iPhone.StatusBar.OPAQUE_BLACK};

var density = Titanium.Platform.displayCaps.density;

Ti.API.info("----------------------------DENSITY:" + density + "----------------------------");

Titanium.include('lib/framework/support/functional.js');
Titanium.include('lib/framework/support/temp_id.js');
Titanium.include('lib/framework/lib/base.js');
Titanium.include('lib/framework/lib/bootstrap.js');
Titanium.include('lib/framework/lib/app.js');
Titanium.include('lib/framework/lib/views.js');
Titanium.include('lib/framework/lib/layouts.js');
Titanium.include('lib/framework/lib/cache.js');
Titanium.include('lib/framework/support/http_client_with_cache.js');
Titanium.include('lib/framework/lib/http_client.js');
Titanium.include('lib/framework/lib/db.js');
Titanium.include('config/file_list.js');
Titanium.include('config/environments.js');

App.run();
var text_field_background_color = "#d6d6d6";
var text_field_text_color = "#4F4F4F";
Titanium.UI.setBackgroundColor('#000');
Titanium.Facebook.appid = "147009708687795";
Titanium.Facebook.permissions = ['publish_stream', 'read_stream', "offline_access", "email"];

var dir = Titanium.Filesystem.applicationDataDirectory;
var credentials = Titanium.Filesystem.getFile(dir,'credentials');
var auth_token = Titanium.Filesystem.getFile(dir,'auth_token');
var credentialsExists = credentials.exists();
var authExists = auth_token.exists();

if(credentialsExists || authExists) {
	if(credentialsExists) App.http_client.credentials = credentials.read();
	if(authExists) {
		var token = auth_token.read();
		if(token) App.http_client.auth_token = token.toString();
	}
	Layouts.site();
} else {
	Layouts.login();
};



