Views.sharings.init = Views.extend();

Views.sharings.init.template = function() {
	var self = this;
	var story = self.params.story;
	var sharing = self.source;
	var win = self.win;
	var twitter = getAuth('twitter');
	var facebook = getAuth('facebook');
	
	var container = Titanium.UI.createView({
		zIndex:30,
		height:114,
		width:320,
		top:80
	});
	
	var view = Titanium.UI.createView({
		height:110,
		width:306,
		backgroundImage:'images/sharestory/share_bg.png',
	});
	
	container.add(view);
	
	var share_button = Titanium.UI.createButton({
		backgroundImage:'images/sharestory/btn_share.png',
		backgroundSelectedImage:'images/sharestory/btn_share-down.png',
  	right:5,
    width:83,  
    height:49
	});

	share_button.addEventListener('click', function() {
		var story = Views.stories._form.source;
		story.twitter = sharing.twitter;
		story.facebook = sharing.facebook;
		(story.twitter || story.facebook) ? Views.stories._form.toggle_sharing_icon(true) : Views.stories._form.toggle_sharing_icon(false);
		win.remove(container);
	});

	var facebook_button = Titanium.UI.createButton({
		backgroundImage:"images/sharestory/fb_not_sharing.png",
		height:41,
		width:43,
		left:50
	});
	
	var twitter_button = Titanium.UI.createButton({
		backgroundImage:"images/sharestory/tw_not_sharing.png",
		height:41,
		width:43,
		left:122
	});
	
	var cancel_button = Titanium.UI.createView({
		backgroundImage:'images/add_tag/remove_icon.png',
		left:2,
		top:2,
		width: 25,
		height: 25,
		zIndex:30
	});
	
	cancel_button.addEventListener('click', function() {
		win.remove(container);
	});
	
	view.add(share_button);
	view.add(facebook_button);
	view.add(twitter_button);
	container.add(cancel_button);
	
	
	win.add(container);

	if(facebook) toggleFacebook();
	if(twitter) toggleTwitter();
	
	facebook_button.addEventListener('click', function() {
		facebook ? toggleFacebook() : connectFacebook();
	});
	
	twitter_button.addEventListener('click', function() {
		twitter ? toggleTwitter() : connectTwitter();
	});
		
	function toggleFacebook() {
		if(facebook_button.backgroundImage == 'images/sharestory/fb_not_sharing.png') {
			sharing.facebook = facebook.id;
			facebook_button.backgroundImage = 'images/sharestory/fb_sharing.png';
		} else {
			facebook_button.backgroundImage = 'images/sharestory/fb_not_sharing.png';
			sharing.facebook = null;
		}
	}
	
	function toggleTwitter(state) {
		if(twitter_button.backgroundImage == 'images/sharestory/tw_not_sharing.png') {
			twitter_button.backgroundImage = "images/sharestory/tw_sharing.png";
			sharing.twitter = twitter.id;
		} else {
			twitter_button.backgroundImage = 'images/sharestory/tw_not_sharing.png';
			sharing.twitter = null;
		}
	}
	
	function getAuth(name, user) {
		if(!user) user = App.currentUser();
		var auth = Functional.select(".authentication.provider == '"+name+"'", user.authentications)[0];
		return auth ? auth.authentication : null;
	};
	
	function connectFacebook() {
		Helpers.user.connectFacebook(function(user) {
			facebook = getAuth('facebook', user);
			toggleFacebook();
		});
	}
	
	function connectTwitter() {
		Helpers.user.connectTwitter(function(user) {
			twitter = getAuth('twitter', user);
			toggleTwitter();
		});
	}
	
};
