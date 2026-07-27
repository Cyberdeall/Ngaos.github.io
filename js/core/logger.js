/**
 * ============================================================================
 * NGAOS PLATFORM
 * Core Logger
 * ============================================================================
 * File    : logger.js
 * Folder  : /js/core
 * Version : 5.0.0
 * ============================================================================
 */

"use strict";

window.NPC = window.NPC || {};

(function (NPC) {

    const DEBUG = Boolean(
        NPC.Config &&
        NPC.Config.DEBUG &&
        NPC.Config.DEBUG.ENABLED
    );

    function timestamp() {
        return new Date().toISOString();
    }

    function write(level, ...args) {

        if (!DEBUG && level === "DEBUG") {
            return;
        }

        const prefix = `[${timestamp()}] [${level}]`;

        switch (level) {

            case "ERROR":
                console.error(prefix, ...args);
                break;

            case "WARN":
                console.warn(prefix, ...args);
                break;

            case "INFO":
                console.info(prefix, ...args);
                break;

            default:
                console.log(prefix, ...args);

        }

    }

    function debug(...args) {
        write("DEBUG", ...args);
    }

    function info(...args) {
        write("INFO", ...args);
    }

    function warn(...args) {
        write("WARN", ...args);
    }

    function error(...args) {
        write("ERROR", ...args);
    }

    NPC.Logger = Object.freeze({
        debug,
        info,
        warn,
        error
    });

})(window.NPC);
