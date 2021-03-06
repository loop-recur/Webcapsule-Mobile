Views.followings.show = Views.extend();

Views.followings.show.template = function() {
	var self = this;
	
	var win = Titanium.UI.createWindow({ title:'User', backgroundColor:'white' });
	var close = Titanium.UI.createButton({
		title:'Close',
		height:30,
		width:150,
		top:0,
		right:0
	});
	
	close.addEventListener('click', function() { win.close(); });
	
	var friend_button = Titanium.UI.createButton({
		title:"Unfollow",
		left:10,
		top: 40, 
		height:30,
		width:70,
		zIndex:60
	});
	
	friend_button.addEventListener('click', function()
	{	
		if(friend_button.title === "Unfollow") {
			App.action(self.win, "followings#destroy", following_id);
			friend_button.title = "Follow";
		} else {
			App.action(self.win, "followings#create", following_id);
			friend_button.title = "Unfollow";
		};
	});

	var following_label = Titanium.UI.createLabel({
		text: this.source.full_name,
		height:'auto',
		top:200,
		color:'#616161',
		textAlign:'center'
	});

	var email = Titanium.UI.createLabel({
		text: this.source.email,
		height:'auto',
		bottom:100,
		color:'#616161',
		textAlign:'center'
	});
	
	var avatar = Titanium.UI.createImageView({
		image:this.source.avatar_link,
		defaultImage:'images/avatar_medium.jpg',
		top:50,
		width:100,
		height:100
	});

	win.add(avatar);	
	win.add(following_label);
	win.add(email);
	win.add(close);
	win.add(friend_button);
	win.open();
};