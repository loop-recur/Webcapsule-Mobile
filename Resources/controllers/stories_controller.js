Controllers.stories = {
	db: Db("stories"),

	index: function(view, params) {
		this.db.all(view, params);
	},
	
	create: function(view, params) {
		var story = params.story;
		var progress = params.progress;
		var movieFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'mymovie.mov');
		
		movieFile.write(story.upload);
		this.db.save(story, function(response){progress.hide();}, { progress_bar : progress });
		view(story, progress);
	},
	
	init: function(view) {
		var date = new Date;
		var story = {id: "temp-" + Ti.Utils.md5HexDigest(date.toString())};
		view(story);
	},
	
	show: function(view, id) {
		this.db.find(id, view);
	},
	
	update: function(view, params) {
		var story = params.story;
		var callback = params.callback;
		this.db.save(story, callback);
	}
};
