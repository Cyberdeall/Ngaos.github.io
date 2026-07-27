/**
 * ============================================================================
 * NGAOS PLATFORM
 * Core Event Bus
 * ============================================================================
 * File    : events.js
 * Folder  : /js/core
 * Version : 5.0.0
 * ============================================================================
 */

"use strict";

window.NPC = window.NPC || {};

(function (NPC) {

    const listeners = new Map();

    function on(event, callback) {

        if (typeof callback !== "function") {
            throw new TypeError("Callback harus berupa function.");
        }

        if (!listeners.has(event)) {
            listeners.set(event, new Set());
        }

        listeners.get(event).add(callback);

        return () => off(event, callback);
    }

    function once(event, callback) {

        const unsubscribe = on(event, (...args) => {
            unsubscribe();
            callback(...args);
        });

    }

    function off(event, callback) {

        if (!listeners.has(event)) {
            return;
        }

        listeners.get(event).delete(callback);

        if (listeners.get(event).size === 0) {
            listeners.delete(event);
        }

    }

    function emit(event, payload = null) {

        if (!listeners.has(event)) {
            return;
        }

        listeners.get(event).forEach(listener => {

            try {

                listener(payload);

            } catch (error) {

                console.error(error);

            }

        });

    }

    function clear(event = null) {

        if (event === null) {

            listeners.clear();
            return;

        }

        listeners.delete(event);

    }

    NPC.Events = Object.freeze({

        on,
        once,
        off,
        emit,
        clear

    });

})(window.NPC);
