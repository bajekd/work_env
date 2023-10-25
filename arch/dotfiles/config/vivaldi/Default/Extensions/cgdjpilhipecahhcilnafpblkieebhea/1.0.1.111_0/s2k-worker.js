/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/******************************************************************************
 * @preserve Copyright (c) 2012 Amazon.com, Inc. All rights reserved.         *
 ******************************************************************************/

(function () {
    var S2K = globalThis.$SendToKindle = {
        // ######## Constants ########
        /**
         * RefMarker for first-time use.
         * @type {String}
         * @const
         */
        REF_FIRST_TIME: "stk_gch_ft",
        
        /**
         * Timespan after documents expire (30 days).
         * @type {Number}
         * @const
         */
        CONTENT_EXPIRY_TIMESPAN: (30 * 24 * 60 * 60 * 1000),
        
        /**
         * Timespan during documents are renewed.
         * @type {Number}
         * @const
         */
        CONTENT_RENEW_TIMESPAN: (10 * 60 * 1000),
        
        /**
         * Timespan between clean-ups in minutes.
         * @type {Number}
         * @const
         */
        CLEANUP_TIMESPAN: 10,
        
        /**
         * Extension ID
         * @type {String}
         * @const
         */
        EXTENSION_ID: undefined,
        
        /**
         * IndexedDB transaction type: READ_ONLY
         * @type {String}
         * @const
         */
        TX_READ_ONLY: "readonly",
        
        /**
         * IndexedDB transaction type: READ_WRITE
         * @type {String}
         * @const
         */
        TX_READ_WRITE: "readwrite",
        
        // ######## Methods ########
        /**
         * Bootstrap background page.
         */
        bootstrap: function () {
            // Load extension ID.
            S2K.EXTENSION_ID = chrome.i18n.getMessage("@@extension_id");
            
            // Initialize extension.
            S2K.registerEvents();

            // Schedule a cleanup.
            chrome.alarms.create({ periodInMinutes: S2K.CLEANUP_TIMESPAN });
            chrome.alarms.onAlarm.addListener(S2K.cleanStorage);
        },
        
        /**
         * Check for first-time execution of new/updated installation.
         */
        checkFirstRun: function () {
            // Fetch version information.
            chrome.storage.local.get("version", function (vals) {
                if (!vals || !vals.version) {
                    // Detected a fresh installation
                    S2K.checkSetupStatus();

                    // Setup initial shortcuts.
                    chrome.storage.sync.set({ "s2k-send-shortcut": {"control": false, "shift": false, "alt": true, "key": 75} });
                    chrome.storage.sync.set({ "s2k-preview-shortcut": {"control": false, "shift": false, "alt": true, "key": 80} });
                }

                // Set version in local storage.
                var manifest = chrome.runtime.getManifest();
                chrome.storage.local.set({ version: manifest.version }); // TODO now async, possible race condition?
            });
        },
        
        /**
         * Check the setup status for S2K for Web.
         */
        checkSetupStatus: function () {
            // Create XHR for status check on the S2K service.
            fetch("https://www.amazon.com/sendtokindle" + "/status")
                .then(function(res) { return res.json(); })
                .then(function(status) {
                    chrome.storage.local.get("s2kGuid", function (stored) {
                        var s2kGuid = stored.s2kGuid;

                        // Test, if a setup is required and the S2K GUID is valid.
                        if (status.setupRequired || (status.authRequired && typeof s2kGuid === 'undefined')) {
                            chrome.tabs.create({"url": "https://www.amazon.com/sendtokindle/settings"});
                        }
                    });
                })
                .catch(function (e) { console.error("Status check error: " + e); });
        },
        
        /**
         * Update low quality action.
         * @param callback  Callback for immediate actions.
         */
        updateLowQualityAction: function (callback) {
            fetch("https://www.amazon.com/sendtokindle" + "/default-engine-settings")
                .then(function(res) { return res.json(); })
                .then(function(data) {
                    var userLowQualityActionPreference = data.action;

                    chrome.storage.local.get("lowQualityAction", function(stored) {
                        var savedLowQualityActionPreference = stored.lowQualityAction;

                        chrome.storage.local.set({
                            lowQualityAction: userLowQualityActionPreference === "SEND" ? "SEND" : "ASK"
                        }, function() {
                            if (callback !== undefined) {
                                callback();
                            }
                        });
                    });
                })
                .catch(function (e) {
                    console.log("fetchDefaultEngineSettings error:" + e);
                });
        },
        
        /**
         * Register event listeners.
         */
        registerEvents: function () {
            chrome.runtime.onMessage.addListener(S2K.onScriptMessage);
            chrome.runtime.onInstalled.addListener(S2K.checkFirstRun);
        },
        
        /**
         * Open the data storage.
         * @param {function()} callback   Callback
         */
        openStorage: function (callback) {
            // Create an IndexedDB request.
            var request = indexedDB.open("s2kwdb", 1);
            
            // Handle DB errors.
            request.onerror = function () {
                callback(null);
            };
            
            // Handle DB creation/opening success.
            request.onsuccess = function () {
                callback(request.result);
            };
            
            // Handle DB initialization.
            request.onupgradeneeded = function (event) {
                // Initialize the storage.
                S2K.initializeStorage(event.target.result);
            };
        },
 
        /**
         * Initialize the database.
         * @param {Object} db       Database
         */
        initializeStorage: function (db) {
            // Create an object store for the extration results.
            var objectStore = db.createObjectStore("sendtokindle", {keyPath: "token"});
            
            // Create an index for URLs.
            objectStore.createIndex("s2k_idx_urls", "url", {unique: false});
        },
        
        /**
         * Test the database for existing content within the refresh time range.
         * @param {Object} content                  Content
         * @param {function(Number)} callback       Callback
         */
        containsContent: function (content, callback) {
            S2K.openStorage(function (db) {
                if (db === null || !callback)  { 
                    if (callback) { callback(null); } 
                }
                else {
                    if (content.token) {
                        // Content contains a token, force an update.
                        callback(content.token);
                    }
                    else {
                        // Create a transaction.
                        var tx = db.transaction(["sendtokindle"], S2K.TX_READ_WRITE);
                        var store = tx.objectStore("sendtokindle");
                        var now = Date.now();
                        
                        // Create a cursor for the content's URL.
                        store.index("s2k_idx_urls").openCursor(IDBKeyRange.only(content.url)).onsuccess = function (event) {
                            var cursor = event.target.result;
                            if (cursor) {
                                // Test, if the content is within the timeframe.
                                if (now - cursor.value.timestamp < S2K.CONTENT_RENEW_TIMESPAN) {
                                    callback(cursor.primaryKey);
                                }
                                else {
                                    cursor["continue"]();
                                }
                            }
                            else {
                                // Invoke the callback with no token.
                                callback(null);
                            }
                        };
                    }
                }
            });
        },

        /**
         * Fetch document from local storage.
         * @param token Token
         * @param {function()} callback
         */
        fetchContent: function (token, callback) {
            // Open the storage.
            S2K.openStorage(function (db) {
                if (db === null || !callback) {
                    if (callback) { callback(null); }
                }
                else {
                    // Create a transaction.
                    var tx = db.transaction(["sendtokindle"], S2K.TX_READ_ONLY);
                    var store = tx.objectStore("sendtokindle");
                    
                    // Fetch data for the token.
                    var request = store.get(parseInt(token, 10));
                    
                    // Register error event handler.
                    request.onerror = function () {
                        callback({"token": token, "timestamp": token, "data": null});
                    };
                    
                    // Register success event handler.
                    request.onsuccess = function () {
                        callback({ 
                            "token": token,
                            "timestamp": request.result ? request.result.timestamp : token,
                            "data": request.result || null
                        });
                    };
                }
            });
        },
        
        /**
         * Store content in database.
         * @param content   Content 
         * @param callback  Callback
         */
        storeContent: function (content, callback) {
            // Get the last element
            S2K.containsContent(content, function (token) {
                // Open the storage (IndexedDB).
                S2K.openStorage(function (db) {
                    if (db === null || !callback) { 
                        if (callback) { callback(null); } 
                    }
                    else {
                        // Create a transaction.
                        var tx = db.transaction(["sendtokindle"], S2K.TX_READ_WRITE);
                        var store = tx.objectStore("sendtokindle");
                        
                        // Create a new token or reuse the provided one.
                        content.token = token || Date.now();
                        content.timestamp = Date.now();
                        
                        // Register the event for transaction completion.
                        tx.oncomplete = function () {
                            if (callback !== undefined) {
                                callback(content.token);
                            }
                        };
                        
                        // Store the content to the database.
                        store.put(content);
                    }
                });
            });
        },
        
        /**
         * Clean the storage from expired data.
         */
        cleanStorage: function () {
            // Open the storage.
            S2K.openStorage(function (db) {
                // Create a transaction.
                var tx = db.transaction(["sendtokindle"], S2K.TX_READ_WRITE);
                var store = tx.objectStore("sendtokindle");
                var now = Date.now();

                // Create a cursor to iterate all items.
                store.openCursor().onsuccess = function (event) {
                    // Load the result.
                    var cursor = event.target.result;
                    
                    if (cursor) {
                        if ((cursor.value.timestamp + S2K.CONTENT_EXPIRY_TIMESPAN) < now) {
                            cursor["delete"]();
                        }
                        cursor["continue"]();
                    }
                };
            });
        },
        
        /**
         * Inject extension logic.
         */
        injectLogic: function (callback) {
            chrome.tabs.query({ active: true, lastFocusedWindow: true }, function(queryResults) {
                var tab = queryResults[0];
                if (tab && /((chrome|chrome-extension):\/\/)|(https:\/\/chrome\.google\.com\/webstore)/i.test(tab.url) === false) {
                    // Execute libraries for background script.
                    chrome.scripting.executeScript({
                        target: { tabId: tab.id },
                        files: ["s2k-content.js" ]
                    });

                    chrome.storage.local.get(["lowQualityAction", "s2kGuid"], function(storage) {
                        var lowQualityAction = storage.lowQualityAction;
                        var s2kGuid = storage.s2kGuid;

                        chrome.scripting.executeScript({
                            target: { tabId: tab.id },
                            func: function (extensionId, lowQualityAction, s2kGuid) {
                                globalThis.initalizeContentScript("ocs", s2kGuid, extensionId, lowQualityAction);
                            },
                            args: [
                                S2K.EXTENSION_ID,
                                lowQualityAction || "SEND",
                                s2kGuid || null
                            ]
                        });

                        // Execute the callback.
                        if (callback !== undefined) {
                            callback();
                        }
                    });
                    
                }
                else {
                    // Create a tab and inject the logic.
                    chrome.tabs.create({"url": "http://www.google.com"}, function (tab) {
                        S2K.injectLogic(callback);
                    });
                }
            });
        },
        
        /**
         * Extract content from the underlying page.
         * @param preview   Extract and load preview
         * @param selected  Extract selected text only
         * @param shortcut  Extension was triggered by shortcut.
         */
        extractContent: function (preview, selected, shortcut) {
            chrome.tabs.query({ active: true, lastFocusedWindow: true }, function(queryResults) {
                var tab = queryResults[0];
                if (tab && (tab.url.indexOf("chrome://") === -1) && (tab.url.indexOf("chrome-extension://") === -1)) {
                    // Execute background logic.
                    chrome.scripting.executeScript({
                        target: { tabId: tab.id },
                        func: function(preview, selected, shortcut) {
                            globalThis.launchExtraction(preview, selected, shortcut);
                        },
                        args: [preview, selected, shortcut]
                    });
                    
                    // Update the low quality action and push the result to the extraction engine.
                    // There might be a one off case, where the extraction engine has a different
                    // value than the customer preferences on Amazon.
                    S2K.updateLowQualityAction(function () {
                        chrome.storage.local.get("lowQualityAction", function(storage) {
                            var lowQualityAction = storage.lowQualityAction;

                            chrome.scripting.executeScript({
                                target: { tabId: tab.id },
                                func: function(lowQualityAction) {
                                    globalThis.updateLowQualityAction(lowQualityAction);
                                },
                                args: [lowQualityAction]
                            });
                        });
                    });
                }
            });
        },
        
        /**
         * Refresh the S2K Extension GUID.
         * @param message           Message
         * @param sendResponse      Callback
         */
        refreshGuid: function (message, sendResponse) {
            fetch("https://www.amazon.com/sendtokindle" + "/guid-refresh")
                .then(function(res) { return res.json(); })
                .then(function(guidResponse) {
                    var s2kGuid = guidResponse.s2kGuid;
                    if (typeof s2kGuid !== "undefined") {
                        chrome.storage.local.set({
                            s2kGuid: s2kGuid
                        }, function() {
                            // Invoke callback.
                            if (typeof message !== 'undefined' && typeof sendResponse !== 'undefined') {
                                S2K.pushMetadata(message, sendResponse);
                            }
                        });
                    }
                })
                .catch(function(e) {
                    console.log("refresh-guid error:" + e);
                });
        },

        /**
         * Encode an array buffer as Base64 string.
         * @param {Array|string} buffer            Array Buffer / String
         * @param {call} callback
         */
        encodeArrayBufferBase64: function (buffer) {
            var base64    = '';
            var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

            var bytes         = new Uint8Array(buffer);
            var byteLength    = bytes.byteLength;
            var byteRemainder = byteLength % 3;
            var mainLength    = byteLength - byteRemainder;

            var a, b, c, d;
            var chunk;

            // Main loop deals with bytes in chunks of 3
            for (var i = 0; i < mainLength; i = i + 3) {
                // Combine the three bytes into a single integer
                chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];

                // Use bitmasks to extract 6-bit segments from the triplet
                a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18
                b = (chunk & 258048)   >> 12; // 258048   = (2^6 - 1) << 12
                c = (chunk & 4032)     >>  6; // 4032     = (2^6 - 1) << 6
                d = chunk & 63;               // 63       = 2^6 - 1

                // Convert the raw binary segments to the appropriate ASCII encoding
                base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
            }

            // Deal with the remaining bytes and padding
            if (byteRemainder === 1) {
                chunk = bytes[mainLength];

                a = (chunk & 252) >> 2; // 252 = (2^6 - 1) << 2

                // Set the 4 least significant bits to zero
                b = (chunk & 3) << 4; // 3   = 2^2 - 1

                base64 += encodings[a] + encodings[b] + '==';
            }
            else if (byteRemainder === 2) {
                chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];

                a = (chunk & 64512) >> 10; // 64512 = (2^6 - 1) << 10
                b = (chunk & 1008)  >>  4; // 1008  = (2^6 - 1) << 4

                // Set the 2 least significant bits to zero
                c = (chunk & 15)    <<  2; // 15    = 2^4 - 1

                base64 += encodings[a] + encodings[b] + encodings[c] + '=';
            }

            return base64;
        },

        /**
         * retrieve csrf token from /empty page's csrfToken tag.
         * The /empty page is specifically designed for extension to retrieve tag by
         *      classname['a-container'] -> tagname['input'] -> value
         */
        retrieveCsrfToken: function(message, sender, sendResponse, callback) {
            chrome.storage.local.get("s2kGuid", function(storage) {
                var s2kGuid = storage.s2kGuid;
                var csrfStorageKey = s2kGuid + "csrf_token";
                var csrfTimeKey = s2kGuid + "csrf_time";

                // csrf_time records the time when the token is generated.
                chrome.storage.local.get([csrfStorageKey, csrfTimeKey], function(vals) {
                    if (vals[csrfStorageKey] && vals[csrfTimeKey]) {
                        var seconds = new Date().getTime()/1000;
                        var csrfTime = parseInt(vals[csrfTimeKey], 10);

                        // Use a short expire time that can cover the multiple requests for one sendtokindle action.
                        if (seconds - csrfTime < 60) {
                            S2K.csrfToken = vals[csrfStorageKey];
                            callback(message, sender, sendResponse);
                            return;
                        }
                    }

                    fetch("https://www.amazon.com/sendtokindle" + "/empty")
                        .then(function(res) {
                            if (!res.ok) {
                                throw "fail to request token page";
                            }

                            return res;
                        })
                        .then(function(res) { return res.text(); })
                        .then(function(text) {
                            var csrfRegex = /name='csrfToken' value='(.*)' \/>/gm;
                            var csrfToken = csrfRegex.exec(text)[1];

                            var seconds = new Date().getTime() / 1000;

                            var storageQuery = {};
                            storageQuery[csrfTimeKey] = seconds;
                            storageQuery[csrfStorageKey] = csrfToken;
                            chrome.storage.local.set(storageQuery, function() {
                                callback(message, sender, sendResponse);
                            });
                        })
                        .catch(function (e) {
                            console.error(e);
                            console.log("fail to request token page and get token");
                            callback(message, sender, sendResponse);
                        });
                });
            });
        },

        /**
         * Convert data to binary representation.
         * @param data  Data
         * @param callback callback
         */
        convertToBinary: function (data, callback) {
            // Encode UCS-2 as UTF-8.
            var utf8Data = unescape(encodeURIComponent(data));

            // Create a buffer for UTF-8.
            var buffer = new ArrayBuffer(utf8Data.length);

            // Create an array buffer view.
            var udata = new Uint8Array(buffer);

            // Store the data in the binary buffer.
            for (var i = 0, len = utf8Data.length; i < len; i++) {
                udata[i] = utf8Data.charCodeAt(i);
            }

            callback(data);
        },
        
        /**
         * Push metadata to content script.
         * @param message           Message
         * @param sendResponse      Callback
         */
        pushMetadata: function (message, sendResponse) {
            chrome.storage.local.get("s2kGuid", function(storage) {
                var s2kGuid = storage.s2kGuid;
                // Set result message.
                message.data = {
                    "url": "chrome-extension://" + S2K.EXTENSION_ID,
                    "s2kGuid": s2kGuid
                };

                // Send response.
                sendResponse(message);
            });
        },

        getCsrfToken: function(callback) {
            chrome.storage.local.get("s2kGuid", function(storage) {
                var csrfStorageKey = storage.s2kGuid + "csrf_token";
                chrome.storage.local.get(csrfStorageKey, function(storage) {
                    callback(storage[csrfStorageKey]);
                });
            });
        },

        commonCall: function(message, sender, sendResponse) {
            var timeout = message.data.request.timeout;

            var responseType = message.data.request.responseType;
            var cache = message.data.request.cache;
            var binary = message.data.request.binary;

            var isUploadToS3 = message.data.request.isUploadToS3;
            var isCsrfRequired = message.data.request.isCsrfRequired;
            var isDownloadBinary = message.data.request.isDownloadBinary;
            var isJSONContentType = message.data.request.isJSONContentType;

            var headers = new Headers();
            if (isUploadToS3) {
                headers.append("Content-Type", "");
            } else if (isDownloadBinary) {
                headers.append("Content-Type", "application/x-www-form-urlencoded");
            }

            if (message.data.request.data !== null && !binary) {
                if (isJSONContentType) {
                    headers.append("Content-Type", "application/json");
                } else {
                    headers.append("Content-Type", "application/x-www-form-urlencoded");
                }
            }

            if (!cache) {
                headers.append("If-Modified-Since", new Date().toLocaleString());
            }

            S2K.getCsrfToken(function(token) {
                if (isCsrfRequired) {
                    headers.append("anti-csrftoken-a2z", token);
                }

                // Need to preserve value throughout the promise chain
                var responseContentType;

                var controller = new AbortController();
                setTimeout(function() { controller.abort(); }, timeout);

                fetch(message.data.request.url, {
                    method: message.data.request.type,
                    body: message.data.request.data,
                    headers: headers,
                    signal: controller.signal
                }).then(function(res) {
                    if (!res.ok) {
                        sendResponse({
                            success: false,
                            statusCode: res.status,
                            statusText: res.statusText
                        });
                    }

                    return res;
                }).then(function(res) {
                    responseContentType = res.headers.get("Content-Type");

                    var data;
                    if (responseType === "arraybuffer") {
                        data = res.arrayBuffer();
                    } else if (responseType === "json" || (responseContentType && responseContentType.startsWith("application/json"))) {
                        try {
                            data = res.json();
                        } catch(e) {
                            console.log("request error: url=" + message.data.request.url + ";  param = " + message.data.request.data + "exception = " + e);
                            data = Promise.resolve({ status: false });
                        }
                    } else {
                        data = res.text();
                    }

                    return data;
                }).then(function(data) {
                    var response = {
                        success: true,
                        data: isDownloadBinary ? S2K.encodeArrayBufferBase64(data) : data,
                        contentType: responseContentType
                    };

                    sendResponse(JSON.parse(JSON.stringify(response)));
                })
                .catch(function(e) {
                    // Invoke all error completion event listeners in case of an error.
                    sendResponse({"success": false, "statusCode": "exception", "statusText": "S2K_AJAX_EXCEPTION"});
                });
            });
        },

        /**
         * Loads the history of extracted documents from IndexedDB,
         * calls back with an array of history response
         * @param {(content: any[]) => void} sendResponse 
         */
        retrieveHistory: function(sendResponse) {
            S2K.openStorage(function (db) {
                if (db === null) {
                    if (sendResponse) { 
                        sendResponse([]);
                        return;
                    }
                }
               
                var content = [];
                var store = db.transaction(["sendtokindle"], S2K.TX_READ_ONLY).objectStore("sendtokindle");
                
                var cursor = store.openCursor();
                cursor.onsuccess = function (event) {
                    if (event.target.result) {
                        content.push(event.target.result.value);
                        event.target.result.continue();
                    } else {
                        sendResponse(content);
                    }
                };

                // Don't leave the message channel open if we can't open the cursor
                cursor.onerror = function (event) {
                    sendResponse([]);
                };
            });
        },

        /**
         * Deletes one history item from IndexedDB
         * @param {string} token the item ID to delete
         * @param {() => void} sendResponse callback to close messaging channel
         */
        deleteHistoryItem: function(token, sendResponse) {
            S2K.openStorage(function (db) {
                if (db === null) {
                    if (sendResponse) {
                        sendResponse();
                        return;
                    }
                }

                var transaction = db.transaction(["sendtokindle"], S2K.TX_READ_WRITE);
                transaction.objectStore("sendtokindle").delete(token);

                // Always close the message challenge regardless of whether successful
                transaction.oncomplete(function () {
                    sendResponse();
                });
                transaction.onerror(function () {
                    sendResponse();
                });
            });
        },

        /**
         * Clears the entire history database
         * @param {() => void} sendResponse callback to close messaging channel
         */
        clearHistory: function (sendResponse) {
            S2K.openStorage(function (db) {
                if (db === null) {
                    if (sendResponse) { 
                        sendResponse([]);
                        return;
                    }
                }
               
                var store = db.transaction(["sendtokindle"], S2K.TX_READ_WRITE).objectStore("sendtokindle");
                
                var cursor = store.openCursor();
                cursor.onsuccess = function (event) {
                    if (event.target.result) {
                        event.target.result.delete();
                        event.target.result.continue();
                    } else {
                        sendResponse();
                    }
                };

                // Don't leave the message channel open if we can't open the cursor
                cursor.onerror = function (event) {
                    sendResponse();
                };
            });
        },
        
        // ######## Event Handler ########
        /**
         * Handle a content script message.
         * @param message       Message
         * @param sender        Sender Object
         * @param sendResponse  Callback
         */
        onScriptMessage: function (message, sender, sendResponse) {
            if (message.action === "fetch-document") {
                // Load the content for the token.
                S2K.fetchContent(message.data.token, function (content) {
                    // Update message with data.
                    message.data = content;
                    
                    // Send response to extension.
                    sendResponse(message);
                });
            }
            else if (message.action === "store-content") {
                // Store content in storage.
                S2K.storeContent(message.data.content, function (token) {
                    // Send response before doing a clean-up.
                    var url = message.data.setup ? "https://www.amazon.com/sendtokindle/settings" : "https://www.amazon.com/sendtokindle/preview" + 
                                "?article=" + token + 
                                (message.data.send ? "&send=1" : "") +
                                (message.data.auth ? "&refresh=1" : "");
                    
                    // Send response back to browser.
                    sendResponse({"token": token, "url": url});              
                });
            }
            else if (message.action === "update-document") {
                S2K.fetchContent(message.data.token, function (content) {
                    if (content !== null) {
                        // Update the metadata.
                        content.data.title = message.data.title || content.title;
                        content.data.author = message.data.author || null;
                        
                        // Store the content.
                        S2K.storeContent(content.data, function () {});
                    }
                });
            }
            else if (message.action === "shortcut") {
                var detected = message.shortcut;
                var registeredShortcut = null;
                
                // Load all registered shortcuts.
                chrome.storage.sync.get(["s2k-send-shortcut", "s2k-preview-shortcut"], function (items) {
                    var registered = [];
                    
                    // Register send shortcut with its action.
                    registered.push({
                        "shortcut": items["s2k-send-shortcut"], 
                        "action": function () {
                            // Inject S2K extension logic.
                            S2K.injectLogic(function () {
                                // Extract content.
                                S2K.extractContent(false, false, true);
                            });
                        }
                    });
                    
                    // Register preview shortcut with its action.
                    registered.push({
                        "shortcut": items["s2k-preview-shortcut"], 
                        "action": function () { 
                            // Inject S2K extension logic.
                            S2K.injectLogic(function () {
                                // Extract content.
                                S2K.extractContent(true, false, true);
                            });
                        }
                    });
                
                    // Find matching shortcut. 
                    while ((registeredShortcut = registered.pop()) !== undefined) {
                        var shortcut = registeredShortcut.shortcut;
                        if (shortcut.key === detected.key && shortcut.control === detected.control &&
                           shortcut.alt === detected.alt && shortcut.shift === detected.shift) {
                            registeredShortcut.action();
                            break;
                        }
                    }
                });
            }
            else if (message.action === "extension-metadata") {
                if (message.data.refresh === true) {
                    S2K.refreshGuid(message, sendResponse);
                }
                else {
                    S2K.pushMetadata(message, sendResponse);
                }
            }
            else if (message.action === "check-guid") {
                // Refresh the S2K extension GUID.
                S2K.refreshGuid();
            }
            else if (message.action === "inject") {
                // Inject S2K extension logic.
                S2K.injectLogic(function () {
                    // Send a response about the injection.
                    message.action = "inject-done";
                    sendResponse(message);
                });
            }
            else if (message.action === "extract") {
                // Inject S2K extension logic.
                S2K.injectLogic(function () { 
                    // Extract content.
                    S2K.extractContent(message.preview, message.selected, false);
                });
            }
            else if (message.action === "service-common-call") {
                if (message.data.request.isCsrfRequired) {
                    S2K.retrieveCsrfToken(message, sender, sendResponse, S2K.commonCall);
                } else {
                    S2K.commonCall(message, sender, sendResponse);
                }
            }
            else if (message.action === "retrieve-history") {
                S2K.retrieveHistory(sendResponse);
            }
            else if (message.action === "delete-history-item") {
                S2K.deleteHistoryItem(message.data, sendResponse);
            }
            else if (message.action === "clear-history") {
                S2K.clearHistory(sendResponse);
            }

            return true;
        }
    };
    
    // ######## Initialize ########
    S2K.bootstrap();
}());

/******/ })()
;