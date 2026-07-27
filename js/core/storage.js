/**
 * ============================================================================
 * NGAOS PLATFORM
 * Core Storage
 * ============================================================================
 * File    : storage.js
 * Folder  : /js/core
 * Version : 5.0.0
 *
 * Wrapper untuk LocalStorage.
 * Seluruh modul wajib menggunakan NPC.Storage.
 * Jangan akses localStorage secara langsung.
 * ============================================================================
 */

"use strict";

window.NPC = window.NPC || {};

(function (NPC) {

    const PREFIX = "NPC::";

    function buildKey(key) {
        return PREFIX + String(key);
    }

    function set(key, value) {

        try {

            localStorage.setItem(
                buildKey(key),
                JSON.stringify(value)
            );

            return true;

        } catch (error) {

            NPC.Logger?.error(
                "Storage.set() gagal.",
                error
            );

            return false;

        }

    }

    function get(key, defaultValue = null) {

        try {

            const value = localStorage.getItem(
                buildKey(key)
            );

            if (value === null) {
                return defaultValue;
            }

            return JSON.parse(value);

        } catch (error) {

            NPC.Logger?.error(
                "Storage.get() gagal.",
                error
            );

            return defaultValue;

        }

    }

    function has(key) {

        return localStorage.getItem(
            buildKey(key)
        ) !== null;

    }

    function remove(key) {

        try {

            localStorage.removeItem(
                buildKey(key)
            );

            return true;

        } catch (error) {

            NPC.Logger?.error(
                "Storage.remove() gagal.",
                error
            );

            return false;

        }

    }

    function clear() {

        try {

            Object.keys(localStorage)

                .filter(key => key.startsWith(PREFIX))

                .forEach(key => {

                    localStorage.removeItem(key);

                });

            return true;

        } catch (error) {

            NPC.Logger?.error(
                "Storage.clear() gagal.",
                error
            );

            return false;

        }

    }

    NPC.Storage = Object.freeze({

        set,
        get,
        has,
        remove,
        clear

    });

})(window.NPC);
