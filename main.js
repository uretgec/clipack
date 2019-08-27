// Main Inits
const { app, globalShortcut, ipcMain } = require("electron");

// Managers Inits
const PowerManager = require("./lib/powermanager");
const ClipackManager = require("./lib/clipackmanager");
const BrowserWindowManager = require("./lib/browserwindowmanager");
const MenuManager = require("./lib/menumanager");
const TrayManager = require("./lib/traymanager");

// Global Variables
let powerManager = new PowerManager();
let clipackManager = new ClipackManager({ historyLimit: 7 });
let browserWindowManager = new BrowserWindowManager();
let menuManager = new MenuManager();
let trayManager = new TrayManager({ tooltip: "Click to Open" });

function createWindow() {
    browserWindowManager.start();
    browserWindowManager.buildWindow();
    browserWindowManager.buildEvent("closed", function() {
        browserWindowManager.reset();
    });
}

// Don't show the app in the doc
if (process.platform === "darwin") app.dock.hide();

// App Init
app.on("ready", function() {
    createWindow();

    // Global Shortcut Start
    globalShortcut.register("CommandOrControl+Alt+h", function() {
        browserWindowManager.toggleWindow();
    });

    // MenuManager Start
    menuManager.start();
    menuManager.buildMenuItems({
        label: app.getName() + " v" + app.getVersion(),
        click: function () {
            browserWindowManager.toggleWindow();
        }
    });
    menuManager.buildMenuItems({
        type: "separator"
    });
    menuManager.buildMenuItems({
        label: "Pause History",
        type: "checkbox",
        click: function(input) {
            clipackManager.toggleWatching(browserWindowManager.finish());
        }
    });
    menuManager.buildMenuItems({
        label: "Dont Sleep",
        type: "checkbox",
        click: function(input) {
            powerManager.toggleBlocker();
        }
    });
    menuManager.buildMenuItems({
        label: "Exit",
        role: "quit"
    });
    let contextMenu = menuManager.buildContextMenu();

    // TrayManager Start
    trayManager.start();
    trayManager.buildContextMenu(contextMenu);
    trayManager.buildEvent("click", function() {
        browserWindowManager.toggleWindow();
    });

    // ClipackManager Start
    clipackManager.startWatching(browserWindowManager.finish());
    ipcMain.on("history-copy", function(e, args) {
        // console.log(args);
        clipackManager.stopWatching();
        let copyHistoryItem = clipackManager.copyHistory(args.id);
        // console.log(copyHistoryItem);
        clipackManager.startWatching(browserWindowManager.finish());
    });

    // PowerManager Start
    powerManager.start();
    powerManager.buildEvent("suspend", function() {
        // console.log("suspend", clipackManager.isWatching());
        if (clipackManager.isWatching()) clipackManager.stopWatching();
    });
    powerManager.buildEvent("resume", function() {
        // console.log("resume", clipackManager.isWatching());
        if (!clipackManager.isWatching()) clipackManager.startWatching(browserWindowManager.finish());
    });

    // App Miracle
    // app.getGPUInfo("basic").then(function(e) {
    //     console.log(app.getAppMetrics());
    //     console.log(e);
    // });
});

// Quit when all windows are closed.
app.on("window-all-closed", function() {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") app.quit();
});

app.on("activate", function() {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (browserWindowManager.finish() === null) createWindow();
});

app.on("will-quit", function() {
    globalShortcut.unregisterAll();
    // TODO: tray must be
});
