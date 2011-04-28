Layouts.users = function() {

	var view = Ti.UI.createView({
		backgroundColor:'gray'
	});
			
	var buttonObjects = [
		{title:'Followers', width:110},
		{title:'Following', width:110}
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
				App.action(view, "followings#index");
				break;
			case 1: 
				App.action(view, "followings#index", {followees : true});
				break;	
		}
	});
	
	tabbed_bar.fireEvent('click', {index: 0});
	view.add(tabbed_bar);
	Layouts.replaceContent(view);
};