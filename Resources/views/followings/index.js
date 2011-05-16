Views.followings.index = Views.extend();

Views.followings.index.template = function() {
	var self = this;
	
	
	function createTableViewRow(following) {
		
		// alert(following);
		
		var row = Ti.UI.createTableViewRow({
			backgroundImage:'images/feed/item_bg.png',
			height:80,
			width:320,
			hasChild:true
		});		
		
		var avatar_link = following.avatar_link ? following.avatar_link : 'images/avatar_medium.jpg';
		
		var avatar = Titanium.UI.createImageView({
			image:avatar_link,
			left:10,
			width:55,
			height:55
		});
		
		var title = Ti.UI.createLabel({
			color:'#3D3D3D',
			font:{fontSize:14,fontWeight:'bold', fontFamily:'Helvetica Neue'},
			left:80,
			top:12,
			height:30,
			width:200,
			text:following.full_name
		});
		
		row.id = following.id;
				
		row.add(title);
		row.add(avatar);
		return row;
	}

	var data = Functional.map(createTableViewRow, self.source);
	var tableview = Titanium.UI.createTableView({ 
		backgroundColor:'gray',
		data:data,
		top:40
	 });

	tableview.addEventListener('click', function(e) {
		App.action(self.win, "followings#show", { id : e.rowData.id, followees : self.params.followees });
	});


	self.win.add(tableview);
	Layouts.replaceContent(self.win);	
};