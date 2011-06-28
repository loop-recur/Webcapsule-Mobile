Views.followings.show = Views.extend();

Views.followings.show.template = function() {
	var self = this;
	var friend = self.source;
	
	var win = Titanium.UI.createView();
	
	if (Helpers.application.densityIsMedium())
	  {
	  var top_bar_top = 0;
		var avatar_top = 7;
		var avatar_left = 30;
		var avatar_frame_top = 7;
		var avatar_frame_left = 30;
		var friend_name_left = 80;
		var friend_button_right = 20;
		var friend_stories_view_top = 57;
		var friend_stories_view_height = 350;
	  }
	else
	  {
	  var top_bar_top = 0;
		var avatar_top = 7;
		var avatar_left = 30;
		var avatar_frame_top = 7;
		var avatar_frame_left = 30;
		var friend_name_left = 110;
		var friend_button_right = 20;
		var friend_stories_view_top = 85;
		var friend_stories_view_height = 760;
	  }
	
	var top_bar = Ti.UI.createView ({
		height:"59dp",
		top:top_bar_top,
		backgroundImage:'images/friendshow/bar_topfriend.png'
	});
		
	var avatar_link = friend.avatar_link ? friend.avatar_link : 'images/avatar_medium.jpg';
	
	var avatar = Titanium.UI.createImageView({
		image:avatar_link,
		top:avatar_top,
		left:avatar_left,
		width:"45dp",
		height:"45dp"
	});
	
	var avatar_frame = Titanium.UI.createImageView({
		image:'images/friendshow/ol_avatar.png',
		top:avatar_frame_top,
		left:avatar_frame_left,
		width:"45dp",
		height:"45dp",
		zIndex:20
	});
	
	var friend_name = Ti.UI.createLabel({
		color:'#6b6b6b',
		font:{
			fontFamily:'Helvetica Neue',
			fontSize:"14dp",
			fontWeight:'bold'
		},
		left:friend_name_left,
		height:"20dp",
		width:"160dp",
		text:friend.full_name
	});
	
	
	
	if(self.params.followees) {
		var friend_button = Titanium.UI.createButton({
			backgroundImage:'images/friendshow/btn_unfollow.png',
			backgroundSelectedImage:"images/friendshow/btn_unfollow-pressed.png",
			right:friend_button_right,
			height:"34dp",
			width:"58dp",
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

	var friend_stories_view = Ti.UI.createView ({
		height:friend_stories_view_height,
		top:friend_stories_view_top
	});
	
	// top_bar.add(close);
	top_bar.add(avatar);
	top_bar.add(avatar_frame);
	top_bar.add(friend_name);
	
	Views.stories.user_stories.template(friend_stories_view, friend.stories);

	win.add(friend_stories_view);
	win.add(top_bar);
	
	Layouts.replaceContent(win);
	
};