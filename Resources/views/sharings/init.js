Views.sharings.init = Views.extend();

Views.sharings.init.template = function() {
	var self = this;
	var story = self.params.story;
	var sharing = self.source;
	var win = self.win;
	var view = Titanium.UI.createView({zIndex:30, backgroundColor: '#ffffff'});
	var twitter = getAuth('twitter');
	var facebook = getAuth('facebook');
	
	var field = Titanium.UI.createTextField({  
	    color:'#303030',
			backgroundColor:'#d6d6d6',
			borderRadius:4,
			paddingLeft:5,
	    top:10,  
	    width:300,  
	    height:60,  
	    hintText:'Message',  
	    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
	    returnKeyType:Titanium.UI.RETURNKEY_DONE
	});
	
	field.addEventListener('return', function() {
		sharing.message = field.value;
		App.action(win, "sharings#create", {
			sharing : sharing,
			success : function() {
				alert("shared!");
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
			Titanium.Facebook.authorize();
		});
		
		view.add(fbconnect);
		
		Titanium.Facebook.addEventListener('login', function(e) {
			if(e.data) {
				e.data.provider = "facebook";
				e.data.token = Titanium.Facebook.accessToken;
				App.action(win, "omniauth_callbacks#create", {
					data : e.data,
					success : function(user) {
						view.remove(fbconnect);
						showFacebook();
					}
				});
			} else {
				alert("Couldn't authorize Facebook");
			}
		});
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
			b = new BirdHouse({consumer_key: "CgIDnN8kDKPu1uKhMK5Qg", consumer_secret: "AULwvohyIehfXfPUaKAaEifYRtzlDuOIo80qHQVRnyI"});
			b.authorize(saveTwitterAuth);
		});
		
		view.add(twitter_connect);
		
		function saveTwitterAuth(data) {
			if(data) {
				data.id = data.user_id;
				data.token = data.oauth_token;
				data.secret = data.oauth_token_secret;
				data.provider = "twitter";
				App.action(win, "omniauth_callbacks#create", {
					data : data,
					success : function(user) {
						view.remove(twitter_connect);
						showTwitter();
					}
				});
			} else {
				alert("Couldn't authorize Twitter");
			};
		};
	};
};
