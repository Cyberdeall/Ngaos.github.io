/**
 * ============================================================
 * NGAOS PLATFORM CORE (NPC)
 * Configuration
 * Version : 1.0.0
 * ============================================================
 * Seluruh konfigurasi aplikasi berada di file ini.
 * Jangan menulis konfigurasi di file lain.
 */

const AppConfig = Object.freeze({

    // ========================================================
    // APPLICATION
    // ========================================================
    APP: {
        NAME: "NGAOS AL FALAH PLOSO",
        DESCRIPTION: "Kajian Tafsir Jalalain & Shahih Bukhari",
        VERSION: "1.0.0",
        BUILD: "2026.07",
        ORGANIZATION: "Ngaos Al Falah",
        AUTHOR: "Ngaos Platform Core",
        LICENSE: "Private"
    },

    // ========================================================
    // ENVIRONMENT
    // ========================================================
    ENV: {
        MODE: "production", // development | testing | production
    },

    // ========================================================
    // AUTHENTICATION
    // ========================================================
    AUTH: {

        // Plugin aktif
        PROVIDER: "clerk",

        // Redirect
        LOGIN_PAGE: "index.html",
        PLAYER_PAGE: "player.html",

        // Persetujuan Admin
        REQUIRE_APPROVAL: true,

        // Password
        MIN_PASSWORD_LENGTH: 8,

        // Remember Me
        REMEMBER_ME: true,

        // Login
        MAX_LOGIN_ATTEMPT: 5,

        LOCK_TIME_MINUTES: 5
    },

    // ========================================================
    // CLERK
    // ========================================================
    CLERK: {

        PUBLISHABLE_KEY:
            "pk_test_ZnVuLXBpZ2Vvbi02Mi5jbGVyay5hY2NvdW50cy5kZXYk"

    },

    // ========================================================
    // PLAYER
    // ========================================================
    PLAYER: {

        PROVIDER: "listen2myradio",

        STREAM_URL:
            "https://b.alhastream.com:5125/radio",

        AUTOPLAY: false,

        DEFAULT_VOLUME: 1,

        AUTO_RECONNECT: true,

        RECONNECT_DELAY: 5000,

        CONNECTION_TIMEOUT: 15000

    },

    // ========================================================
    // SESSION
    // ========================================================
    SESSION: {

        TIMEOUT_HOURS: 4,

        WARNING_MINUTES: 5,

        AUTO_REFRESH: true

    },

    // ========================================================
    // OTP
    // ========================================================
    OTP: {

        ENABLED: true,

        LENGTH: 6,

        EXPIRE_MINUTES: 5,

        RESEND_SECONDS: 60

    },

    // ========================================================
    // STORAGE
    // ========================================================
    STORAGE: {

        PROVIDER: "localstorage",

        PREFIX: "npc_",

        KEYS: {

            SESSION: "session",

            REMEMBER: "remember",

            SETTINGS: "settings",

            LAST_LOGIN: "last_login",

            USER: "user"

        }

    },

    // ========================================================
    // UI
    // ========================================================
    UI: {

        LOADING_DELAY: 300,

        TOAST_DURATION: 4000,

        ANIMATION: true,

        RIPPLE: true

    },

    // ========================================================
    // PWA
    // ========================================================
    PWA: {

        ENABLED: true,

        CACHE_VERSION: "v1"

    },

    // ========================================================
    // PLUGINS
    // ========================================================
    PLUGINS: {

        AUTH: "clerk",

        PLAYER: "listen2myradio",

        STORAGE: "localstorage",

        NOTIFICATION: null,

        ANALYTICS: null

    },

    // ========================================================
    // SECURITY
    // ========================================================
    SECURITY: {

        HASH_SESSION: true,

        ENCRYPT_STORAGE: false,

        REQUIRE_HTTPS: true

    },

    // ========================================================
    // FEATURES
    // ========================================================
    FEATURES: {

        LOGIN: true,

        REGISTER: true,

        PLAYER: true,

        OTP: true,

        REMEMBER_ME: true,

        APPROVAL: true,

        OFFLINE: true,

        PWA: true

    },

    // ========================================================
    // DEBUG
    // ========================================================
    DEBUG: {

        ENABLED: false,

        LOG_NETWORK: false,

        LOG_SESSION: false,

        LOG_PLUGIN: false

    },

    // ========================================================
    // MAINTENANCE
    // ========================================================
    MAINTENANCE: {

        ENABLED: false,

        MESSAGE:
            "Aplikasi sedang dalam pemeliharaan. Silakan coba beberapa saat lagi."

    }

});
