//get node webkit GUI
var gui = require('nw.gui');
	 // get the window object
var win = gui.Window.get();
var menubar = new gui.Menu({
	type: 'menubar'
});

//File menu
var fileMenu = new gui.Menu();
fileMenu.append(new gui.MenuItem({
	label: 'Exit',
	click: function() {
		//alert('File Clicked');
		win.close();
	}
}));
menubar.append(new gui.MenuItem({ label: 'File', submenu: fileMenu}));

// Help and about menu
var helpAndAboutMenu = new gui.Menu();
helpAndAboutMenu.append(new gui.MenuItem({
	label: 'About the Feagen',
	click: function() {
		//alert('SubMenu Action 1 Clicked');
	}
}));
helpAndAboutMenu.append(new gui.MenuItem({
	label: 'Help center',
	click: function() {
		alert('no help information so far');
	}
}));
menubar.append(new gui.MenuItem({ label: 'Help and about', submenu: helpAndAboutMenu}));

win.menu = menubar;
/*var tray = new gui.Tray({
	icon : 'icon.png',
	title: 'App Tray'
});
// Give it a menu
var menu = new gui.Menu();
menu.append(new gui.MenuItem({
	type: 'checkbox',
	label: 'Are you sure?'
}));
tray.menu = menu;
// Clipboard
// We can not create a clipboard, we have to receive the system clipboard
var clipboard = gui.Clipboard.get();
// Read from clipboard
var text = clipboard.get('text');
alert('Clipboard text : '+text);*/