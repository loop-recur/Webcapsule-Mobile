Views.followings.index = Views.extend();

Views.followings.index.template = function() {
	var self = this;
	
	function createTableViewRow(following) {
		
		if (Helpers.application.densityIsMedium())
		  {
		  var row_height = 80;
			var avatar_left = 10;
			var title_left = 80;
		  }
		else
		  {
		  var row_height = 120;
			var avatar_left = 10;
			var title_left = 130;
		  }
		
		var row = Ti.UI.createTableViewRow({
			backgroundImage:'images/feed/item_bg.png',
			height:row_height,
			hasChild:true
		});		
		
		var avatar_link = following.image ? following.image : 'images/avatar_medium.jpg';
		
		var avatar = Titanium.UI.createImageView({
			image:Helpers.images.escape(avatar_link),
			left:avatar_left,
			width:"65dp",
			height:"65dp",
			borderRadius:8
		});
		
		var title = Ti.UI.createLabel({
			color:'#616161',
			font:{fontSize:"14dp",fontWeight:'bold', fontFamily:'Helvetica Neue'},
			left:title_left,
			height:"30dp",
			width:"200dp",
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