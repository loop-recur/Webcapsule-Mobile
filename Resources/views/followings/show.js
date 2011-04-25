Views.followings.show = function(view, following) {
	
	var following_label = Titanium.UI.createLabel({
		text: following.full_name,
		height:'auto',
		top:100,
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
	
	view.add(following_label);
	view.add(email);
	
};
