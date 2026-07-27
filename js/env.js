/**
 * ============================================================================
 * NGAOS PLATFORM ENVIRONMENT
 * ============================================================================
 * File      : env.js
 * Folder    : /js
 * Version   : 5.0.0
 *
 * Semua konfigurasi aplikasi berada di file ini.
 * Jika ingin mengganti server, proxy, Clerk, atau pengaturan player,
 * cukup ubah file ini.
 * ============================================================================
 */

"use strict";

window.NPC = window.NPC || {};

(function (NPC) {

    NPC.Env = Object.freeze({

        // ==========================================================
        // APPLICATION
        // ==========================================================
        mode: "production",

        app: {
            name: "NGAOS AL FALAH PLOSO",
            description: "TAFSIR JALALAIN DAN SHAHIH BUKHARI",
            version: "5.0.0"
        },

        // ==========================================================
        // AUTHENTICATION
        // ==========================================================
        auth: {

            provider: "clerk",

            clerk: {

                publishableKey:
                    "pk_test_ZnVuLXBpZ2Vvbi02Mi5jbGVyay5hY2NvdW50cy5kZXYk"

            }

        },

        // ==========================================================
        // RADIO
        // ==========================================================
        radio: {

            provider: "listen2myradio",

            streamUrl:
                "https://b.alhastream.com:5125/radio",

            metadataUrl: "",

            mountPoint: ""

        },

        // ==========================================================
        // NETWORK
        // ==========================================================
        network: {

            proxy: "",

            apiUrl: "",

            websocketUrl: "",

            timeout: 15000

        },

        // ==========================================================
        // PLAYER
        // ==========================================================
        player: {

            autoPlay: false,

            defaultVolume: 1,

            muted: false,

            reconnect: true,

            reconnectDelay: 5000,

            preload: "none"

        },

        // ==========================================================
        // SESSION
        // ==========================================================
        session: {

            durationHours: 4,

            sessionKey: "radio_session",

            rememberKey: "remember_username"

        },

        // ==========================================================
        // ROUTES
        // ==========================================================
        routes: {

            login: "index.html",

            player: "player.html"

        },

        // ==========================================================
        // DEBUG
        // ==========================================================
        debug: {

            enabled: false

        }

    });

})(window.NPC);
