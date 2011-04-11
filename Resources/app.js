Titanium.include('lib/framework/support/functional.js');
Titanium.include('lib/framework/lib/base.js');
Titanium.include('lib/framework/lib/http_client.js');
Titanium.include('initializers/bootstrap.js');
App.bootstrap();

Titanium.include('main_windows/nav.js');
Titanium.include('main_windows/login.js');
Titanium.include('main_windows/stories.js');
Titanium.include('controllers/auth_controller.js');
Titanium.include('controllers/stories_controller.js');

Titanium.UI.setBackgroundColor('#000');

var dir = Titanium.Filesystem.applicationDataDirectory;
var credentials = Titanium.Filesystem.getFile(dir,'credentials');

if(credentials.exists()) {
	App.http_client.credentials = credentials.read();
	Views.nav();
} else {
	Views.login();
}
