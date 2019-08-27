// Require Modules
const { clipboard } = require("electron");
const BaseModel = require("./model/model.base");
const HistoryModel = require("./model/model.history");

class ClipackManager {
	constructor(opts) {
		this.historyListLimit = opts.historyLimit ? opts.historyLimit : 10;
		this.cycleTime = opts.cycleTime ? opts.cycleTime : 500;
		this.historyList = [];
		this.cycleId = null;
		this.changedClipack = false;
		// this.currentClipack = null;
		this.prevClipack = null;
		this.baseModel = new BaseModel();
	}

	// Watch Methods
	startWatching(mainWindow = null, noClear = false) {
		let self = this;
		if (noClear) clipboard.clear();
		this.currentClipack = clipboard.readText();
		this.cycleId = setInterval(function() {
			let nextClipack = clipboard.readText();
			if (!!nextClipack && self.currentClipack !== nextClipack) {
				// Changed
				self.prevClipack = self.currentClipack;
				self.currentClipack = nextClipack;
				// self.changedClipack = true;

				// History Push: Always process above the add
				let historyModel = new HistoryModel({
					type: "text/plain",
					content: self.currentClipack
				});
				self.addHistory(historyModel.getModelData());

				// Browser Push: Always process above the add
				if (!!mainWindow) {
					mainWindow.webContents.send("history", historyModel.getModelData());

					// Browser Progress: Push progress percent
					if (mainWindow.isVisible()) {
						if (self.historyList.length < self.historyListLimit) {
							mainWindow.setProgressBar(self.historyList.length / self.historyListLimit);
						} else {
							mainWindow.setProgressBar(0);
						}
					}
				}

				// Debug Mode
				// self.debug();
			} else {
				// Not Changed
				self.nextClipack = null;
			}
		}, this.cycleTime);
	}

	stopWatching() {
		if (this.cycleId) clearInterval(this.cycleId);
		this.cycleId = null;
	}

	isWatching() {
		return !!this.cycleId;
	}

	toggleWatching(mainWindow = null) {
		if (this.isWatching()) {
			this.stopWatching();
		} else {
			this.startWatching(mainWindow);
		}
	}

	// History Methods
	getHistory() {
		return this.historyList;
	}

	processHistory() {
		if (this.historyList.length >= this.historyListLimit) {
			this.historyList.shift();
		}
	}

	addHistory(historyModel) {
		this.processHistory();
		// this.historyList.push(historyModel);
		this.historyList[historyModel.id] = historyModel;
	}

	copyHistory(id) {
		if (!!this.historyList && this.historyList.hasOwnProperty(id)) {
			// Paste the clipboard
			let content = this.baseModel.htmlEntityDecode(this.historyList[id].content);
			clipboard.writeText(content);

			return this.historyList[id];
		}

		return null;
	}

	// Debug Methods
	debug() {
		console.log(
			"Formats",
			clipboard.availableFormats(),
			"Current",
			this.currentClipack,
			"Prev",
			this.prevClipack,
			// "Changed",
			// this.changedClipack,
			"History Count",
			this.historyList.length,
			"History List",
			this.historyList
		);
	}
}

module.exports = ClipackManager;
/**
 * TODO:
 * nothing
 */
