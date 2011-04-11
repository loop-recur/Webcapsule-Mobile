Titanium.UI.setBackgroundColor('#000');

var login_window = Titanium.UI.createWindow({  
    title:'Login',
    url:'main_windows/login.js',
    backgroundColor:'#fff'
});

var nav_window = Titanium.UI.createWindow({  
    title:'Nav',
    url:'main_windows/nav.js',
    backgroundColor:'#fff'
});

login_window.open({
  transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT 
});