Titanium.include('lib/framework/support/functional.js');
Titanium.include('lib/framework/lib/base.js');
Titanium.include('lib/framework/lib/http_client.js');

App = {};
Views = {};
Controllers = {};
Layouts = {};

App.bootstrap = function() {
	App.http_client = LoopRecur.HttpClient(Titanium.Network.createHTTPClient());
	includeAllFiles("views");
	includeAllFiles("layouts");
	includeAllFiles("controllers");
};

function includeAllFiles(name) {
	var files = Ti.Filesystem.getFile(name).getDirectoryListing();
	var full_names = Functional.map("name+'/'+file".lambda().partial(name), files);
	Functional.map(includeFile, full_names);
};

function includeFile(name) {
	var isFolder = ".split('.')[1] !== 'js'".lambda();
	
	if(isFolder(name)) {
		includeAllFiles(name);
	} else {
		makeNamespace(name);
		Titanium.include(name);
	}
};

function makeNamespace(name) {
	var kinds = {"views": Views, "controllers": Controllers, "layouts": Layouts};
	var paths = name.split('/');
	var kind = paths[0];
	var namespace = paths[1];
	if(!kinds[kind][namespace]) kinds[kind][namespace] = {};
};

App.action = function(win, controller_action, args) {
	var names = controller_action.split("#");
	var controller = names[0];
	var action = names[1];
	var callBack = Views[controller][action].partial(win);
	Controllers[controller][action](callBack, args);
};
