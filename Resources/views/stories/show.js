Views.stories.show = {
	render : function(source, params) {
		this.source = source;
		this.params = params;
		this.template();
	}
};

Views.stories.show.template = function() {
	var self = this;
	
	self.win = Titanium.UI.createWindow({ title:'Story', backgroundColor:'#fff' });

	var story_label = Titanium.UI.createLabel({
		text: self.source.name,
		height:'auto',
		color:'#616161',
		textAlign:'center'
	});
	
	var b = Titanium.UI.createButton({
		title:'Close',
		height:30,
		width:150,
		top:0,
		right:0
	});
	
	b.addEventListener('click', function() { self.win.close(); });

	self.win.add(b);
	self.win.open();
	

	self.win.add(story_label);	
};
