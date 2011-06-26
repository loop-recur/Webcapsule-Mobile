Layouts.record = function(story) {	
	var win = Titanium.UI.createWindow({
		id:"record"
	});
	
	if (Helpers.application.densityIsMedium())
	  {
	  var close_btn_top = 5;
		var close_btn_left = 5;
	  }
	else
	  {
	  var close_btn_top = 5;
		var close_btn_left = 5;
	  }
		
	var close_btn = Titanium.UI.createButton({
		backgroundImage:"images/postrecord/return.png",
		height:"26dp",
		width:"26dp",
		top:close_btn_top,
		left:close_btn_left
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
