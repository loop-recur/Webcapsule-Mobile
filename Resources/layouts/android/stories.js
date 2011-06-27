Layouts.stories = function() {
	
	var view = Ti.UI.createView({
		backgroundImage:'images/app_wide/bg_full.png',
		id:"stories"
	});
	
	if (Helpers.application.densityIsMedium())
	  {
	  var nav_top = 0;
		var content_top = 40;
		var content_height = 360;
		var my_stories_button_left = 20;
		var feed_button_right = 20;
	  }
	else
	  {
		var nav_top = 0;
		var content_top = 80;
		var content_height = 767;
		var my_stories_button_left = 20;
		var feed_button_right = 20;
	  }
	
	var nav = Ti.UI.createView({
		top:nav_top,
		height:"40dp"
	});

	var content = Ti.UI.createView({
		top:content_top,
		height:content_height
	});
	
	var my_stories_button = Titanium.UI.createButton({  
			title:"My Stories",
	    value:false,
	    width:"110dp",
	    height:"20dp",
			left:my_stories_button_left
	});

	my_stories_button.addEventListener('click', function(){
		App.action(content, "stories#index");
	});
	
	var feed_button = Titanium.UI.createButton({  
	    title:"Friends' Stories",
	    width:"140dp",
	    height:"20dp",
			right:feed_button_right
	});

	feed_button.addEventListener('click', function(){
		App.action(content, "stories#index", {feed : true});
	});
	
	nav.add(my_stories_button);
	nav.add(feed_button);
	view.add(nav);
	view.add(content);
	App.action(content, "stories#index");
	
	Layouts.replaceContent(view);
};
