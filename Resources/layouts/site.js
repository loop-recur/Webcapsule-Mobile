Layouts.site = function () {
	
	var site_window = Titanium.UI.createWindow({
		backgroundColor:'white'
	});
	
	var logout_button = Titanium.UI.createButton({
		title:'logout',
		width:67,
		height:25,
	});
	
		logout_button.addEventListener('click', function(){
			Controllers.user_sessions.destroy();
		});
		
	var site_toolbar = Titanium.UI.createToolbar({
		items:[logout_button],
		top:0,
		borderTop:false,
		barColor:'black'
	});
	
	var content_window = Titanium.UI.createWindow({
		top:44,
		height:362,
		zIndex:20
	});
	
	Layouts.content_window = content_window;
	
	var content_view = Titanium.UI.createView();
	
	Layouts.replaceContent(content_view);
	
	var bottom_nav = Layouts.bottomNav();
	
	site_window.add(site_toolbar);
	site_window.add(content_window);
	site_window.add(bottom_nav);
	
	site_window.open();
};