Titanium.UI.setBackgroundColor('#000');

var login_window = Titanium.UI.createWindow({  
    title:'Login',
    url:'login.js',
    backgroundColor:'#fff'
});

login_window.open({
  transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT 
});