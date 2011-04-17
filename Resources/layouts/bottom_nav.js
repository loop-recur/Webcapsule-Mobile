// BOTTOM TAB BAR
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

	var stories_tab = Titanium.UI.createButton({
		value:false,
		bottom:5,
		left:30,
		height:41,
		width:49,
		backgroundImage:'images/toolbar/books_ico.png',
		zIndex:51
	});
	
	var stories_view = Ti.UI.createView({
		backgroundColor:'white'
	});
	
	stories_tab.addEventListener('click', function()
	{			
		App.action(stories_view, "stories#index");
		Layouts.replaceContent(stories_view);
	});
	
	var users_tab = Titanium.UI.createButton({
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
	
	users_tab.addEventListener('click', function()
	{
		
		Layouts.replaceContent(users_view);
		// var users_view = Ti.UI.createWindow({
		// 	backgroundColor:'blue',
		// 	url:'layouts/table1.js'
		// });
		// 
		// users_view.open();
	});

	var record_tab = Titanium.UI.createButton({
		value:false,
		bottom:0,
		height:69,
		width:122,
		backgroundImage:'images/toolbar/newstory_btn.png',
		zIndex:51
	});
	
	record_tab.addEventListener('click', function()
	{
		var win2 = Titanium.UI.createWindow({ title:'Record'});
		App.action(win2, "stories#init");
			
		var tab2 = Titanium.UI.createTab({  
			    icon:'KS_nav_views.png',
			    title:'Record',
			    window:win2
		});
		
		win2.open();
	});
	

	win.add(bottom_view);
	win.add(stories_tab);
	win.add(users_tab);
	win.add(record_tab);
	
	return win;
};