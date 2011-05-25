Titanium.UI.iPhone.statusBarStyle = Titanium.UI.iPhone.StatusBar.OPAQUE_BLACK;
Titanium.include('initializers/init.js');
try { App.run(); } catch(E) { alert("Failed with "+E); }

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
		Ti.API.info("=========================SETTING AUTH TO");
		Ti.API.info(token);
		App.http_client.auth_token = token;
	}
	Layouts.site();
} else {
	Layouts.login();
};
