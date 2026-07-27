/**
 * ============================================================================
 * NGAOS PLATFORM CONFIGURATION
 * ============================================================================
 * File      : config.js
 * Folder    : /js
 * Version   : 5.0.0
 *
 * Bridge antara aplikasi dengan Environment.
 * Seluruh nilai konfigurasi diambil dari NPC.Env.
 * ============================================================================
 */

"use strict";

window.NPC = window.NPC || {};

(function (NPC) {

    if (!NPC) {
        throw new Error("NPC namespace belum tersedia.");
    }

    if (!NPC.Env) {
        throw new Error(
            "Environment belum dimuat. Pastikan env.js dimuat sebelum config.js."
        );
    }

    const ENV = NPC.Env;

    const Config = Object.freeze({

        APP: Object.freeze({
            MODE: ENV.mode,
            NAME: ENV.app.name,
            DESCRIPTION: ENV.app.description,
            VERSION: ENV.app.version
        }),

        AUTH: Object.freeze({
            PROVIDER: ENV.auth.provider,
            CLERK: Object.freeze({
                PUBLISHABLE_KEY:
                    ENV.auth.clerk.publishableKey
            })
        }),

        RADIO: Object.freeze({
            PROVIDER: ENV.radio.provider,
            STREAM_URL: ENV.radio.streamUrl,
            METADATA_URL: ENV.radio.metadataUrl,
            MOUNT_POINT: ENV.radio.mountPoint
        }),

        NETWORK: Object.freeze({
            PROXY: ENV.network.proxy,
            API_URL: ENV.network.apiUrl,
            WEBSOCKET_URL: ENV.network.websocketUrl,
            TIMEOUT: ENV.network.timeout
        }),

        PLAYER: Object.freeze({
            AUTOPLAY: ENV.player.autoPlay,
            DEFAULT_VOLUME: ENV.player.defaultVolume,
            MUTED: ENV.player.muted,
            PRELOAD: ENV.player.preload,
            RECONNECT: ENV.player.reconnect,
            RECONNECT_DELAY: ENV.player.reconnectDelay
        }),

        SESSION: Object.freeze({
            DURATION_HOURS: ENV.session.durationHours,
            SESSION_KEY: ENV.session.sessionKey,
            REMEMBER_KEY: ENV.session.rememberKey
        }),

        ROUTES: Object.freeze({
            LOGIN: ENV.routes.login,
            PLAYER: ENV.routes.player
        }),

        DEBUG: Object.freeze({
            ENABLED: ENV.debug.enabled
        })

    });

    NPC.Config = Config;

    Object.freeze(NPC.Config);

})(window.NPC);
