Layouts.stories = function() {

	var view = Ti.UI.createView({
		backgroundColor:'gray'
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
				App.action(view, "stories#index");
				break;
			case 1: 
				App.action(view, "stories#index", {feed : true});
				break;	
		}
	});
	
	tabbed_bar.fireEvent('click', {index: 0});
	view.add(tabbed_bar);
	Layouts.replaceContent(view);
};