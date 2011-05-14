Controllers.accounts = {
	db: Db("accounts"),

	create: function(view, params) {
		var account = params.account;
		
		this.db.save(account, function(new_account) {
			params.success();
		});
	},

	init: function(view, params) {
		var account = {id: TempId.generate()};
		view.render(account, params);
	}
};
