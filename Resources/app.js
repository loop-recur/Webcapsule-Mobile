Titanium.include('initializers/bootstrap.js');
App.base_url = 'http://www.webcapsule.com/i_phone';
App.bootstrap();

Titanium.UI.setBackgroundColor('#000');

var dir = Titanium.Filesystem.applicationDataDirectory;
var credentials = Titanium.Filesystem.getFile(dir,'credentials');

if(credentials.exists()) {
	App.http_client.credentials = credentials.read();
	Views.proof();
} else {
	Views.login();
}
