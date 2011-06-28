Layouts.users = function() {

	var view = Ti.UI.createView({
		backgroundImage:'images/app_wide/bg_full.png'
	});
	
	if (Helpers.application.densityIsMedium())
	  {
	  var nav_top = 0;
		var followers_button_left = 72;
		var followees_button_right = 72;
		var content_top = 45;
		var content_height = 355;
		var followers_button_top = 2;
		var followees_button_top = 2;
	  }
	else
	  {
	  var nav_top = 0;
		var followers_button_left = 91;
		var followees_button_right = 91;
		var content_top = 87;
		var content_height = 767;
	  var followers_button_top = 4;
		var followees_button_top = 4;
	  }
	
	var nav = Ti.UI.createView({
		top:nav_top,
		height:"45dp"
	});
	
	var followers_button = Titanium.UI.createButton({  
			backgroundImage:'images/feed/btn_followers-normal.png',
			backgroundSelectedImage:'images/feed/btn_followers-pressed.png',
	    value:false,
	    width:"99dp",
	    height:"43dp",
			left:followers_button_left,
			top: followers_button_top
	});

	followers_button.addEventListener('click', function(){
		App.action(content, "followings#index");
	});
	
	var followees_button = Titanium.UI.createButton({  
	    backgroundImage:'images/feed/btn_following-normal.png',
			backgroundSelectedImage:'images/feed/btn_following-pressed.png',
			value:false,
	    width:"99dp",
	    height:"43dp",
			right:followees_button_right,
			top:followees_button_top
	});

	followees_button.addEventListener('click', function(){
		App.action(content, "followings#index", {followees : true});
	});
	
	var content = Ti.UI.createView({
		top:content_top,
		height:content_height
	});
	
	nav.add(followers_button);
	nav.add(followees_button);
	view.add(nav);
	view.add(content);
	App.action(content, "followings#index");
	Layouts.replaceContent(view);
};