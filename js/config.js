/**
 * ============================================================================
 * NGAOS PLATFORM CORE (NPC)
 * ----------------------------------------------------------------------------
 * File        : config.js
 * Folder      : /js
 * Version     : 1.0.0
 * Author      : Fadil Ahmad & ChatGPT
 * License     : Private
 *
 * Description
 * ----------------------------------------------------------------------------
 * Konfigurasi utama aplikasi.
 *
 * Seluruh konfigurasi aplikasi hanya boleh didefinisikan di file ini.
 * File lain hanya diperbolehkan MEMBACA konfigurasi.
 *
 * ============================================================================
 */

"use strict";

(function (NPC) {

    if (!NPC) {
        throw new Error("NPC namespace belum dimuat. Pastikan npc.js dimuat lebih dahulu.");
    }

    NPC.Config = Object.freeze({

        APP: Object.freeze({

            NAME: "NGAOS AL FALAH PLOSO",

            DESCRIPTION: "Kajian Tafsir Jalalain & Shahih Bukhari",

            VERSION: "1.0.0",

            BUILD: "2026.07.26",

            AUTHOR: "Fadil Ahmad",

            PLATFORM: "Ngaos Platform Core",

            ENVIRONMENT: "production"

        }),

        AUTH: Object.freeze({

            PROVIDER: "clerk",

            LOGIN_PAGE: "index.html",

            PLAYER_PAGE: "player.html",

            ENABLE_REGISTER: true,

            ENABLE_LOGIN: true,

            ENABLE_OTP: true,

            REQUIRE_ADMIN_APPROVAL: true,

            REMEMBER_ME: true,

            SESSION_HOURS: 4,

            MIN_PASSWORD_LENGTH: 8,

            MAX_LOGIN_ATTEMPTS: 5,

            LOCK_DURATION_MINUTES: 5

        }),

        CLERK: Object.freeze({

            PUBLISHABLE_KEY:
                "pk_test_ZnVuLXBpZ2Vvbi02Mi5jbGVyay5hY2NvdW50cy5kZXYk"

        }),

        PLAYER: Object.freeze({

            PROVIDER: "listen2myradio",

            STREAM_URL:
                "https://b.alhastream.com:5125/radio",

            AUTO_PLAY: false,

            AUTO_RECONNECT: true,

            RECONNECT_DELAY: 5000,

            CONNECTION_TIMEOUT: 15000,

            DEFAULT_VOLUME: 1.0

        }),

        STORAGE: Object.freeze({

            PROVIDER: "localstorage",

            PREFIX: "npc",

            KEYS: Object.freeze({

                SESSION: "session",

                USER: "user",

                SETTINGS: "settings",

                REMEMBER: "remember"

            })

        }),

        UI: Object.freeze({

            TOAST_DURATION: 4000,

            LOADING_DELAY: 300,

            ENABLE_ANIMATION: true

        }),

        PWA: Object.freeze({

            ENABLED: true,

            OFFLINE_PAGE: "offline.html",

            CACHE_VERSION: "1.0.0"

        }),

        FEATURES: Object.freeze({

            LOGIN: true,

            REGISTER: true,

            PLAYER: true,

            OTP: true,

            PWA: true

        }),

        DEBUG: Object.freeze({

            ENABLED: false

        })

    });

})(window.NPC);
