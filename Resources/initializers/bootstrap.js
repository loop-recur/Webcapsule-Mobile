App = {};
Views = {};
Controllers = {};
Layouts = {};
Config = {};
Lib = {};

Titanium.include('lib/framework/support/functional.js');
Titanium.include('lib/framework/lib/base.js');
Titanium.include('lib/framework/lib/cache.js');
Titanium.include('lib/framework/support/http_client_with_cache.js');
Titanium.include('lib/framework/lib/http_client.js');
Titanium.include('lib/framework/lib/db.js');
Titanium.include('config/environments.js');

FileListHack = [
	"controllers/stories_controller.js",
	"controllers/user_sessions_controller.js",
	"controllers/followings_controller.js",
	"layouts/site.js",	
	"layouts/login.js",
	"layouts/bottom_nav.js",
	"layouts/users.js",
	"layouts/stories.js",
	"layouts/record.js",	
	"views/stories/index.js",
	"views/stories/show.js",
	"views/stories/_form.js",
	"views/stories/init.js",
	"views/stories/create.js",
	"views/followings/show.js",
	"views/followings/index.js"
]

App.bootstrap = function() {
	includeAllFiles();
	runEnvironment();
	App.http_client = LoopRecur.HttpClient();
};

function includeAllFiles() {
	Functional.map(includeFile, FileListHack);
}

function includeFile(name) {
	makeNamespace(name);
	Titanium.include(name);
}

function makeNamespace(name) {
	var kinds = {"views": Views, "controllers": Controllers, "layouts": Layouts, "config": Config, "lib": Lib};
	var paths = name.split('/');
	var kind = paths[0];
	var namespace = paths[1];
	if(!kinds[kind][namespace]) kinds[kind][namespace] = {};
	return name;
};

function runEnvironment() {
	var isIphone = Titanium.Filesystem.resourcesDirectory.split("/")[1] === "var";
	var environment = isIphone ? "production" : "development";
	App.environments[environment]();
}

App.action = function(win, controller_action, args) {
	var params = args || {};
	var names = controller_action.split("#");
	var controller = names[0];
	var action = names[1];
	var view = Views[controller][action] ? Views[controller][action] : {};
	view.win = win;
	Controllers[controller][action](view, params);
};

Layouts.replaceContent = function(new_content) {		
	if(Layouts.current_content) Layouts.content_window.remove(Layouts.current_content);
	Layouts.content_window.add(new_content);
	Layouts.current_content = new_content;
}