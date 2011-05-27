Views.sharings.init = Views.extend();

Views.sharings.init.template = function() {
	var self = this;
	var story = self.params.story;
	var sharing = self.source;
	var win = self.win;
	var twitter = getAuth('twitter');
	var facebook = getAuth('facebook');
	
	
	var view = Titanium.UI.createView({
		zIndex:30,
		height:114,
		width:320,
		top:80,
		backgroundImage:'images/sharestory/share_bg.png',
		
	});
	
	var share_button = Titanium.UI.createButton({
		backgroundImage:'images/app_wide/ok_normal.png',
		backgroundSelectedImage:'images/app_wide/ok_pressed.png',
  	right:5,
    width:83,  
    height:49
	});

	share_button.addEventListener('click', function() {
		var story = Views.stories._form.source;
		story.twitter = sharing.twitter;
		story.facebook = sharing.facebook;
		(story.twitter || story.facebook) ? Views.stories._form.toggle_sharing_icon(true) : Views.stories._form.toggle_sharing_icon(false);
		win.remove(view);
	});

	var facebook_button = Titanium.UI.createButton({
		backgroundImage:"images/sharestory/fb_not_sharing.png",
		height:54,
		width:47,
		left:25
	});
	
	var twitter_button = Titanium.UI.createButton({
		backgroundImage:"images/sharestory/tw_not_sharing.png",
		height:54,
		width:43,
		left:100
	});
	
	view.add(share_button);
	view.add(facebook_button);
	view.add(twitter_button);
	
	win.add(view);

	if(facebook) {connectAndShareFacebook()};
	if(twitter) {connectAndShareTwitter()};
	
	function getAuth(name) {
		var auth = Functional.select(".authentication.provider == '"+name+"'", App.currentUser().authentications)[0];
		return auth ? auth.authentication : null;
	};
	
	function connectAndShareFacebook() {

		facebook_button.addEventListener('click', function() {
			
			if(Helpers.application.isBlank(sharing.facebook)) {
				Helpers.user.connectFacebook(function(user) {
					facebook_button.backgroundImage = 'images/sharestory/fb_sharing.png';
					sharing.facebook = facebook.id;
				});
			} else {
				facebook_button.backgroundImage = 'images/sharestory/fb_not_sharing.png';
				sharing.facebook = null;
			};
		});
	};
	
	function connectAndShareTwitter() {

		twitter_button.addEventListener('click', function() {
			
			if(Helpers.application.isBlank(sharing.twitter)) {
				Helpers.user.connectTwitter(function(user) {
					twitter_button.backgroundImage = "images/sharestory/tw_sharing.png";
					sharing.twitter = twitter.id;
				});
			} else {
				twitter_button.backgroundImage = 'images/sharestory/tw_not_sharing.png';
				sharing.twitter = null;
			};
		});
	};
	
};
