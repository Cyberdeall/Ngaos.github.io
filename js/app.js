import { config } from './config.js';
import { auth } from './services/authAdapter.js';
import { audioService } from './services/audioService.js';
import { setLanguage, getCurrentLanguage, updateDOM, t } from './i18n/index.js';
import { getFriendlyErrorMessage } from './utils/errorHandler.js';

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Inisialisasi Bahasa
  setLanguage(config.DEFAULT_LANG);

  // 2. Elemen DOM Utama
  const authContainer = document.getElementById('authContainer');
  const langSwitcher = document.getElementById('langSwitcher');
  const errorDisplay = document.getElementById('errorDisplay');
  const btnTogglePlay = document.getElementById('btnTogglePlay');
  const currentTrackTitle = document.getElementById('currentTrackTitle');

  // 3. Fungsi Menampilkan Error Ramah Pengguna
  function showError(code) {
    if (!errorDisplay) return;
    errorDisplay.textContent = getFriendlyErrorMessage(code, getCurrentLanguage());
    errorDisplay.style.display = 'block';
    setTimeout(() => {
      errorDisplay.style.display = 'none';
    }, 5000);
  }

  // 4. Pembaruan UI Auth Dinamis (Bebas Bug Terjemahan)
  function updateAuthUI() {
    if (!authContainer) return;

    if (auth.isAuthenticated()) {
      const user = auth.getUser();
      const greeting = t('greeting_user', { name: user.name });
      authContainer.innerHTML = `
        <span class="user-name">${greeting}</span>
        <button id="btnLogout" class="btn btn-secondary" data-i18n="logout"></button>
      `;
      document.getElementById('btnLogout')?.addEventListener('click', () => auth.logout());
    } else {
      authContainer.innerHTML = `
        <button id="btnLogin" class="btn btn-secondary" data-i18n="login"></button>
        <button id="btnRegister" class="btn btn-primary" data-i18n="register"></button>
      `;
      document.getElementById('btnLogin')?.addEventListener('click', () => auth.login());
      document.getElementById('btnRegister')?.addEventListener('click', () => auth.register());
    }

    // Terapkan terjemahan ke elemen baru yang dirender
    updateDOM();
  }

  // 5. Inisialisasi Auth Provider
  try {
    await auth.init(config.CLERK_PUBLISHABLE_KEY);
    updateAuthUI();
    auth.addListener(() => updateAuthUI());
  } catch (errCode) {
    showError(errCode);
  }

  // 6. Event Switcher Bahasa
  langSwitcher?.addEventListener('change', (e) => {
    setLanguage(e.target.value);
    updateAuthUI();
  });

  // 7. Event Pemutar Audio & Sinkronisasi Tombol Play/Pause
  btnTogglePlay?.addEventListener('click', () => {
    audioService.togglePlay();
  });

  window.addEventListener('audioStateChanged', (e) => {
    const { isPlaying } = e.detail;
    if (btnTogglePlay) {
      btnTogglePlay.textContent = isPlaying ? '❚❚' : '▶';
    }
  });

  window.addEventListener('audioError', (e) => {
    showError(e.detail.code);
  });
});
