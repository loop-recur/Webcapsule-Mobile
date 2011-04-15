Views.stories.index = function(win, stories) {

	function createTableViewRow(item) {
		return Ti.UI.createTableViewRow({hasChild:true,title:item.story.name, id:item.story.id});
	}

	var data = Functional.map(createTableViewRow, stories);
	var tableview = Titanium.UI.createTableView({ data:data });

	tableview.addEventListener('click', function(e)
	{
		var win = Titanium.UI.createWindow({ title:'Story', backgroundColor:'#fff' });
		
		win.addEventListener('open', function() {
			App.action(win, "stories#show", e.rowData.id);
		});
		var b = Titanium.UI.createButton({
			title:'Close',
			height:30,
			width:150,
			top:0,
			right:0
		});
		
		win.add(b);
		
		b.addEventListener('click', function()
		{
			win.close();
		});
		
		win.add(b);
		win.open();
	});

	win.add(tableview);
};
