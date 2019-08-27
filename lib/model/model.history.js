const BaseModel = require("./model.base");
const HistoryTypeEnum = require("../enum/enum.history.type");
const nuid = require("nuid");

class History extends BaseModel {
    constructor(modelData = {}) {
        super();
        this.model = {
            id: modelData.id || null, // Generate from nuid module
            type: modelData.type || null, // Enum HistoryType
            name: modelData.name || null, // Generate from content|Create from user
            content: modelData.content || null, // Clipboard data - must be decode and safe
            tags: modelData.tags || null // Create from user
        };

        if (this.model.id === null) {
            // Generate new id - LATER
            this.model.id = nuid.next();
        }

        if (typeof this.model.type === "string") {
            // Must Be Convert
            this.model.type = HistoryTypeEnum[this.model.type] || HistoryTypeEnum["text/plain"];
        }

        if (this.model.content !== null) {
            this.model.content = this.htmlEntityEncode(this.model.content);
        }

        if (this.model.name === null) {
          // Generate from content
          let safeContent = this.trim(this.model.content).replace(/\n/g, '\\n').trim();
          this.model.name = (safeContent.length > 20) ? safeContent.substring(0, 20) + '...' : safeContent;
        }
    }

    getModelData() {
        return this.model;
    }
}

module.exports = History;