Layouts.users = function() {

	var view = Ti.UI.createView({
		backgroundImage:'images/app_wide/bg_full.png'
	});
	
	if (Helpers.application.densityIsMedium())
	  {
	  var nav_top = 0;
		var followers_button_left = 20;
		var followees_button_right = 20;
		var content_top = 40;
		var content_height = 360;
	  }
	else
	  {
	  var nav_top = 0;
		var followers_button_left = 20;
		var followees_button_right = 20;
		var content_top = 80;
		var content_height = 740;
	  }
	
	var nav = Ti.UI.createView({
		top:nav_top,
		height:"40dp"
	});
	
	var followers_button = Titanium.UI.createButton({  
			title:"Followers",
	    value:false,
	    width:"110dp",
	    height:"20dp",
			left:followers_button_left
	});

	followers_button.addEventListener('click', function(){
		App.action(content, "followings#index");
	});
	
	var followees_button = Titanium.UI.createButton({  
	    title:"Following",
	    width:"140dp",
	    height:"20dp",
			right:followees_button_right
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