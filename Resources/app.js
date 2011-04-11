Titanium.include('initializers/bootstrap.js');
App.bootstrap();

Titanium.UI.setBackgroundColor('#000');

var dir = Titanium.Filesystem.applicationDataDirectory;
var credentials = Titanium.Filesystem.getFile(dir,'credentials');

if(credentials.exists()) {
	App.http_client.credentials = credentials.read();
	Views.nav();
} else {
	Views.login();
}
