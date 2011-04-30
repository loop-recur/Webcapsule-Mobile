Layouts.record = function() {
	
	var camera_window = Titanium.UI.createWindow({backgroundColor: "#ccc"});
	App.action(camera_window, "stories#init");
	camera_window.open();
};
