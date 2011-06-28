// BOTTOM NAVIGATION
Layouts.bottomNav = function() {	
	if (Helpers.application.densityIsMedium())
	  {
	  var win_bottom = 0;
		var bottom_view_bottom = 0;
		var stories_button_bottom = 5;
		var stories_button_left = 45;
		var users_button_bottom = 4;
		var users_button_right = 45
		var record_button_bottom = 0;
	  }
	else
	  {
		var win_bottom = 0;
		var bottom_view_bottom = 0;
		var stories_button_bottom = 5;
		var stories_button_left = 45;
		var users_button_bottom = 4;
		var users_button_right = 45
		var record_button_bottom = 0;
	  }

	var win = Titanium.UI.createView({
		bottom:win_bottom,
		height:"58dp",
		zIndex:50
	});
	
	var bottom_view = Titanium.UI.createView({
		bottom:bottom_view_bottom,
		height:"58dp",
		backgroundImage:'images/toolbar/toolbar_bg.png'
	}); 

	var stories_button = Titanium.UI.createButton({
		value:false,
		bottom:stories_button_bottom,
		left:stories_button_left,
		height:"43dp",
		width:"51dp",
		backgroundImage:'images/toolbar/navbtn_stories.png',
		backgroundSelectedImage:'images/toolbar/navbtn_stories-pressed.png',
		zIndex:51
	});
	
	stories_button.addEventListener('click', function()
	{			
		Layouts.stories();
	});
	
	var users_button = Titanium.UI.createButton({
		value:false,
		bottom:users_button_bottom,
		right:users_button_right,
		height:"43dp",
		width:"51dp",
		backgroundImage:'images/toolbar/navbtn_friends.png',
		backgroundSelectedImage:'images/toolbar/navbtn_friends-pressed.png',
		zIndex:51
	});

	users_button.addEventListener('click', function()
	{
		Layouts.users();
	});

	var record_button = Titanium.UI.createButton({
		value:false,
		bottom:record_button_bottom,
		height:"62dp",
		width:"81dp",
		backgroundImage:'images/toolbar/navbtn_record.png',
		backgroundSelectedImage:'images/toolbar/navbtn_record-down.png',
		zIndex:51
	});
	
	record_button.addEventListener('click', function() {
		Layouts.record();
	});
	
	var logout_button = Titanium.UI.createButton({
		title:"LOGOUT",
		bottom:0,
		height:"62dp",
		width:"81dp",
		right: 80,
		zIndex: 64
	});
	
	logout_button.addEventListener('click', function() {
		Controllers.user_sessions.destroy();
	});

	win.add(bottom_view);
	win.add(stories_button);
	win.add(users_button);
	win.add(logout_button);
	win.add(record_button);
	

	record_button.fireEvent('click');
	return win;
};
