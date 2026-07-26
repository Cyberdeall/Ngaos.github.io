/**
 * ======================================================================
 * NGAOS PLATFORM CORE (NPC)
 * ----------------------------------------------------------------------
 * File        : config.js
 * Folder      : /js
 * Version     : 1.0.0
 * Author      : Fadil Ahmad & ChatGPT
 * License     : Private
 *
 * Description
 * ----------------------------------------------------------------------
 * Konfigurasi utama aplikasi.
 *
 * Seluruh pengaturan aplikasi wajib berada di file ini.
 * Jangan menulis konfigurasi di file lain.
 * ======================================================================
 */

"use strict";

const AppConfig = Object.freeze({

    // ==========================================================
    // APPLICATION
    // ==========================================================
    APP: {
        NAME: "NGAOS AL FALAH PLOSO",
        DESCRIPTION: "Kajian Tafsir Jalalain & Shahih Bukhari",
        VERSION: "1.0.0",
        BUILD: "2026.07.26",
        ENVIRONMENT: "production", // development | testing | production
        AUTHOR: "Fadil Ahmad",
        PLATFORM: "Ngaos Platform Core",
        LICENSE: "Private"
    },

    // ==========================================================
    // AUTHENTICATION
    // ==========================================================
    AUTH: {

        PROVIDER: "clerk",

        LOGIN_PAGE: "index.html",

        PLAYER_PAGE: "player.html",

        REQUIRE_ADMIN_APPROVAL: true,

        ENABLE_REGISTER: true,

        ENABLE_LOGIN: true,

        ENABLE_OTP: true,

        REMEMBER_ME: true,

        MIN_PASSWORD_LENGTH: 8,

        MAX_LOGIN_ATTEMPTS: 5,

        LOCK_DURATION_MINUTES: 5

    },

    // ==========================================================
    // CLERK
    // ==========================================================
    CLERK: {

        PUBLISHABLE_KEY:
            "pk_test_ZnVuLXBpZ2Vvbi02Mi5jbGVyay5hY2NvdW50cy5kZXYk"

    },

    // ==========================================================
    // PLAYER
    // ==========================================================
    PLAYER: {

        PROVIDER: "listen2myradio",

        STREAM_URL:
            "https://b.alhastream.com:5125/radio",

        AUTO_PLAY: false,

        DEFAULT_VOLUME: 1.0,

        AUTO_RECONNECT: true,

        RECONNECT_DELAY: 5000,

        CONNECTION_TIMEOUT: 15000

    },

    // ==========================================================
    // SESSION
    // ==========================================================
    SESSION: {

        DURATION_HOURS: 4,

        WARNING_MINUTES: 5,

        AUTO_REFRESH: true

    },

    // ==========================================================
    // STORAGE
    // ==========================================================
    STORAGE: {

        PROVIDER: "localstorage",

        PREFIX: "npc",

        KEYS: {

            SESSION: "session",

            USER: "user",

            REMEMBER: "remember",

            SETTINGS: "settings",

            LAST_LOGIN: "last_login"

        }

    },

    // ==========================================================
    // OTP
    // ==========================================================
    OTP: {

        LENGTH: 6,

        EXPIRE_MINUTES: 5,

        RESEND_SECONDS: 60

    },

    // ==========================================================
    // UI
    // ==========================================================
    UI: {

        ENABLE_ANIMATION: true,

        ENABLE_RIPPLE: true,

        TOAST_DURATION: 4000,

        LOADING_DELAY: 300

    },

    // ==========================================================
    // PWA
    // ==========================================================
    PWA: {

        ENABLED: true,

        CACHE_VERSION: "1.0.0",

        OFFLINE_PAGE: "offline.html"

    },

    // ==========================================================
    // SECURITY
    // ==========================================================
    SECURITY: {

        REQUIRE_HTTPS: true,

        HASH_SESSION: true,

        ENCRYPT_LOCAL_STORAGE: false

    },

    // ==========================================================
    // PLUGINS
    // ==========================================================
    PLUGINS: {

        AUTH: "clerk",

        PLAYER: "listen2myradio",

        STORAGE: "localstorage",

        NOTIFICATION: null,

        ANALYTICS: null

    },

    // ==========================================================
    // FEATURE FLAGS
    // ==========================================================
    FEATURES: {

        LOGIN: true,

        REGISTER: true,

        PLAYER: true,

        OTP: true,

        REMEMBER_ME: true,

        PWA: true,

        OFFLINE_MODE: true

    },

    // ==========================================================
    // DEBUG
    // ==========================================================
    DEBUG: {

        ENABLED: false,

        LOG_AUTH: false,

        LOG_PLAYER: false,

        LOG_NETWORK: false,

        LOG_STORAGE: false,

        LOG_PLUGIN: false

    },

    // ==========================================================
    // MAINTENANCE
    // ==========================================================
    MAINTENANCE: {

        ENABLED: false,

        MESSAGE:
            "Aplikasi sedang dalam pemeliharaan. Silakan coba kembali beberapa saat lagi."

    }

});
