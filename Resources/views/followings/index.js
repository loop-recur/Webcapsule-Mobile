Views.followings.index = function(win, followings) {
	
	function createTableViewRow(following) {
		var row = Ti.UI.createTableViewRow({
			backgroundImage:'images/feed/item_bg.png',
			height:80,
			width:320,
			hasChild:true
		});		
		
		var avatar = Titanium.UI.createImageView({
			image:following.avatar_link,
			defaultImage:'images/avatar_medium.jpg',
			left:10,
			width:55,
			height:55
		});
		
		var title = Ti.UI.createLabel({
			color:'#3D3D3D',
			font:{fontSize:14,fontWeight:'bold', fontFamily:'Helvetica Neue'},
			left:80,
			top:0,
			height:30,
			width:200,
			text:following.full_name
		});
		
		row.id = following.id;
				
		row.add(title);
		row.add(avatar);
		return row;
	}

	var data = Functional.map(createTableViewRow, followings);
	var tableview = Titanium.UI.createTableView({ 
		backgroundColor:'gray',
		data:data,
		top:40
	 });

	tableview.addEventListener('click', function(e)
	{
		var win = Titanium.UI.createWindow({ title:'User', backgroundColor:'#fff' });
		var following_id = e.rowData.id;
		
		win.addEventListener('open', function() {
			App.action(win, "followings#show", following_id);
		});
		
		var b = Titanium.UI.createButton({
			title:'Close',
			height:30,
			width:150,
			top:0,
			right:0
		});
		
		b.addEventListener('click', function() { win.close(); });
		
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
				App.action(win, "followings#destroy", following_id);
				friend_button.title = "Follow";
			} else {
				App.action(win, "followings#create", following_id);
				friend_button.title = "Unfollow";
			};
		});
	
		win.add(b);
		win.add(friend_button);
		win.open();
	});


	win.add(tableview);
	Layouts.replaceContent(win);	
};