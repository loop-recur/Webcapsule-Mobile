Layouts.stories = function() {
	
	var view = Ti.UI.createView({
		backgroundImage:'images/app_wide/bg_full.png',
		id:"stories"
	});
	
	if (Helpers.application.densityIsMedium())
	  {
	  var nav_top = 0;
		var content_top = 45;
		var content_height = 355;
		var my_stories_button_right = 62;
		var feed_button_left = 62;
		var mystories_button_top = 2;
		var feed_button_top = 2;
	  }
	else
	  {
		var nav_top = 0;
		var content_top = 85;
		var content_height = 687;
		var my_stories_button_right = 91;
		var feed_button_left = 91;
		var mystories_button_top = 4;
		var feed_button_top = 4;
	  }
	
	var nav = Ti.UI.createView({
		top:nav_top,
		height:"45dp"
	});

	var content = Ti.UI.createView({
		top:content_top,
		height:content_height
	});
	
	var my_stories_button = Titanium.UI.createButton({  
			backgroundImage:'images/feed/btn_myown.png',
			backgroundSelectedImage:'images/feed/btn_myown-pressed.png',
	    value:false,
	    width:"99dp",
	    height:"43dp",
			right:my_stories_button_right,
			top:mystories_button_top
	});

	my_stories_button.addEventListener('click', function(){
		App.action(content, "stories#index", {page : 1});
	});
	
	var feed_button = Titanium.UI.createButton({  
			backgroundImage:'images/feed/btn_friends.png',
			backgroundSelectedImage:'images/feed/btn_friends-pressed.png',
			value:false,
			width:"99dp",
	    height:"43dp",
			left:feed_button_left,
			top:feed_button_top
	});

	feed_button.addEventListener('click', function(){
		App.action(content, "stories#index", {feed : true, page : 1});
	});
	
	nav.add(my_stories_button);
	nav.add(feed_button);
	view.add(nav);
	view.add(content);
	App.action(content, "stories#index");
	
	Layouts.replaceContent(view);
};
