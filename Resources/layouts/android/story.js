Layouts.story = function(id) {
	var win = Layouts.site_window;
	App.action(win, "stories#show", {id: id});	
};
