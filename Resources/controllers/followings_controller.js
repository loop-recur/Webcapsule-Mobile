Controllers.followings = {
	db: Db("followings"),

	index: function(view, params) {
		this.db.all(view, params);
	},
		
	show: function(view, id) {
		this.db.find(id, view);
	},
	
	create: function(view, id) {

	},
	
	destroy: function(view, id) {
	}
	
};
