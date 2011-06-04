App = {};
App.run = Bootstrap.run;

App.setCurrentUser = function(user) {
	var dir = Titanium.Filesystem.applicationDataDirectory;
	var user_file = Titanium.Filesystem.getFile(dir,'current_user');
	
	if(user) {
		cache(user);
	} else {
		var user = {};
	};
	
	if(user_file) {
		try{
			var user_data = user_file.read();
			user = JSON.parse(user_data.toString());
		} catch(e) {}
	} 
	
	App.currentUser = function() {
		if(!(user && user.id)) Controllers.user_sessions.destroy();
		return user;
	};
	
	function cache(user) {
		user_file.write(JSON.stringify(user));
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
