Views.stories.show = function(view, story) {
			
	var story_label = Titanium.UI.createLabel({
		text: story.name,
		height:'auto',
		color:'#616161',
		textAlign:'center'
	});

	view.add(story_label);
	
};
