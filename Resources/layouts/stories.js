Layouts.stories = function() {

	var view = Ti.UI.createView({
		backgroundImage:'images/app_wide/bg_full.png'
	});
	
	var nav = Ti.UI.createView({
		top:0,
		height:40
	});
	
	var content = Ti.UI.createView({
		top:40,
		height:360
	});

	var buttonObjects = [
		{title:'My Stories', width:110, enabled:true},
		{title:'Friends\' Stories', width:140}
	];
	
	var tabbed_bar = Titanium.UI.createTabbedBar({
		labels:buttonObjects,
		top:0,
		style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
		height:40,
		index:0,
		backgroundColor:'gray'
	});
	
	tabbed_bar.addEventListener('click',function(e) {
		switch(e.index) {
			case 0: 
				App.action(content, "stories#index");
				break;
			case 1: 
				App.action(content, "stories#index", {feed : true});
				break;	
		}
	});
	
	tabbed_bar.fireEvent('click', {index: 0});
	nav.add(tabbed_bar);
	view.add(nav);
	view.add(content);
	Layouts.replaceContent(view);
};