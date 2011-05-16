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
	
	stories_button.addEventListener('click', function()
	{			
		Layouts.stories();
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

	users_button.addEventListener('click', function()
	{
		Layouts.users();
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
		Layouts.record();
	});
	
	var logout_button = Titanium.UI.createButton({
		title:'X',
		left:0,
		bottom:10,
		width:20,
		height:20,
		color:'white',
		zIndex:999
	});
	
	logout_button.addEventListener('click', function(){
		Controllers.user_sessions.destroy();
	});

	win.add(bottom_view);
	win.add(stories_button);
	win.add(users_button);
	win.add(record_button);
	win.add(logout_button);
	
	
	record_button.fireEvent('click');
	return win;
};