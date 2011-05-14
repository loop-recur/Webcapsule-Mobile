Views.sharings.init = Views.extend();

Views.sharings.init.template = function() {
	var self = this;
	var story = self.params.story;
	var sharing = self.source;
	var win = self.win;
	var view = Titanium.UI.createView({zIndex:30, backgroundColor: '#ffffff'});
	
	Titanium.Facebook.appid = "147009708687795";
	Titanium.Facebook.permissions = ['publish_stream', 'read_stream', "offline_access", "email"];
	
	if(!hasFacebook()) {
		var fbconnect = Titanium.UI.createButton({
			title: "login",
			left:30,
			height:41,
			width:49,
			backgroundColor: "red"
		});	

		fbconnect.addEventListener('click', function() {
			Titanium.Facebook.authorize();
		});
		
		view.add(fbconnect);
		
		Titanium.Facebook.addEventListener('login', function(e) {
			alert("login");
			if(e.data) {
				e.data.token = Titanium.Facebook.accessToken;
				App.action(win, "omniauth_callbacks#create", {
					data : e.data,
					success : function(user) { fbconnect.title = "Logout"; }
				});
			} else {
				alert("Couldn't authorize Facebook");
			}
		});
	};

	var field = Titanium.UI.createTextField({  
	    color:'#303030',
			backgroundColor:'#d6d6d6',
			borderRadius:4,
			paddingLeft:5,
	    top:10,  
	    width:300,  
	    height:30,  
	    hintText:'Comment',  
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
	
	function hasFacebook() {
		return Functional.some(".provider == 'facebook'", App.current_user.authentications);
	}
};
