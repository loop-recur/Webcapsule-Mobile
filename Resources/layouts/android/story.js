Layouts.story = function(id) {
	var win = Layouts.site_window;

	Ti.API.info("call show");
	App.action(win, "stories#show", {id: id});	
};
