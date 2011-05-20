Helpers.user = {};

Helpers.user.canEdit = function(item) {
	var user = App.currentUser();

	function isItemCreator() {
		return item.user_id && item.user_id == user.id
	};
	
	function isStoryCreator() {
		var story = Views.stories._form.source; //lame
		return item.story_id && item.story_id == story.id && story.user_id == user.id
	};
	
	return isItemCreator() || isStoryCreator();
};