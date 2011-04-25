Controllers.followings = {
	db: Db("followings"),

	index: function(view) {
		this.db.all(view);
	},
		
	show: function(view, id) {
		this.db.find(id, view);
	}
};
