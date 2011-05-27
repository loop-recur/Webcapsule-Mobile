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
		win.remove(view);
	});
	
	view.add(close_btn);

	var field = Titanium.UI.createTextField({  
	    backgroundColor:text_field_background_color,
			color:text_field_text_color,
			borderRadius:4,
			paddingLeft:5,
	    width:300,  
			top:0,
	    height:30,  
	    hintText:'Message',  
	    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
	    returnKeyType:Titanium.UI.RETURNKEY_DONE
	});
	
	field.addEventListener('return', function() {
		sharing.message = field.value;
		App.action(win, "sharings#create", {
			sharing : sharing,
			success : function() {
				win.remove(view);
			}
		});
	});
	
	view.add(field);
	win.add(view);
	
	twitter ? showTwitter() : connectTwitter();
	facebook ? showFacebook() : connectFacebook();
	
	
	function showTwitter() {
		var twitterLabel = Titanium.UI.createLabel({
			text:'Twitter',
			left: 130
		});
		
		var twitterSwitch = Titanium.UI.createSwitch({
			value:false,
			top:240
		});
		
		twitterSwitch.addEventListener('change',function(e) {
			sharing.twitter = (e.value == 1) ? twitter.id : "";
		});	
		
		view.add(twitterLabel);
		view.add(twitterSwitch);
	};
	
	function showFacebook() {
		var facebookLabel = Titanium.UI.createLabel({
			text:'Facebook',
			top: 150,
			left: 130
		});

		var facebookSwitch = Titanium.UI.createSwitch({
			value:false,
			top:340
		});

		facebookSwitch.addEventListener('change',function(e) {
			sharing.facebook = (e.value == 1) ? facebook.id : "";
		});	
		
		view.add(facebookLabel);
		view.add(facebookSwitch);
	};	
	
	function getAuth(name) {
		var auth = Functional.select(".authentication.provider == '"+name+"'", App.currentUser().authentications)[0];
		return auth ? auth.authentication : null;
	};
	
	function connectFacebook() {
		var fbconnect = Titanium.UI.createButton({
			title: "login facebook",
			left:160,
			height:41,
			width:79,
			backgroundColor: "red"
		});	

		fbconnect.addEventListener('click', function() {
			Helpers.user.connectFacebook(function(user) {
					view.remove(fbconnect);
					showFacebook();
			});
		});
		
		view.add(fbconnect);
	};
	
	function connectTwitter() {
		var twitter_connect = Titanium.UI.createButton({
			title: "login twitter",
			left:30,
			height:41,
			width:79,
			backgroundColor: "red"
		});	

		twitter_connect.addEventListener('click', function() {
			Helpers.user.connectTwitter(function(user) {
				view.remove(twitter_connect);
				showTwitter();
			});
		});
		
		view.add(twitter_connect);
	};
};
