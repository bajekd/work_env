/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/******************************************************************************
 * @preserve Copyright (c) 2012 Amazon.com, Inc. All rights reserved.         *
 ******************************************************************************/

(function () {
    // Register a keyboard handler.
    window.addEventListener("keyup", function (event) {
        // Handle event for all non-input elements.
        var tagName = event.target.tagName.match(/^input|textarea$/i);
        if (tagName === null) {
            // Create a unified shortcut object.
            var shortcut = {
                "control": event.ctrlKey,
                "alt": event.altKey,
                "shift": event.shiftKey,
                "key": event.which
            };
            
            // Check for a supported keyboard event.
            var isValid = ((shortcut.control || shortcut.alt || shortcut.shift) &&
                    ((shortcut.key > 47 && shortcut.key < 91) || 
                     (shortcut.key > 36 && shortcut.key < 41))) ||
                   (!(shortcut.control || shortcut.alt || shortcut.shift) &&
                     (shortcut.key > 114 && shortcut.key < 122 && shortcut.key !== 116));
    
            // If valid, push the event back for recognition. 
            if (isValid === true) {
                chrome.runtime.sendMessage({"action": "shortcut", "shortcut": shortcut});
            }
        }
    });
    
    // Register an extension listener for selection check.
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (request.action === "text-selected") {
            var selection = document.getSelection();
            sendResponse({"action": "text-selected", "isSelected": (selection.type === "Range")});
        }
    });
    
    // Handle a GUID update task.    
    if (document.location.href.match(/ref_?=stk_(gch|mff|asf)_ft/) !== null) {
        chrome.runtime.sendMessage({"action": "check-guid"});
    }
}());

/******/ })()
;