// BOTTOM NAVIGATION
Layouts.bottomNav = function() {

	var win = Titanium.UI.createWindow({
		bottom:0,
		height:58,
		zIndex:50
	});
	
	var bottom_view = Titanium.UI.createView({
		bottom:0,
		height:58,
		backgroundImage:'images/toolbar/toolbar_bg.png'
	}); 

	var stories_button = Titanium.UI.createButton({
		value:false,
		bottom:5,
		left:30,
		height:41,
		width:49,
		backgroundImage:'images/toolbar/books_ico.png',
		zIndex:51
	});
	
	var stories_view = Ti.UI.createView({
		backgroundColor:'gray'
	});
	
	stories_button.addEventListener('click', function()
	{			
		App.action(stories_view, "stories#index");
		Layouts.replaceContent(stories_view);
	});
	
	var users_button = Titanium.UI.createButton({
		value:false,
		bottom:7,
		right:23,
		height:37,
		width:69,
		backgroundImage:'images/toolbar/users_ico.png',
		zIndex:51
	});
	
	var users_view = Ti.UI.createView({
		backgroundColor:'orange'
	});
	
	users_button.addEventListener('click', function()
	{
		Layouts.replaceContent(users_view);
	});

	var record_button = Titanium.UI.createButton({
		value:false,
		bottom:0,
		height:69,
		width:122,
		backgroundImage:'images/toolbar/newstory_btn.png',
		zIndex:51
	});
	
	record_button.addEventListener('click', function()
	{
		var camera_window = Titanium.UI.createWindow({ title:'Record'});
		App.action(camera_window, "stories#init");
		camera_window.open();
	});

	win.add(bottom_view);
	win.add(stories_button);
	win.add(users_button);
	win.add(record_button);
	
	return win;
};