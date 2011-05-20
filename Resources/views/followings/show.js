Views.followings.show = Views.extend();

Views.followings.show.template = function() {
	var self = this;
	var friend = self.source;
	
	var win = Titanium.UI.createWindow({ title:'User', backgroundColor:'white' });
	
	var close = Titanium.UI.createButton({
		backgroundImage:"images/postrecord/return.png",
		height:26,
		width:26,
		top:5,
		left:5
	});
	
	close.addEventListener('click', function() { win.close(); });
	
	if(self.params.followees) {
		var friend_button = Titanium.UI.createButton({
			title:"Unfollow",
			left:10,
			top: 40, 
			height:30,
			width:70,
			zIndex:60
		});

		friend_button.addEventListener('click', function() {	
			if(friend_button.title === "Unfollow") {
				App.action(self.win, "followings#destroy", {
					friend : friend,
					success: function(new_following) {
						friend_button.title = "Follow";
					}
				});
			} else {
				App.action(self.win, "followings#create", {
					friend : friend,
					success: function(new_following) {
						friend_button.title = "Unfollow";
					}
				});
			};
		});
		win.add(friend_button);
	};

	var following_label = Titanium.UI.createLabel({
		text: friend.full_name,
		height:'auto',
		top:200,
		color:'#616161',
		textAlign:'center'
	});

	var email = Titanium.UI.createLabel({
		text: friend.email,
		height:'auto',
		bottom:100,
		color:'#616161',
		textAlign:'center'
	});
	
	var avatar = Titanium.UI.createImageView({
		image:friend.avatar_link,
		defaultImage:'images/avatar_medium.jpg',
		top:50,
		width:100,
		height:100
	});

	win.add(avatar);	
	win.add(following_label);
	win.add(email);
	win.add(close);
	win.open();
};