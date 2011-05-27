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
	
	var close_btn = Titanium.UI.createButton({
		backgroundImage:"images/sharestory/btn_close.png",
		backgroundSelectedImage:"images/sharestory/btn_close-pressed.png",
		height:49,
		width:83,
		right:5
	});

	close_btn.addEventListener('click', function() {
		App.action(win, "sharings#create", {
			sharing : sharing,
			success : function() {
				win.remove(view);
			}
		});		
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
	
	view.add(close_btn);
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
				sharing.facebook = "";
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
				sharing.twitter = "";
			};
		});
	};
	
};
