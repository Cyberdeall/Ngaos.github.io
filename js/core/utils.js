/**
 * ============================================================================
 * NGAOS PLATFORM CORE (NPC)
 * ----------------------------------------------------------------------------
 * File        : utils.js
 * Folder      : /js/core
 * Version     : 1.0.0
 * Author      : Fadil Ahmad & ChatGPT
 * License     : Private
 *
 * Description
 * ----------------------------------------------------------------------------
 * Utility functions yang digunakan oleh seluruh sistem.
 *
 * Modul ini tidak boleh bergantung kepada modul lain.
 * ============================================================================
 */

"use strict";

(function (NPC) {

    if (!NPC) {
        throw new Error("NPC namespace belum tersedia.");
    }


    const Utils = {

        /**
         * Membuat ID unik.
         *
         * @returns {string}
         */
        uuid() {

            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
                .replace(/[xy]/g, function (c) {

                    const r = Math.random() * 16 | 0;
                    const v = c === "x"
                        ? r
                        : (r & 0x3 | 0x8);

                    return v.toString(16);

                });

        },


        /**
         * Delay asynchronous.
         *
         * @param {number} ms
         * @returns {Promise}
         */
        sleep(ms) {

            return new Promise(resolve => {
                setTimeout(resolve, ms);
            });

        },


        /**
         * Debounce function.
         *
         * @param {Function} fn
         * @param {number} delay
         * @returns {Function}
         */
        debounce(fn, delay = 300) {

            let timer;

            return function (...args) {

                clearTimeout(timer);

                timer = setTimeout(() => {

                    fn.apply(this, args);

                }, delay);

            };

        },


        /**
         * Throttle function.
         *
         * @param {Function} fn
         * @param {number} limit
         * @returns {Function}
         */
        throttle(fn, limit = 300) {

            let waiting = false;

            return function (...args) {

                if (waiting) {
                    return;
                }

                fn.apply(this, args);

                waiting = true;

                setTimeout(() => {

                    waiting = false;

                }, limit);

            };

        },


        /**
         * Clone object aman.
         *
         * @param {*} value
         * @returns {*}
         */
        deepClone(value) {

            if (
                value === null ||
                typeof value !== "object"
            ) {

                return value;

            }


            return JSON.parse(
                JSON.stringify(value)
            );

        },


        /**
         * Parsing JSON aman.
         *
         * @param {string} value
         * @param {*} fallback
         * @returns {*}
         */
        safeJSONParse(value, fallback = null) {

            try {

                return JSON.parse(value);

            } catch (error) {

                return fallback;

            }

        },


        /**
         * Mengecek object kosong.
         *
         * @param {*} value
         * @returns {boolean}
         */
        isEmpty(value) {

            if (value === null || value === undefined) {
                return true;
            }


            if (typeof value === "string") {
                return value.trim().length === 0;
            }


            if (Array.isArray(value)) {
                return value.length === 0;
            }


            if (typeof value === "object") {
                return Object.keys(value).length === 0;
            }


            return false;

        },


        /**
         * Format tanggal Indonesia.
         *
         * @param {Date|string|number} date
         * @returns {string}
         */
        formatDate(date) {

            try {

                return new Intl.DateTimeFormat(
                    "id-ID",
                    {
                        dateStyle: "full",
                        timeStyle: "short"
                    }
                ).format(
                    new Date(date)
                );


            } catch (error) {

                return "-";

            }

        },


        /**
         * Membatasi panjang text.
         *
         * @param {string} text
         * @param {number} length
         * @returns {string}
         */
        truncate(text, length = 50) {

            if (!text) {
                return "";
            }


            if (text.length <= length) {
                return text;
            }


            return text.substring(0, length) + "...";

        }

    };


    Object.freeze(Utils);


    NPC.Core.Utils = Utils;


})(window.NPC);
