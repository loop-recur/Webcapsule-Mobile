Layouts.users = function() {

	var view = Ti.UI.createView({
		backgroundImage:'images/app_wide/bg_full.png'
	});
	
	var nav = Ti.UI.createView({
		top:0,
		height:40
	});
	
	var followers_button = Titanium.UI.createButton({  
			title:"Followers",
	    value:false,
	    width:110,
	    height:20,
			left: 20
	});

	followers_button.addEventListener('click', function(){
		App.action(content, "followings#index");
	});
	
	var followees_button = Titanium.UI.createButton({  
	    title:"Following",
	    width:140,
	    height:20,
			right: 20
	});

	followees_button.addEventListener('click', function(){
		App.action(content, "followings#index", {followees : true});
	});
	
	var content = Ti.UI.createView({
		top:40,
		height:360
	});
	
	nav.add(followers_button);
	nav.add(followees_button);
	view.add(nav);
	view.add(content);
	App.action(content, "followings#index");
	Layouts.replaceContent(view);
};