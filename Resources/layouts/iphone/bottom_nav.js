// BOTTOM NAVIGATION
Layouts.bottomNav = function() {

	var win = Titanium.UI.createView({
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
		left:45,
		height:43,
		width:51,
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
		bottom:4,
		right:45,
		height:43,
		width:51,
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
		bottom:0,
		height:62,
		width:81,
		backgroundImage:'images/toolbar/navbtn_record.png',
		backgroundSelectedImage:'images/toolbar/navbtn_record-down.png',
		zIndex:51
	});
	
	record_button.addEventListener('click', function() {
		Layouts.record();
	});
	
	var logout = Titanium.UI.createLabel({
		text:'logout',
		bottom:10,
		width:150,
		height:40,
		zIndex: 99,
		color:'gray',
		textAlign:'center',
		font:{fontFamily:'Arial',fontWeight:'bold',fontSize:10}
	});

	logout.addEventListener('click', function() {
		Controllers.user_sessions.destroy();
	});

	win.add(bottom_view);
	win.add(stories_button);
	win.add(users_button);
	win.add(record_button);
	win.add(logout);
	
	record_button.fireEvent('click');
	return win;
};