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
 * Bootstrap Namespace.
 *
 * File ini membuat namespace global aplikasi.
 * Tidak boleh berisi konfigurasi ataupun logika aplikasi.
 *
 * File ini WAJIB dimuat PALING PERTAMA.
 * ============================================================================
 */

"use strict";

(function (window) {

    if (window.NPC) {
        return;
    }

    const NPC = {

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

    Object.seal(NPC);

    window.NPC = NPC;

})(window);
