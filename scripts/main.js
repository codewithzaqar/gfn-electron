const {app, BrowserWindow} = require('electron')
const path = require('path')
const userAgent = 'Mozilla/5.0 (X11; CrOS x86_64 13099.85.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.110 Safari/537.36'

function createWindow () {
    const mainWindow = new BrowserWindow({
        width: 1280,
        height: 768,
        //fullscreen: true,
        icon: 'icon.png',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    mainWindow.loadURL('https://play.geforcenow.com')
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('browser-window-created', function(e, window) {
    window.setMenu(null)
    window.webContents.setUserAgent(userAgent)
})

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') app.quit()
})