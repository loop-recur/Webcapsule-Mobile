Titanium.UI.setBackgroundColor('#000');

function loggedIn() {
	var dir = Titanium.Filesystem.applicationDataDirectory;
	if(Titanium.Filesystem.getFile(dir,'credentials').exists())
	{
		var nav_window = Titanium.UI.createWindow({  
		    title:'Nav',
		    url:'main_windows/proof.js',
		});
		
		nav_window.open({
		  transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT 
		});
	} else {
		var login_window = Titanium.UI.createWindow({  
		    title:'Login',
		    url:'main_windows/login.js',
		    backgroundColor:'#fff'
		});
		
		login_window.open({
		  transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT 
		});
	}
}

loggedIn();