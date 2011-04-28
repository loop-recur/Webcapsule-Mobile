Views.followings.show = function(view, following) {
	
	var following_label = Titanium.UI.createLabel({
		text: following.full_name,
		height:'auto',
		top:200,
		color:'#616161',
		textAlign:'center'
	});

	var email = Titanium.UI.createLabel({
		text: following.email,
		height:'auto',
		bottom:100,
		color:'#616161',
		textAlign:'center'
	});
	
	var avatar = Titanium.UI.createImageView({
		image:following.avatar_link,
		defaultImage:'images/avatar_medium.jpg',
		top:50,
		width:100,
		height:100
	});

	view.add(avatar);	
	view.add(following_label);
	view.add(email);
};