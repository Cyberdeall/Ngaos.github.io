/**
 * ============================================================================
 * NGAOS PLATFORM CORE (NPC)
 * ----------------------------------------------------------------------------
 * File        : config.js
 * Folder      : /js
 * Version     : 1.0.1
 * Author      : Fadil Ahmad & ChatGPT
 * License     : Private
 *
 * Description
 * ----------------------------------------------------------------------------
 * Konfigurasi utama aplikasi.
 *
 * Aturan:
 * - Seluruh konfigurasi aplikasi hanya boleh berada di file ini.
 * - Jangan menulis konfigurasi tetap di file lain.
 * - File ini harus dimuat PALING PERTAMA.
 * ============================================================================
 */

"use strict";

(function (window) {

    const NPC = window.NPC = window.NPC || {};

    const Config = Object.freeze({

        APP: Object.freeze({

            NAME: "NGAOS AL FALAH PLOSO",

            DESCRIPTION: "Kajian Tafsir Jalalain & Shahih Bukhari",

            VERSION: "1.0.1",

            BUILD: "2026.07.26",

            ENVIRONMENT: "production",

            AUTHOR: "Fadil Ahmad",

            PLATFORM: "Ngaos Platform Core",

            LICENSE: "Private"

        }),

        AUTH: Object.freeze({

            PROVIDER: "clerk",

            LOGIN_PAGE: "index.html",

            PLAYER_PAGE: "player.html",

            ENABLE_LOGIN: true,

            ENABLE_REGISTER: true,

            ENABLE_OTP: true,

            REQUIRE_ADMIN_APPROVAL: true,

            REMEMBER_ME: true,

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

            DEFAULT_VOLUME: 1,

            AUTO_RECONNECT: true,

            RECONNECT_DELAY: 5000,

            CONNECTION_TIMEOUT: 15000

        }),

        SESSION: Object.freeze({

            DURATION_HOURS: 4,

            WARNING_MINUTES: 5,

            AUTO_REFRESH: true

        }),

        OTP: Object.freeze({

            LENGTH: 6,

            EXPIRE_MINUTES: 5,

            RESEND_SECONDS: 60

        }),

        STORAGE: Object.freeze({

            PROVIDER: "localstorage",

            PREFIX: "npc",

            KEYS: Object.freeze({

                SESSION: "session",

                USER: "user",

                REMEMBER: "remember",

                SETTINGS: "settings",

                LAST_LOGIN: "last_login"

            })

        }),

        UI: Object.freeze({

            ENABLE_ANIMATION: true,

            ENABLE_RIPPLE: true,

            TOAST_DURATION: 4000,

            LOADING_DELAY: 300

        }),

        PWA: Object.freeze({

            ENABLED: true,

            CACHE_VERSION: "1.0.0",

            OFFLINE_PAGE: "offline.html"

        }),

        SECURITY: Object.freeze({

            REQUIRE_HTTPS: true,

            HASH_SESSION: true,

            ENCRYPT_LOCAL_STORAGE: false

        }),

        PLUGINS: Object.freeze({

            AUTH: "clerk",

            PLAYER: "listen2myradio",

            STORAGE: "localstorage",

            NOTIFICATION: null,

            ANALYTICS: null

        }),

        FEATURES: Object.freeze({

            LOGIN: true,

            REGISTER: true,

            PLAYER: true,

            OTP: true,

            REMEMBER_ME: true,

            PWA: true,

            OFFLINE_MODE: true

        }),

        DEBUG: Object.freeze({

            ENABLED: false,

            LOG_AUTH: false,

            LOG_PLAYER: false,

            LOG_NETWORK: false,

            LOG_STORAGE: false,

            LOG_PLUGIN: false

        }),

        MAINTENANCE: Object.freeze({

            ENABLED: false,

            MESSAGE:
                "Aplikasi sedang dalam pemeliharaan. Silakan coba kembali beberapa saat lagi."

        })

    });

    NPC.Config = Config;

})(window);
