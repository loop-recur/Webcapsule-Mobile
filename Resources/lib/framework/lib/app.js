App = {};
App.run = Bootstrap.run;

App.setCurrentUser = function() {
	var user = {};
	var dir = Titanium.Filesystem.applicationDataDirectory;
	var user_file = Titanium.Filesystem.getFile(dir,'current_user');
	if(user_file) user = JSON.parse(user_file.read());
	
	App.currentUser = function() {
		// if(!user.id){ Controllers.user_sessions.destroy(); };
		return user;
	};
};

App.action = function(win, controller_action, args) {
	var params = args || {};
	var names = controller_action.split("#");
	var controller = names[0];
	var action = names[1];
	var view = (Views[controller] && Views[controller][action]) ? Views[controller][action] : {};
	view.win = win;
	Controllers[controller][action](view, params);
};
