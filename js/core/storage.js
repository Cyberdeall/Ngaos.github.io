/**
 * ============================================================================
 * NGAOS PLATFORM CORE (NPC)
 * ----------------------------------------------------------------------------
 * File        : storage.js
 * Folder      : /js/core
 * Version     : 1.0.0
 * Author      : Fadil Ahmad & ChatGPT
 * License     : Private
 *
 * Description
 * ----------------------------------------------------------------------------
 * Central Storage Manager.
 *
 * Semua penyimpanan aplikasi melalui modul ini.
 * ============================================================================
 */

"use strict";

(function (NPC) {

    if (!NPC) {
        throw new Error("NPC namespace belum tersedia.");
    }


    const PREFIX =
        "npc_";


    function makeKey(key) {

        return PREFIX + key;

    }


    const Storage = {


        /**
         * Simpan data
         *
         * @param {string} key
         * @param {*} value
         */
        set(key, value) {


            try {


                localStorage.setItem(

                    makeKey(key),

                    JSON.stringify(value)

                );


                return true;


            } catch(error) {


                NPC.Core.Logger?.error(
                    "Storage gagal menyimpan",
                    error
                );


                return false;

            }

        },



        /**
         * Ambil data
         *
         * @param {string} key
         * @param {*} fallback
         */
        get(key, fallback = null) {


            try {


                const data =
                    localStorage.getItem(
                        makeKey(key)
                    );


                if (data === null) {

                    return fallback;

                }


                return JSON.parse(data);


            } catch(error) {


                return fallback;

            }

        },



        /**
         * Hapus data
         */
        remove(key) {


            try {


                localStorage.removeItem(
                    makeKey(key)
                );


                return true;


            } catch(error) {


                return false;

            }

        },



        /**
         * Cek data tersedia
         */
        has(key) {


            return (
                localStorage.getItem(
                    makeKey(key)
                ) !== null
            );

        },



        /**
         * Bersihkan seluruh data aplikasi
         */
        clear() {


            Object.keys(localStorage)

                .filter(
                    key =>
                    key.startsWith(PREFIX)
                )

                .forEach(
                    key =>
                    localStorage.removeItem(key)
                );


        },


        /**
         * Daftar key aktif
         */
        keys() {


            return Object.keys(localStorage)

                .filter(
                    key =>
                    key.startsWith(PREFIX)
                )

                .map(
                    key =>
                    key.replace(PREFIX, "")
                );

        }


    };


    Object.freeze(Storage);


    NPC.Core.Storage = Storage;


})(window.NPC);
