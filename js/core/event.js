/**
 * ============================================================================
 * NGAOS PLATFORM CORE (NPC)
 * ----------------------------------------------------------------------------
 * File        : events.js
 * Folder      : /js/core
 * Version     : 1.0.0
 * Author      : Fadil Ahmad & ChatGPT
 * License     : Private
 *
 * Description
 * ----------------------------------------------------------------------------
 * Event Bus System.
 *
 * Modul komunikasi antar komponen aplikasi.
 *
 * Semua modul berkomunikasi melalui event,
 * bukan memanggil modul lain secara langsung.
 * ============================================================================
 */

"use strict";

(function (NPC) {

    if (!NPC) {
        throw new Error("NPC namespace belum tersedia.");
    }


    const listeners = {};


    const Events = {


        /**
         * Menambahkan listener event.
         *
         * @param {string} eventName
         * @param {Function} callback
         */
        on(eventName, callback) {


            if (
                typeof eventName !== "string" ||
                typeof callback !== "function"
            ) {
                return false;
            }


            if (!listeners[eventName]) {

                listeners[eventName] = [];

            }


            listeners[eventName].push(callback);


            return true;

        },



        /**
         * Menghapus listener.
         *
         * @param {string} eventName
         * @param {Function} callback
         */
        off(eventName, callback) {


            if (!listeners[eventName]) {
                return false;
            }


            if (!callback) {

                delete listeners[eventName];

                return true;

            }


            listeners[eventName] =
                listeners[eventName].filter(
                    listener => listener !== callback
                );


            return true;

        },



        /**
         * Listener sekali jalan.
         *
         * @param {string} eventName
         * @param {Function} callback
         */
        once(eventName, callback) {


            const wrapper = (...args) => {

                callback(...args);

                Events.off(
                    eventName,
                    wrapper
                );

            };


            Events.on(
                eventName,
                wrapper
            );


            return wrapper;

        },



        /**
         * Mengirim event.
         *
         * @param {string} eventName
         * @param {*} payload
         */
        emit(eventName, payload = null) {


            if (!listeners[eventName]) {

                return false;

            }


            listeners[eventName]
                .slice()
                .forEach(callback => {


                    try {


                        callback(payload);


                    } catch(error) {


                        console.error(
                            "[NPC Event Error]",
                            error
                        );


                    }


                });


            return true;

        },



        /**
         * Membersihkan semua event.
         */
        clear() {


            Object.keys(listeners)
                .forEach(
                    key => delete listeners[key]
                );


        },


        /**
         * Mendapat daftar event aktif.
         *
         * @returns {Array}
         */
        list() {


            return Object.keys(listeners);


        }


    };


    Object.freeze(Events);


    NPC.Core.Events = Events;


})(window.NPC);
