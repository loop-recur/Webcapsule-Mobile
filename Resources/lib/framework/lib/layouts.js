Layouts = {};

Layouts.replaceContent = function(new_content) {
	Ti.API.info("replacing");
	if(Layouts.current_content) Layouts.content_window.remove(Layouts.current_content);
	Ti.API.info("add new content");
	Layouts.content_window.add(new_content);
	Ti.API.info("set current");
	Layouts.current_content = new_content;
};
