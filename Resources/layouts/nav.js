Layouts.nav = function () {
	
	var tabGroup = Titanium.UI.createTabGroup();
	
	var win1 = Titanium.UI.createWindow({
	    title:'Stories',
	    backgroundColor:'#fff'
	});
	
	win1.addEventListener('open', function() {
		App.action(win1, "stories#index");
	});
	
	var tab1 = Titanium.UI.createTab({  
	    icon:'KS_nav_ui.png',
	    title:'Stories',
	    window:win1
	});

	var win2 = Titanium.UI.createWindow({
		title:'Record',
		url:'overlays/record.js'
	});

	var tab2 = Titanium.UI.createTab({  
	    icon:'KS_nav_views.png',
	    title:'Record',
	    window:win2
	});

	var win3 = Titanium.UI.createWindow({  
	    title:'Users',
	    backgroundColor:'#fff'
	});

	var tab3 = Titanium.UI.createTab({  
	    icon:'KS_nav_ui.png',
	    title:'Users',
	    window:win3
	});

	var logoutBtn = Titanium.UI.createButton({
		title:'Logout'
	});
		
	logoutBtn.addEventListener('click', function(){
		Controllers.user_sessions.destroy();
	});
	
	win1.setRightNavButton(logoutBtn);
	win3.setRightNavButton(logoutBtn);
	tabGroup.addTab(tab1);
	tabGroup.addTab(tab2);
	tabGroup.addTab(tab3);

	tabGroup.addEventListener('open',function()
	{
		Titanium.UI.setBackgroundColor('#fff');
	});

	tabGroup.setActiveTab(0); 
	tabGroup.open({
		transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT
	});
};