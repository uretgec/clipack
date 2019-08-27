/**
 * Documents
 * https://electronjs.org/docs/api/menu
 * https://electronjs.org/docs/api/menu-item
 */
// Require Modules
const { Menu } = require("electron");

class MenuManager {
    constructor(opts = {}) {
        this.menu = null;
        this.menuObj = null;
        this.menuItems = [];
        this.appMenuItems = [];
    }

    start() {
        this.menu = Menu;
    }

    startObj() {
        this.menuObj = new Menu();
    }

    buildMenuItems(menuItem) {
        this.menuItems.push(menuItem);
    }

    buildAppMenuItems(appMenuItem) {
        this.appMenuItems.push(appMenuItem);
    }

    buildContextMenu() {
        return this.menu.buildFromTemplate(this.menuItems);
    }

    buildAppMenu() {
        this.menu.setApplicationMenu(this.appMenuItems);
    }

    // Only use new Menu or return buildContextMenu
    buildEvent(e, cb) {
        this.menu.on(e, cb);
    }

    finish() {
        return this.menu;
    }

    finishObj() {
        return this.menuObj;
    }
}

module.exports = MenuManager;
/**
 * TODO:
 * Look this: new Menu() methods
 */