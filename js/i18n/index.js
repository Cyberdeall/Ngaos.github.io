import id from './id.js';
import en from './en.js';

const translations = { id, en };
let currentLang = 'id';

export function setLanguage(lang) {
  if (translations[lang]) {
    currentLang = lang;
    updateDOM();
  }
}

export function getCurrentLanguage() {
  return currentLang;
}

export function t(key, params = {}) {
  let text = translations[currentLang]?.[key] || key;
  Object.keys(params).forEach(param => {
    text = text.replace(`{${param}}`, params[param]);
  });
  return text;
}

// Memperbarui atribut data-i18n dan data-i18n-placeholder secara otomatis
export function updateDOM() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[currentLang][key]) {
      el.textContent = translations[currentLang][key];
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[currentLang][key]) {
      el.placeholder = translations[currentLang][key];
    }
  });
}
