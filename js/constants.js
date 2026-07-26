/**
 * ============================================================
 * NGAOS PLATFORM CORE (NPC)
 * Constants
 * Version : 1.0.0
 * ============================================================
 * Seluruh konstanta aplikasi.
 * Jangan menulis string tetap di file lain.
 */

const AppConstants = Object.freeze({

    // ========================================================
    // APP STATUS
    // ========================================================
    STATUS: {

        READY: "ready",
        LOADING: "loading",
        ERROR: "error",
        SUCCESS: "success",
        OFFLINE: "offline",
        ONLINE: "online"

    },

    // ========================================================
    // AUTH STATUS
    // ========================================================
    AUTH: {

        SIGNED_OUT: "signed_out",
        SIGNING_IN: "signing_in",
        SIGNED_IN: "signed_in",
        REGISTERING: "registering",
        VERIFYING: "verifying",
        WAITING_APPROVAL: "waiting_approval",
        SESSION_EXPIRED: "session_expired"

    },

    // ========================================================
    // PLAYER STATUS
    // ========================================================
    PLAYER: {

        IDLE: "idle",
        CONNECTING: "connecting",
        CONNECTED: "connected",
        PLAYING: "playing",
        PAUSED: "paused",
        STOPPED: "stopped",
        BUFFERING: "buffering",
        RECONNECTING: "reconnecting",
        ERROR: "error"

    },

    // ========================================================
    // NETWORK STATUS
    // ========================================================
    NETWORK: {

        ONLINE: "online",
        OFFLINE: "offline",
        SLOW: "slow"

    },

    // ========================================================
    // EVENTS
    // ========================================================
    EVENTS: {

        APP_READY: "app.ready",

        USER_LOGIN: "user.login",
        USER_LOGOUT: "user.logout",
        USER_REGISTER: "user.register",

        PLAYER_READY: "player.ready",
        PLAYER_PLAY: "player.play",
        PLAYER_PAUSE: "player.pause",
        PLAYER_STOP: "player.stop",

        NETWORK_ONLINE: "network.online",
        NETWORK_OFFLINE: "network.offline",

        SESSION_EXPIRED: "session.expired"

    },

    // ========================================================
    // ERROR CODE
    // ========================================================
    ERROR: {

        UNKNOWN: "unknown",

        NETWORK: "network",

        INVALID_EMAIL: "invalid_email",

        INVALID_PASSWORD: "invalid_password",

        EMAIL_EXISTS: "email_exists",

        EMAIL_NOT_FOUND: "email_not_found",

        OTP_INVALID: "otp_invalid",

        OTP_EXPIRED: "otp_expired",

        APPROVAL_REQUIRED: "approval_required",

        SESSION_EXPIRED: "session_expired",

        STREAM_OFFLINE: "stream_offline"

    },

    // ========================================================
    // SUCCESS MESSAGE
    // ========================================================
    SUCCESS: {

        LOGIN:
            "Berhasil masuk.",

        REGISTER:
            "Pendaftaran berhasil. Silakan verifikasi akun Anda.",

        OTP:
            "Kode berhasil diverifikasi.",

        LOGOUT:
            "Anda telah keluar dari aplikasi."

    },

    // ========================================================
    // FRIENDLY ERROR MESSAGE
    // ========================================================
    MESSAGES: {

        INVALID_EMAIL:
            "Alamat email tidak valid. Periksa kembali penulisannya.",

        WRONG_PASSWORD:
            "Kata sandi yang Anda masukkan belum sesuai. Periksa kembali huruf besar dan kecilnya.",

        EMAIL_EXISTS:
            "Email sudah terdaftar. Silakan masuk menggunakan akun tersebut.",

        EMAIL_NOT_FOUND:
            "Email belum terdaftar. Silakan daftar terlebih dahulu.",

        OTP_INVALID:
            "Kode verifikasi salah. Periksa kembali kode yang dikirim ke email Anda.",

        OTP_EXPIRED:
            "Kode verifikasi telah kedaluwarsa. Silakan minta kode baru.",

        APPROVAL_REQUIRED:
            "Akun berhasil dibuat dan sedang menunggu persetujuan admin.",

        SESSION_EXPIRED:
            "Sesi Anda telah berakhir. Silakan masuk kembali.",

        NETWORK:
            "Tidak dapat terhubung ke internet. Periksa koneksi Anda.",

        STREAM_OFFLINE:
            "Siaran radio sedang tidak tersedia. Silakan coba beberapa saat lagi.",

        UNKNOWN:
            "Terjadi kesalahan yang tidak diketahui. Silakan coba kembali."

    }

});
