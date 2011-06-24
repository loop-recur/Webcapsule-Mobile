Layouts.stories = function() {
	
	var view = Ti.UI.createView({
		backgroundImage:'images/app_wide/bg_full.png',
		id:"stories"
	});
	
	var nav = Ti.UI.createView({
		top:0,
		height:"40dp"
	});

	var content = Ti.UI.createView({
		top:40,
		height:"360dp"
	});
	
	var my_stories_button = Titanium.UI.createButton({  
			title:"My Stories",
	    value:false,
	    width:"110dp",
	    height:"20dp",
			left: 20
	});

	my_stories_button.addEventListener('click', function(){
		App.action(content, "stories#index");
	});
	
	var feed_button = Titanium.UI.createButton({  
	    title:"Friends' Stories",
	    width:"140dp",
	    height:"20dp",
			right: 20
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
