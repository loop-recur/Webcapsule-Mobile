Views.stories.show = function(win, item) {
			
	var story_label = Titanium.UI.createLabel({
		text: item.story.name,
		top: 330,
		width:150,
		height:'auto',
		color:'#616161',
		textAlign:'center'
	});

	win.add(story_label);
	
};
