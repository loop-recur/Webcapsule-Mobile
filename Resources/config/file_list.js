BaseList = [
	"controllers/accounts_controller.js",
	"controllers/stories_controller.js",
	"controllers/comments_controller.js",
	"controllers/tags_controller.js",
	"controllers/photos_controller.js",
	"controllers/videos_controller.js",
	"controllers/sharings_controller.js",
	"controllers/omniauth_callbacks_controller.js",
	"controllers/user_sessions_controller.js",
	"controllers/followings_controller.js",
	"helpers/application.js",
	"helpers/ui.js",
	"helpers/images.js",
	"helpers/player.js",
	"helpers/user.js",
	"helpers/array_funs.js",
	"lib/birdhouse.js",
	'lib/new_oauth/sha1.js',
	'lib/new_oauth/oauth.js',
	'lib/new_oauth/oauth_adapter.js',
	'lib/new_oauth/twitter_api.js'
];

if(Ti.Platform.osname == "iphone") {
	FileList = BaseList.concat([
	"layouts/iphone/site.js",
	"layouts/iphone/login.js",
	"layouts/iphone/bottom_nav.js",
	"layouts/iphone/users.js",
	"layouts/iphone/story.js",
	"layouts/iphone/stories.js",
	"layouts/iphone/geolocation.js",
	"layouts/iphone/record.js",
	"layouts/iphone/pick_date.js",
	"layouts/iphone/choose_photo.js",
	"layouts/iphone/take_photo.js",
	"views/iphone/sharings/init.js",
	"views/iphone/accounts/init.js",
	"views/iphone/stories/index.js",
	"views/iphone/stories/user_stories.js",
	"views/iphone/stories/show.js",
	"views/iphone/stories/show_form.js",
	"views/iphone/stories/form.js",
	"views/iphone/stories/init.js",
	"views/iphone/stories/edit.js",
	"views/iphone/followings/show.js",
	"views/iphone/followings/index.js",
	"views/iphone/tags/init.js",
	"views/iphone/tags/create.js",
	"views/iphone/comments/init.js",
	"views/iphone/comments/comment.js",
	"views/iphone/photos/init.js",
	"views/iphone/photos/create.js",
	"views/iphone/photos/photo.js",
	"views/iphone/videos/init.js"
	]);
} else {
	FileList = BaseList.concat([
	"layouts/android/site.js",
	"layouts/android/login.js",
	"layouts/android/bottom_nav.js",
	"layouts/android/users.js",
	"layouts/android/story.js",
	"layouts/android/stories.js",
	"layouts/android/geolocation.js",
	"layouts/android/record.js",
	"layouts/android/pick_date.js",
	"layouts/android/choose_photo.js",
	"layouts/android/take_photo.js",
	"views/android/sharings/init.js",
	"views/android/accounts/init.js",
	"views/android/stories/index.js",
	"views/android/stories/user_stories.js",
	"views/android/stories/show.js",
	"views/android/stories/show_form.js",
	"views/android/stories/form.js",
	"views/android/stories/init.js",
	"views/android/stories/edit.js",
	"views/android/followings/show.js",
	"views/android/followings/index.js",
	"views/android/tags/init.js",
	"views/android/tags/create.js",
	"views/android/comments/init.js",
	"views/android/comments/comment.js",
	"views/android/photos/init.js",
	"views/android/photos/create.js",
	"views/android/photos/photo.js",
	"views/android/videos/init.js"
	]);
}