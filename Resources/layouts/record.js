Layouts.record = function() {
	
	var camera_window = Titanium.UI.createWindow();
	App.action(camera_window, "stories#init");
	camera_window.open();
};