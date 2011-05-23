Titanium.UI.iPhone.statusBarStyle = Titanium.UI.iPhone.StatusBar.OPAQUE_BLACK;
Titanium.include('initializers/init.js');
try { App.run(); } catch(E) { alert("Failed with "+E); }

Titanium.UI.setBackgroundColor('#000');
Titanium.Facebook.appid = "147009708687795";
Titanium.Facebook.permissions = ['publish_stream', 'read_stream', "offline_access", "email"];

var dir = Titanium.Filesystem.applicationDataDirectory;
var credentials = Titanium.Filesystem.getFile(dir,'credentials');
var auth_token = Titanium.Filesystem.getFile(dir,'auth_token');

if(credentials.exists() || auth_token.exists()) {
	App.http_client.credentials = credentials.read();
	App.http_client.auth_token = auth_token.read();
	Layouts.site();
} else {
	Layouts.login();
};
