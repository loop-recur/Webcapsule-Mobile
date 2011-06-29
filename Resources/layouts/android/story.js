Layouts.story = function(id) {
	var win = Titanium.UI.createWindow({id:"story", fullscreen:true, backgroundColor:"black"});
	App.action(win, "stories#show", {id: id});	
};
