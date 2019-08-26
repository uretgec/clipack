/**
 * Documents
 * https://electronjs.org/docs/api/browser-window
 * https://electronjs.org/docs/api/frameless-window
 */
// Require Modules
const { BrowserWindow } = require("electron");
// const path = require("path");

class BrowserWindowManager {
    constructor(opts = {}) {
        this.mainOptions = {
            show: opts.show || false, // !!IMPORTANT
            title: opts.title || "",
            width: opts.width || 375,
            height: opts.height || 560,
            alwaysOnTop: opts.alwaysOnTop || false,
            fullscreenable: opts.fullscreenable || false,
            resizable: opts.resizable || false,
            frame: opts.frame || false,
            titleBarStyle: opts.titleBarStyle || "hidden", // default|hidden|hiddenInset|customButtonsOnHover
            hasShadow: opts.hasShadow || false,
            opacity: opts.opacity || 1.0,
            transparent: opts.transparent || false,
            darkTheme: opts.darkTheme || false,
            thickFrame: opts.thickFrame || true,
            modal: opts.modal ||false,
            webPreferences: {
                nodeIntegration: true,
                // preload: path.join(__dirname, "preload.js")
                devTools: opts.devTools || false,
            }
        };
        this.mainWindow = null;
        this.subWindows = [];
    }

    start() {
        this.mainWindow = new BrowserWindow(this.mainOptions);
    }

    startSub(id, mainWindow) {
        this.subOptions = this.mainOptions;
        this.subOptions.parent = mainWindow;
        this.subWindows[id] = new BrowserWindow(this.subOptions);
    }

    buildWindow(file = 'index.html') {
        this.start();

        // and load the index.html of the app.
        this.mainWindow.loadFile(file);

        // Open the DevTools.
        // this.mainWindow.webContents.openDevTools()
    }

    buildSubWindow(id, file = 'index.html') {
        this.start();

        // and load the index.html of the app.
        this.subWindows[id].loadFile(file);

        // Open the DevTools.
        // this.subWindows[id].webContents.openDevTools()
    }

    buildEvent(e, cb) {
        this.mainWindow.on(e, cb);
    }

    buildSubEvent(id, e, cb) {
        this.subWindows[id].on(e, cb);
    }

    toggleWindow() {
        if(this.mainWindow !== null) {
            if (this.mainWindow.isVisible()) {
                this.mainWindow.hide();
              } else {
                this.mainWindow.show();
              }
        }
    }

    reset() {
        this.mainWindow = null;
    }

    finish() {
        return this.mainWindow;
    }

    finishSub() {
        return this.subWindows; // Return All Sub Windows
    }
}

module.exports = BrowserWindowManager;
/**
 * TODO:
 * multi windows apps coordination
 */
