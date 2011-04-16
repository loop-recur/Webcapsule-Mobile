Views.stories.show = function(view, item) {
			
	var story_label = Titanium.UI.createLabel({
		text: item.story.name,
		height:'auto',
		color:'#616161',
		textAlign:'center'
	});

	view.add(story_label);
	
};
