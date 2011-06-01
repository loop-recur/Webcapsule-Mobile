Views.followings.index = Views.extend();

Views.followings.index.template = function() {
	var self = this;
	
	function createTableViewRow(following) {
		
		var row = Ti.UI.createTableViewRow({
			backgroundImage:'images/feed/item_bg.png',
			height:80,
			width:320,
			hasChild:true
		});		
		
		var avatar_link = following.image ? following.image : 'images/avatar_medium.jpg';
		
		var avatar = Titanium.UI.createImageView({
			image:Helpers.images.escape(avatar_link),
			left:10,
			width:65,
			height:65,
			borderRadius:8
		});
		
		var title = Ti.UI.createLabel({
			color:'#616161',
			font:{fontSize:14,fontWeight:'bold', fontFamily:'Helvetica Neue'},
			left:80,
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
		data:data
	 });

	tableview.addEventListener('click', function(e) {
		App.action(self.win, "followings#show", { id : e.rowData.id, followees : self.params.followees });
	});

	self.win.add(tableview);
	
	// For some reason, this was in here, overwriting itself. Removed for now. 
	// Layouts.replaceContent(self.win);	
};