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


Helpers.user.connectFacebook = function(success) {
	var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'facebook.config');
	
	Titanium.Facebook.loggedIn ? saveFacebookAuth() : Titanium.Facebook.authorize();	
	
	Titanium.Facebook.addEventListener('login', function(e) {
		file.write(JSON.stringify(e.data));
		saveFacebookAuth();
	});
	
	function saveFacebookAuth() {
		var data = JSON.parse(file.read());
		
		if(data) {
			data.provider = "facebook";
			data.token = Titanium.Facebook.accessToken;
			App.action(undefined, "omniauth_callbacks#create", {
				data : data,
				success : success
			});
		} else {
			alert("Couldn't authorize Facebook");
		}
	};
};

Helpers.user.connectTwitter = function(success) {
	b = new BirdHouse({consumer_key: "CgIDnN8kDKPu1uKhMK5Qg", consumer_secret: "AULwvohyIehfXfPUaKAaEifYRtzlDuOIo80qHQVRnyI"});
	b.authorize(saveTwitterAuth);
	
	function saveTwitterAuth(data) {
		if(data) {
			data.id = data.user_id;
			data.token = data.oauth_token;
			data.secret = data.oauth_token_secret;
			data.provider = "twitter";
			App.action(undefined, "omniauth_callbacks#create", {
				data : data,
				success : success
			});
		} else {
			alert("Couldn't authorize Twitter");
		};
	};
};
