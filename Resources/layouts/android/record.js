Layouts.record = function(story) {	
	var win = Titanium.UI.createWindow({
		backgroundColor: "white",
		id:"record.js window"
	});
		
	var close_btn = Titanium.UI.createButton({
		backgroundImage:"images/postrecord/return.png",
		height:26,
		width:26,
		top:45,
		left:5
	});

	close_btn.addEventListener('click', function(e) {
		Views.photos.create.source = [];
		Views.tags.create.source = [];
		Helpers.ui.hideCamera();
		win.close();
		Layouts.stories();
	});
	
	win.add(close_btn);

	Layouts.close_btn = close_btn;
		
	App.action(win, "stories#init", {story: story});
	win.open();
};
