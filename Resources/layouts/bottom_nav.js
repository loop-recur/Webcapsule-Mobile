// BOTTOM TAB BAR
Layouts.bottom_nav = function() {

	var win = Titanium.UI.createWindow({
	    backgroundColor:'#fff'
	});
	
	var bottomView = Titanium.UI.createView({
		bottom:0,
		height:58,
		backgroundImage:'images/toolbar/toolbar_bg.png'
	}); 

	var storiesTab = Titanium.UI.createButton({
		value:false,
		bottom:5,
		left:30,
		height:41,
		width:49,
		backgroundImage:'images/toolbar/books_ico.png'
	});
	
	storiesTab.addEventListener('click', function()
	{
		var win1 = Titanium.UI.createWindow({
		    title:'Stories',
		    backgroundColor:'#fff'
		});
		
		App.action(win1, "stories#index");		
		win1.open();
	});
	

	var usersTab = Titanium.UI.createButton({
		value:false,
		bottom:7,
		right:23,
		height:37,
		width:69,
		backgroundImage:'images/toolbar/users_ico.png'
	});

	var recordTab = Titanium.UI.createButton({
		value:false,
		bottom:0,
		height:69,
		width:122,
		backgroundImage:'images/toolbar/newstory_btn.png'
	});
	
	recordTab.addEventListener('click', function()
	{
		var win2 = Titanium.UI.createWindow({
			title:'Record',
			url:'overlays/record.js'
		});
	
		var tab2 = Titanium.UI.createTab({  
	    icon:'KS_nav_views.png',
	    title:'Record',
	    window:win2
		});
		
		win2.open();
	});
	

	win.add(bottomView);
	win.add(storiesTab);
	win.add(usersTab);
	win.add(recordTab);

	win.open();
};