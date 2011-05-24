Views.followings.show = Views.extend();

Views.followings.show.template = function() {
	var self = this;
	var friend = self.source;
	
	var win = Titanium.UI.createWindow({ 
	});
	
	var top_bar = Ti.UI.createView ({
		height:59,
		top:0,
		backgroundImage:'images/friendshow/bar_topfriend.png'
	});
	
	var close = Titanium.UI.createButton({
		backgroundImage:"images/postrecord/return.png",
		height:26,
		width:26,
		top:5,
		left:5,
		zIndex:100
	});
	
	close.addEventListener('click', function() { 
		win.close(); 
	});
	
	var avatar_link = friend.avatar_link ? friend.avatar_link : 'images/avatar_medium.jpg';
	
	var avatar = Titanium.UI.createImageView({
		image:avatar_link,
		top:7,
		left:30,
		width:45,
		height:45
	});
	
	var avatar_frame = Titanium.UI.createImageView({
		image:'images/friendshow/ol_avatar.png',
		top:7,
		left:30,
		width:45,
		height:45,
		zIndex:20
	});
	
	var friend_name = Titanium.UI.createLabel({
		text: friend.full_name,
		height:'auto',
		top:200,
		color:'#616161',
		textAlign:'center'
	});	
	
	if(self.params.followees) {
		var friend_button = Titanium.UI.createButton({
			backgroundImage:'images/friendshow/btn_unfollow.png',
			backgroundSelectedImage:"images/friendshow/btn_unfollow-pressed.png",
			right:20,
			height:34,
			width:58,
			zIndex:60
		});
	
		friend_button.addEventListener('click', function() {	
			if(friend_button.backgroundImage === 'images/friendshow/btn_unfollow.png') {
				App.action(self.win, "followings#destroy", {
					friend : friend,
					success: function(new_following) {
						friend_button.backgroundImage = "images/friendshow/btn_follow.png";
						friend_button.backgroundSelectedImage = "images/friendshow/btn_follow-pressed.png";
					}
				});
			} else {
				App.action(self.win, "followings#create", {
					friend : friend,
					success: function(new_following) {
						friend_button.backgroundImage = 'images/friendshow/btn_unfollow.png';
						friend_button.backgroundSelectedImage = 'images/friendshow/btn_unfollow-pressed.png';
					}
				});
			};
		});
		top_bar.add(friend_button);
	};

	var friend_stories = Ti.UI.createView ({
		height:400,
		bottom:0
	});
	

	top_bar.add(close);
	top_bar.add(avatar);
	top_bar.add(avatar_frame);
	top_bar.add(friend_name);

	App.action(friend_stories, "stories#index", {feed : true});

	win.add(friend_stories);
	win.add(top_bar);
	win.open();
	
};