/**
 * ============================================================================
 * NGAOS PLATFORM
 * Core Utilities
 * ============================================================================
 * File    : utils.js
 * Folder  : /js/core
 * Version : 5.0.0
 *
 * Kumpulan fungsi utilitas umum.
 * Tidak bergantung pada UI maupun Player.
 * ============================================================================
 */

"use strict";

window.NPC = window.NPC || {};

(function (NPC) {

    const Utils = {

        /**
         * Generate UUID v4
         */
        uuid() {

            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
                .replace(/[xy]/g, c => {

                    const r = Math.random() * 16 | 0;
                    const v = c === "x"
                        ? r
                        : (r & 0x3 | 0x8);

                    return v.toString(16);

                });

        },

        /**
         * Delay Promise
         */
        sleep(ms = 0) {

            return new Promise(resolve => {

                setTimeout(resolve, ms);

            });

        },

        /**
         * Debounce
         */
        debounce(fn, delay = 300) {

            let timer = null;

            return function (...args) {

                clearTimeout(timer);

                timer = setTimeout(() => {

                    fn.apply(this, args);

                }, delay);

            };

        },

        /**
         * Throttle
         */
        throttle(fn, limit = 200) {

            let waiting = false;

            return function (...args) {

                if (waiting) {
                    return;
                }

                waiting = true;

                fn.apply(this, args);

                setTimeout(() => {

                    waiting = false;

                }, limit);

            };

        },

        /**
         * Deep Clone
         */
        clone(value) {

            return structuredClone(value);

        },

        /**
         * Deep Merge
         */
        merge(target = {}, source = {}) {

            const output = { ...target };

            Object.keys(source).forEach(key => {

                if (
                    source[key] &&
                    typeof source[key] === "object" &&
                    !Array.isArray(source[key])
                ) {

                    output[key] = Utils.merge(
                        output[key] || {},
                        source[key]
                    );

                } else {

                    output[key] = source[key];

                }

            });

            return output;

        },

        /**
         * Apakah object kosong
         */
        isEmpty(value) {

            if (value == null) {
                return true;
            }

            if (Array.isArray(value)) {
                return value.length === 0;
            }

            if (typeof value === "object") {
                return Object.keys(value).length === 0;
            }

            return value === "";

        },

        /**
         * Format tanggal Indonesia
         */
        formatDate(date = new Date()) {

            return new Intl.DateTimeFormat(
                "id-ID",
                {
                    dateStyle: "full",
                    timeStyle: "medium"
                }
            ).format(date);

        },

        /**
         * Clamp number
         */
        clamp(value, min, max) {

            return Math.min(
                Math.max(value, min),
                max
            );

        },

        /**
         * Random Integer
         */
        random(min, max) {

            return Math.floor(
                Math.random() * (max - min + 1)
            ) + min;

        }

    };

    Object.freeze(Utils);

    NPC.Utils = Utils;

})(window.NPC);
