Layouts.users = function() {

	var view = Ti.UI.createView({
		backgroundImage:'images/app_wide/bg_full.png'
	});
	
	var nav = Ti.UI.createView({
		top:0,
		height:40
	});
	
	var content = Ti.UI.createView({
		top:40,
		height:360
	});
	
	App.action(content, "followings#index");
	view.add(nav);
	view.add(content);
	Layouts.replaceContent(view);
};