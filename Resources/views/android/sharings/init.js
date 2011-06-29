Views.sharings.init = Views.extend();

Views.sharings.init.template = function() {
	var self = this;
	var story = self.params.story;
	var sharing = self.source;
	var win = self.win;
	var twitter = getAuth('twitter');
	var facebook = getAuth('facebook');
	var automatic_share = self.params.automatic_share || false;
	
	if (Helpers.application.densityIsMedium())
	  {
	  var container_top = 80;
		var share_button_right = 5;
		var facebook_button_left = 50;
		var twitter_button_left = 122;
		var cancel_button_left = 2;
		var cancel_button_top = 2;
	  }
	else
	  {
	  var container_top = 80;
		var share_button_right = 20;
		var facebook_button_left = 60;
		var twitter_button_left = 152;
		var cancel_button_left = 1;
		var cancel_button_top = 1;
	  }
	
	var container = Titanium.UI.createView({
		zIndex:30,
		height:"114dp",
		width:"320dp",
		top:container_top
	});
	
	var view = Titanium.UI.createView({
		height:"110dp",
		width:"306dp",
		backgroundImage:'images/sharestory/share_bg.png',
	});
	
	container.add(view);
	
	var share_button = Titanium.UI.createButton({
		backgroundImage:'images/sharestory/btn_share.png',
		backgroundSelectedImage:'images/sharestory/btn_share-down.png',
  	right:share_button_right,
    width:"83dp",  
    height:"49dp"
	});

	share_button.addEventListener('click', function() {
		var story = Views.stories.form.source;
		story.twitter = sharing.twitter;
		story.facebook = sharing.facebook;
		(story.twitter || story.facebook) ? Views.stories.form.toggle_sharing_icon(true) : Views.stories.form.toggle_sharing_icon(false);
		
		if(automatic_share) {
			sharing.message = "Check out this story";
			App.action(win, "sharings#create", {
				sharing : sharing,
				success : function() {
					container.visible = false;
				}
			});
		} else {
			container.visible = false;
		}
	});

	var facebook_button = Titanium.UI.createButton({
		backgroundImage:"images/sharestory/fb_not_sharing.png",
		height:"41dp",
		width:"43dp",
		left:facebook_button_left
	});
	
	var twitter_button = Titanium.UI.createButton({
		backgroundImage:"images/sharestory/tw_not_sharing.png",
		height:"41dp",
		width:"43dp",
		left:twitter_button_left
	});
	
	var cancel_button = Titanium.UI.createView({
		backgroundImage:'images/add_tag/remove_icon.png',
		left:cancel_button_left,
		top:cancel_button_top,
		width:"25dp",
		height:"25dp",
		zIndex:30
	});
	
	cancel_button.addEventListener('click', function() {
		container.visible = false;
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
		win.hide();
		var temp_win = Titanium.UI.createWindow({});
		Helpers.user.connectFacebook(function(user) {
			temp_win.close();
			Views.stories.show.makePlayer();
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
