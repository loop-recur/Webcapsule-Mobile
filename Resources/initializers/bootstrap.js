App = {};
Views = {};
Controllers = {};
Layouts = {};
Config = {};

Titanium.include('lib/framework/support/functional.js');
Titanium.include('lib/framework/lib/base.js');
Titanium.include('lib/framework/support/http_client_with_cache.js');
Titanium.include('lib/framework/lib/http_client.js');
Titanium.include('config/environments.js');

FileListHack = [
	"controllers/stories_controller.js",
	"controllers/user_sessions_controller.js",
	"layouts/login.js",
	"layouts/nav.js",
	"layouts/proof.js",
	"views/stories/index.js",
	"views/stories/show.js"
]

App.bootstrap = function() {
	includeAllFiles();
	var isIphone = Titanium.Filesystem.resourcesDirectory.split("/")[1] === "var";
	var environment = isIphone ? "production" : "development";
	App.environments[environment]();
	var client = new HTTPClientWithCache({baseUrl: App.base_url, retryCount: 2, cacheSeconds: 60});
	App.http_client = LoopRecur.HttpClient(client);
};

function includeAllFiles() {
	Functional.map(includeFile, FileListHack);
}

function includeFile(name) {
	makeNamespace(name);
	Titanium.include(name);
}

function makeNamespace(name) {
	var kinds = {"views": Views, "controllers": Controllers, "layouts": Layouts, "config": Config};
	var paths = name.split('/');
	var kind = paths[0];
	var namespace = paths[1];
	if(!kinds[kind][namespace]) kinds[kind][namespace] = {};
	return name;
};

App.action = function(win, controller_action, args) {
	var names = controller_action.split("#");
	var controller = names[0];
	var action = names[1];
	var callBack = Views[controller][action].partial(win);
	Controllers[controller][action](callBack, args);
};
