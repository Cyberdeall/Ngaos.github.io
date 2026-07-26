/**
 * ============================================================================
 * NGAOS PLATFORM CORE (NPC)
 * ----------------------------------------------------------------------------
 * File        : npc.js
 * Folder      : /js
 * Version     : 1.0.0
 * Author      : Fadil Ahmad & ChatGPT
 * License     : Private
 *
 * Description
 * ----------------------------------------------------------------------------
 * Bootstrap namespace aplikasi.
 *
 * File ini hanya bertugas membuat namespace global `window.NPC`.
 * Tidak boleh berisi konfigurasi, logika aplikasi, maupun implementasi modul.
 *
 * File ini WAJIB dimuat paling pertama sebelum file JavaScript lainnya.
 * ============================================================================
 */

"use strict";

(function (window) {

    // Jangan menimpa namespace jika sudah ada.
    if (window.NPC) {
        return;
    }

    window.NPC = {

        Version: {},

        Config: {},

        Constants: {},

        Core: {},

        Plugins: {},

        Adapters: {},

        Locales: {},

        Services: {},

        Utils: {}

    };

})(window);
