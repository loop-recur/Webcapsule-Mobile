Views.stories = function() {
	
	var win = Titanium.UI.createWindow({  
	    title:'Stories',
	    backgroundColor:'#fff'
	});
	
	var controller = StoriesController();
	controller.index(render);
	
	function render(stories) {

	function createTableViewRow(item) {
		return Ti.UI.createTableViewRow({hasChild:true,title:item.story.name});
	}
	
	var data = Functional.map(createTableViewRow, stories);

	var tableview = Titanium.UI.createTableView({ data:data });

	tableview.addEventListener('click', function(e)
	{
		var index = e.index;
		var section = e.section;
		var row = e.row;
		var rowdata = e.rowData;
		// Views.stories.show(e.id);
		// Titanium.UI.createAlertDialog({title:'Table View',message:'row ' + row + ' index ' + index + ' section ' + section  + ' title ' + rowdata.title}).show();
	});

	win.add(tableview);
	}
	
	return win;
}