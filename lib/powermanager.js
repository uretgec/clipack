/**
 * Documents
 * https://electronjs.org/docs/api/power-monitor
 * https://electronjs.org/docs/api/power-save-blocker
 */
// Require Modules
const { powerSaveBlocker } = require("electron");

class PowerManager {
    constructor(opts = {}) {
        this.power = null;
        this.blockerId = null;
    }

    start() {
        const { powerMonitor } = require("electron");
        this.power = powerMonitor;
    }

    // prevent-app-suspension|prevent-display-sleep
    startBlocker(type = "prevent-display-sleep") {
        this.blockerId = powerSaveBlocker.start(type);

        // Dirty Fixed
        if(this.blockerId === 0) {
            this.finishBloker();
            this.blockerId = powerSaveBlocker.start(type);
        }

        return this.blockerId;
    }

    toggleBlocker(type = "prevent-display-sleep") {
        if (this.isBlockerActive()) {
            // console.log("BlockerIdFinish", this.blockerId);
            this.finishBloker();
        } else {
            this.startBlocker("prevent-display-sleep");
            // console.log("BlockerIdStart", this.blockerId);
        }
    }

    isBlockerActive() {
        if (this.blockerId === null) return false;

        return powerSaveBlocker.isStarted(this.blockerId);
    }

    // suspend|resume|lock-screen|unlock-screen
    // Windows: on-ac|on-battery
    // Mac: shutdown
    buildEvent(e, cb) {
        this.power.on(e, cb);
    }

    finish() {
        return this.power;
    }

    finishBloker() {
        if (this.blockerId !== null) {
            return powerSaveBlocker.stop(this.blockerId);
        }

        return false;
    }
}

module.exports = PowerManager;
/**
 * TODO:
 * powerSaveBlocker not working - electron bug <https://github.com/electron/electron/issues/10212> - Resolve: https://github.com/electron/electron/blob/34c4c8d5088fa183f56baea28809de6f2a427e02/shell/browser/api/atom_api_power_save_blocker.cc#L55 wake_lock_types_ counter always start 1 instead of 0
 */