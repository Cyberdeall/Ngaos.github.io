const ERROR_MESSAGES = {
  id: {
    AUTH_NOT_LOADED: "Gagal menghubungkan ke layanan otentikasi. Silakan muat ulang halaman.",
    AUDIO_FETCH_FAILED: "Gagal mengambil daftar audio dari server.",
    INVALID_TRACK_URL: "Berkas audio tidak valid atau tidak ditemukan.",
    AUDIO_PLAYBACK_BLOCKED: "Pemutaran otomatis diblokir peramban. Silakan tekan tombol putar manual.",
    DEFAULT: "Terjadi kesalahan sistem. Silakan coba lagi."
  },
  en: {
    AUTH_NOT_LOADED: "Failed to connect to authentication service. Please reload the page.",
    AUDIO_FETCH_FAILED: "Failed to fetch audio list from server.",
    INVALID_TRACK_URL: "Invalid or missing audio track.",
    AUDIO_PLAYBACK_BLOCKED: "Autoplay blocked by browser. Please click play manually.",
    DEFAULT: "An unexpected error occurred. Please try again."
  }
};

export function getFriendlyErrorMessage(errorCode, lang = 'id') {
  const dict = ERROR_MESSAGES[lang] || ERROR_MESSAGES['id'];
  return dict[errorCode] || dict.DEFAULT;
}

