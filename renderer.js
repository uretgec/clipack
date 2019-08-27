const { ipcRenderer } = require("electron");

let historyLimit = 7;
let historyNone = document.querySelector("#history-none");
let historyTable = document.querySelector("#history-table");
let historyList = historyTable.querySelector("tbody");

// History Copy Listener
function copyHistory(id) {
    console.log('Onclick', id);
    ipcRenderer.send("history-copy", { id: id });
}

// History Listener
ipcRenderer.on("history", function(event, message) {
    // console.log("History", message);
    let historyRow =
        "<tr id=\"" +
        message.id +
        "\"><td>" +
        message.name +
        "</td><td>" +
        "<button type=\"button\" class=\"btn btn-primary btn-sm\" onclick=\"copyHistory('" +
        message.id +
        "');\">Copy</button>" +
        "</td></tr>";
    if (!!historyList.querySelector("tr:first-child")) {
        historyList.querySelector("tr:first-child").insertAdjacentHTML("beforebegin", historyRow);
    } else {
        historyNone.classList.add("d-none");
        historyTable.classList.remove("d-none");
        historyList.insertAdjacentHTML("afterbegin", historyRow);
    }

    // console.log(historyList.childNodes, historyList.childElementCount);
    // Delete Oldest Message
    if (historyList.childElementCount >= historyLimit) {
        historyList.removeChild(historyList.childNodes[historyList.childElementCount - 1]);
    }
});
