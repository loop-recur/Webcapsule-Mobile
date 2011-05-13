Controllers.followings = {
	db: Db("followings"),

	index: function(view, params) {
		this.db.all(function(users) { view.render(users); }, params);
	},
		
	show: function(view, params) {
		this.db.find(params.id, function(user) { view.render(user); });
	},
	
	create: function(view, params) {
		var friend = params.friend;
		this.db.save(friend, params.success);
	},
	
	destroy: function(view, params) {
		var friend = params.friend;
		this.db.destroy(friend, params.success);
	}
	
};
