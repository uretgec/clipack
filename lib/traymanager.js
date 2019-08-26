/**
 * Documents
 * https://electronjs.org/docs/api/tray
 */
// Require Modules
const { Tray } = require("electron");
const path = require("path");

class TrayManager {
    constructor(opts = {}) {
        this.tray = null;
        this.icon = opts.icon || path.join(__dirname, "../assets/icons/png/24x24.png");
        this.title = opts.title || null;
        this.tooltip = opts.tooltip || null;
    }

    start() {
        this.tray = new Tray(this.icon);
        if (!!this.title) this.tray.setTitle(this.title);
        if (!!this.tooltip) this.tray.setToolTip(this.tooltip);
    }

    buildContextMenu(menuItems) {
        this.tray.setContextMenu(menuItems);
    }

    buildEvent(e, cb) {
        this.tray.on(e, cb);
    }

    finish() {
        return this.tray;
    }
}

module.exports = TrayManager;
/**
 * TODO:
 * nothing
 */