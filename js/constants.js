/**
 * ======================================================================
 * NGAOS PLATFORM CORE (NPC)
 * ----------------------------------------------------------------------
 * File        : constants.js
 * Folder      : /js
 * Version     : 1.0.0
 * Author      : Fadil Ahmad & ChatGPT
 * License     : Private
 *
 * Description
 * ----------------------------------------------------------------------
 * Seluruh konstanta aplikasi.
 *
 * File ini berisi status, event, error code,
 * regex, pesan sistem, HTTP status dan seluruh
 * string tetap aplikasi.
 *
 * Jangan menulis string tetap di file lain.
 * ======================================================================
 */

"use strict";

const AppConstants = Object.freeze({

    VERSION: "1.0.0",

    STATUS: Object.freeze({

        READY: "ready",
        LOADING: "loading",
        SUCCESS: "success",
        ERROR: "error",
        ONLINE: "online",
        OFFLINE: "offline"

    }),

    AUTH: Object.freeze({

        SIGNED_OUT: "signed_out",

        SIGNING_IN: "signing_in",

        SIGNED_IN: "signed_in",

        REGISTERING: "registering",

        VERIFYING: "verifying",

        WAITING_APPROVAL: "waiting_approval",

        SESSION_EXPIRED: "session_expired"

    }),

    PLAYER: Object.freeze({

        IDLE: "idle",

        CONNECTING: "connecting",

        CONNECTED: "connected",

        PLAYING: "playing",

        PAUSED: "paused",

        STOPPED: "stopped",

        BUFFERING: "buffering",

        RECONNECTING: "reconnecting",

        ERROR: "error"

    }),

    EVENTS: Object.freeze({

        APP_READY: "app.ready",

        APP_ERROR: "app.error",

        USER_LOGIN: "user.login",

        USER_LOGOUT: "user.logout",

        USER_REGISTER: "user.register",

        PLAYER_READY: "player.ready",

        PLAYER_PLAY: "player.play",

        PLAYER_PAUSE: "player.pause",

        PLAYER_STOP: "player.stop",

        PLAYER_ERROR: "player.error",

        NETWORK_ONLINE: "network.online",

        NETWORK_OFFLINE: "network.offline",

        SESSION_EXPIRED: "session.expired"

    }),

    STORAGE: Object.freeze({

        LOCAL: "localstorage",

        INDEXED_DB: "indexeddb",

        MEMORY: "memory"

    }),

    HTTP: Object.freeze({

        OK: 200,

        CREATED: 201,

        BAD_REQUEST: 400,

        UNAUTHORIZED: 401,

        FORBIDDEN: 403,

        NOT_FOUND: 404,

        TOO_MANY_REQUESTS: 429,

        SERVER_ERROR: 500

    }),

    ERROR: Object.freeze({

        UNKNOWN: "unknown",

        NETWORK: "network",

        INVALID_EMAIL: "invalid_email",

        INVALID_PASSWORD: "invalid_password",

        EMAIL_EXISTS: "email_exists",

        EMAIL_NOT_FOUND: "email_not_found",

        OTP_INVALID: "otp_invalid",

        OTP_EXPIRED: "otp_expired",

        SESSION_EXPIRED: "session_expired",

        APPROVAL_REQUIRED: "approval_required",

        STREAM_OFFLINE: "stream_offline"

    }),

    REGEX: Object.freeze({

        EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

        USERNAME: /^[A-Za-z0-9._-]{3,30}$/,

        OTP: /^[0-9]{6}$/

    }),

    MIME: Object.freeze({

        MP3: "audio/mpeg",

        OGG: "audio/ogg",

        AAC: "audio/aac",

        JSON: "application/json"

    })

});
