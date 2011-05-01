Controllers.followings = {
	db: Db("followings"),

	index: function(view, params) {
		this.db.all(function(users) { view.render(users); }, params);
	},
		
	show: function(view, params) {
		this.db.find(params.id, function(user) { view.render(user); });
	},
	
	create: function(view, id) {

	},
	
	destroy: function(view, id) {
	}
	
};
