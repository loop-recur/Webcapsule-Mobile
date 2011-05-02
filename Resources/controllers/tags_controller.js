Controllers.tags = {
	db: Db("tags"),
	
	index: function(view, params) {
		this.db.all(function(users) { params.success(users); }, {search : params.search });
	},

	init: function(view, params) {
		var date = new Date;
		var tag = {id: "temp-" + Ti.Utils.md5HexDigest(date.toString())};
		view.render(tag, params);
	}
};
