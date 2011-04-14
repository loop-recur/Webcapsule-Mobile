Titanium.include('initializers/bootstrap.js');
try { App.bootstrap(); } catch(E) { alert("Failed with "+E); }

Titanium.UI.setBackgroundColor('#000');

var dir = Titanium.Filesystem.applicationDataDirectory;
var credentials = Titanium.Filesystem.getFile(dir,'credentials');

if(credentials.exists()) {
	App.http_client.credentials = credentials.read();
	Layouts.nav();
} else {
	Layouts.login();
};
