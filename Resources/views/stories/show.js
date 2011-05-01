Views.stories.show = Views.extend();

Views.stories.show.template = function() {
	var self = this;
	var win = Titanium.UI.createWindow({ title:'Story', backgroundColor:'#fff' });

	var story_label = Titanium.UI.createLabel({
		text: self.source.name,
		height:'auto',
		color:'#616161',
		textAlign:'center'
	});
	
	var close_button = Titanium.UI.createButton({
		title:'Close',
		height:30,
		width:150,
		top:0,
		right:0
	});
	
	close_button.addEventListener('click', function() { win.close(); });

	win.add(close_button);
	win.open();
	

	win.add(story_label);	
};
