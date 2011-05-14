Titanium.UI.iPhone.statusBarStyle = Titanium.UI.iPhone.StatusBar.OPAQUE_BLACK;
Titanium.include('initializers/init.js');
try { App.run(); } catch(E) { alert("Failed with "+E); }

Titanium.UI.setBackgroundColor('#000');

var dir = Titanium.Filesystem.applicationDataDirectory;
var credentials = Titanium.Filesystem.getFile(dir,'credentials');
var user_file = Titanium.Filesystem.getFile(dir,'current_user');

if(credentials.exists()) {
	App.http_client.credentials = credentials.read();
	App.current_user = JSON.parse(user_file.read());
	Layouts.site();
} else {
	Layouts.login();
};
