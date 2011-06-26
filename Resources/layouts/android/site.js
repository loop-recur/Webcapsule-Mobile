Layouts.site = function() {
	
	var site_window = Titanium.UI.createWindow({
		backgroundColor:'white'
	});
	
	if (Helpers.application.densityIsMedium())
	  {
	  var content_window_top = 0;
	  }
	else
	  {
		var content_window_top = 0;
	  }
	
	var content_window = Titanium.UI.createView({
		top:content_window_top,
		height:"400dp",
		zIndex:20,
		id: "content_window"
	});
	Layouts.site_window = site_window;
	Layouts.content_window = content_window;
	
	var content_view = Titanium.UI.createView();
	
	Layouts.replaceContent(content_view);
	
	var bottom_nav = Layouts.bottomNav();
	
	site_window.add(content_window);
	site_window.add(bottom_nav);
	
	site_window.open();
};
