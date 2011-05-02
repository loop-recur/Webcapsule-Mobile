Controllers.tags = {
	db: Db("tags"),

	init: function(view, params) {
		var date = new Date;
		var tag = {id: "temp-" + Ti.Utils.md5HexDigest(date.toString())};
		this.db.all(function(users) { view.render(users); });
	}
};
