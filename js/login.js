/**
 * ============================================================================
 * PWA NGAOS AL FALAH PLOSO - ENTERPRISE AUTHENTICATION ENGINE (v4.0)
 * ============================================================================
 */

// 1. KONFIGURASI UTAMA
const CONFIG = {
    CLERK_PUBLISHABLE_KEY: 'pk_test_...', // Ganti dengan Publishable Key Anda
    BASE_URL: window.location.origin + window.location.pathname,
    REDIRECT_TARGET: './player.html'
};

// 2. STATE MANAGEMENT FORM
const AuthState = {
    clerk: null,
    signUpInstance: null,
    signInInstance: null,
    activeMode: 'SIGN_IN', // 'SIGN_IN' | 'SIGN_UP'
    step: 'CREDENTIALS'     // 'CREDENTIALS' | 'OTP_VERIFICATION'
};

// 3. INISIALISASI DENGAN GUARD SESSION
window.addEventListener('load', async () => {
    try {
        if (!window.Clerk) {
            showNotice('SDK Autentikasi gagal dimuat dari server.', true);
            return;
        }

        AuthState.clerk = window.Clerk;
        await AuthState.clerk.load({ publishableKey: CONFIG.CLERK_PUBLISHABLE_KEY });

        // Jika pengguna sudah terautentikasi, alihkan langsung
        if (AuthState.clerk.user) {
            window.location.replace(CONFIG.REDIRECT_TARGET);
        }
    } catch (err) {
        console.error('[Auth Init Error]:', err);
        showNotice('Gagal menginisialisasi sistem keamanan.', true);
    }
});

/**
 * UTILITY: System Notice & UI Helpers
 */
function showNotice(msg, isError = false, formEl = null) {
    let statusEl = formEl ? formEl.querySelector('#status-message, .status-message') : null;

    if (!statusEl) {
        const allNoticeEls = document.querySelectorAll('#status-message, .status-message');
        for (let el of allNoticeEls) {
            const parent = el.closest('.toggle-panel, form, div');
            if (!parent || window.getComputedStyle(parent).display !== 'none') {
                statusEl = el;
                break;
            }
        }
    }

    if (!statusEl && formEl) {
        statusEl = document.createElement('div');
        statusEl.id = 'status-message';
        statusEl.style.cssText = 'margin-top: 15px; font-size: 13px; font-weight: 600; text-align: center; transition: all 0.3s ease;';
        formEl.appendChild(statusEl);
    }

    if (statusEl) {
        statusEl.textContent = msg;
        statusEl.style.color = isError ? '#ff5252' : '#00e676';
        statusEl.style.display = 'block';
    }
}

function setButtonLoading(formEl, isLoading, textOverride = null) {
    const submitBtn = formEl.querySelector('button[type="submit"]');
    if (!submitBtn) return;

    submitBtn.disabled = isLoading;
    submitBtn.style.opacity = isLoading ? '0.65' : '1';
    submitBtn.style.cursor = isLoading ? 'wait' : 'pointer';

    if (isLoading) {
        submitBtn.textContent = 'Memproses...';
    } else if (textOverride) {
        submitBtn.textContent = textOverride;
    } else {
        submitBtn.textContent = AuthState.activeMode === 'SIGN_UP' ? 'DAFTAR SEKARANG' : 'MASUK';
    }
}

/**
 * CORE LOGIC: Sign In Process
 */
async function executeSignIn(email, password, formEl) {
    setButtonLoading(formEl, true);
    showNotice('Memverifikasi kredensial...', false, formEl);

    try {
        const signIn = await AuthState.clerk.client.signIn.create({
            identifier: email,
            password: password
        });

        AuthState.signInInstance = signIn;

        if (signIn.status === 'complete') {
            showNotice('Autentikasi berhasil! Mengalihkan...', false, formEl);
            await AuthState.clerk.setActive({ session: signIn.createdSessionId });
            window.location.replace(CONFIG.REDIRECT_TARGET);
        } else if (signIn.status === 'needs_client_trust' || signIn.status === 'needs_first_factor') {
            // Penanganan Tantangan Perangkat Baru (Device Trust / 2FA)
            try {
                await signIn.prepareFirstFactor({ strategy: 'email_code' });
                showNotice('Perangkat baru terdeteksi. Masukkan kode 6 digit dari email Anda:', false, formEl);
                renderOtpUI(formEl, 'SIGN_IN_OTP');
            } catch (prepErr) {
                showNotice('Silakan buka email Anda untuk mengonfirmasi akses perangkat ini.', true, formEl);
                setButtonLoading(formEl, false, 'MASUK');
            }
        } else {
            showNotice(`Tindakan diperlukan: Status [${signIn.status}]`, true, formEl);
            setButtonLoading(formEl, false, 'MASUK');
        }
    } catch (err) {
        setButtonLoading(formEl, false, 'MASUK');
        handleAuthError(err, formEl);
    }
}

/**
 * CORE LOGIC: Sign Up Process
 */
async function executeSignUp(email, password, formEl) {
    setButtonLoading(formEl, true);
    showNotice('Membuat akun baru...', false, formEl);

    try {
        const signUp = await AuthState.clerk.client.signUp.create({
            emailAddress: email,
            password: password
        });

        AuthState.signUpInstance = signUp;

        // Strategi Verifikasi Email
        try {
            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
        } catch (codeErr) {
            await signUp.prepareEmailAddressVerification({ strategy: 'email_link', redirectUrl: CONFIG.BASE_URL });
        }

        showNotice('Kode verifikasi telah dikirim ke email Anda. Silakan periksa inbox/spam:', false, formEl);
        renderOtpUI(formEl, 'SIGN_UP_OTP');

    } catch (err) {
        setButtonLoading(formEl, false, 'DAFTAR SEKARANG');
        handleAuthError(err, formEl);
    }
}

/**
 * DYNAMIC OTP UI RENDERER
 */
function renderOtpUI(formEl, mode) {
    AuthState.step = 'OTP_VERIFICATION';
    formEl.dataset.step = mode;

    // Sembunyikan input biasa
    const inputs = formEl.querySelectorAll('input:not([type="hidden"])');
    inputs.forEach(input => input.style.display = 'none');

    let otpInput = formEl.querySelector('#otp-code-input');
    if (!otpInput) {
        otpInput = document.createElement('input');
        otpInput.id = 'otp-code-input';
        otpInput.type = 'text';
        otpInput.placeholder = '• • • • • •';
        otpInput.maxLength = 6;
        otpInput.required = true;
        otpInput.autocomplete = 'one-time-code';
        otpInput.style.cssText = 'width: 100%; padding: 14px; margin: 15px 0; border-radius: 12px; border: 2px solid #00e676; text-align: center; font-size: 22px; letter-spacing: 6px; font-weight: 700; background: #181b1d; color: #ffffff; outline: none; box-sizing: border-box;';
        
        const submitBtn = formEl.querySelector('button[type="submit"]');
        formEl.insertBefore(otpInput, submitBtn);
    } else {
        otpInput.style.display = 'block';
        otpInput.value = '';
    }

    otpInput.focus();
    setButtonLoading(formEl, false, 'VERIFIKASI KODE');
}

/**
 * OTP VERIFICATION HANDLER
 */
async function executeOtpVerification(code, formEl, mode) {
    setButtonLoading(formEl, true, 'VERIFIKASI KODE');
    showNotice('Memvalidasi kode OTP...', false, formEl);

    try {
        let sessionId = null;

        if (mode === 'SIGN_UP_OTP') {
            if (!AuthState.signUpInstance) throw new Error('Sesi pendaftaran tidak ditemukan.');
            const res = await AuthState.signUpInstance.attemptEmailAddressVerification({ code });
            if (res.status === 'complete') sessionId = res.createdSessionId;
        } else if (mode === 'SIGN_IN_OTP') {
            if (!AuthState.signInInstance) throw new Error('Sesi masuk tidak ditemukan.');
            const res = await AuthState.signInInstance.attemptFirstFactor({ strategy: 'email_code', code });
            if (res.status === 'complete') sessionId = res.createdSessionId;
        }

        if (sessionId) {
            showNotice('Verifikasi berhasil! Menyiapkan dasbor...', false, formEl);
            await AuthState.clerk.setActive({ session: sessionId });
            window.location.replace(CONFIG.REDIRECT_TARGET);
        } else {
            showNotice('Status verifikasi belum selesai.', true, formEl);
            setButtonLoading(formEl, false, 'VERIFIKASI KODE');
        }

    } catch (err) {
        setButtonLoading(formEl, false, 'VERIFIKASI KODE');
        handleAuthError(err, formEl);
    }
}

/**
 * ERROR DICTIONARY & TRANSLATION
 */
function handleAuthError(err, formEl) {
    const firstErr = (err.errors && err.errors.length > 0) ? err.errors[0] : null;
    const code = firstErr ? firstErr.code : '';
    const rawMsg = firstErr ? (firstErr.longMessage || firstErr.message) : err.message;

    let userFriendlyMsg = 'Terjadi kesalahan pada sistem autentikasi.';

    switch (code) {
        case 'form_password_incorrect':
            userFriendlyMsg = 'Kata sandi yang Anda masukkan tidak sesuai.';
            break;
        case 'form_identifier_not_found':
            userFriendlyMsg = 'Email tidak terdaftar. Silakan gunakan menu pendaftaran.';
            break;
        case 'form_password_length_too_short':
            userFriendlyMsg = 'Kata sandi terlalu pendek (minimal 8 karakter).';
            break;
        case 'form_identifier_exists':
            userFriendlyMsg = 'Email ini sudah terdaftar. Silakan klik tombol Masuk.';
            break;
        case 'incorrect_code':
            userFriendlyMsg = 'Kode OTP yang Anda masukkan salah atau sudah expired.';
            break;
        default:
            userFriendlyMsg = rawMsg || userFriendlyMsg;
            break;
    }

    showNotice(userFriendlyMsg, true, formEl);
}

/**
 * INITIALIZATION & EVENT BINDINGS
 */
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container') || document.body;
    const registerBtn = document.querySelector('.register-btn');
    const loginBtn = document.querySelector('.login-btn');

    // Control Slide Panel UI
    if (registerBtn) {
        registerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            AuthState.activeMode = 'SIGN_UP';
            container.classList.add('active');
        });
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            AuthState.activeMode = 'SIGN_IN';
            container.classList.remove('active');
        });
    }

    // Attach Event Handlers to Forms
    const forms = document.querySelectorAll('form');
    forms.forEach((form) => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const currentStep = form.dataset.step;

            // Handle Verification Step
            if (currentStep === 'SIGN_UP_OTP' || currentStep === 'SIGN_IN_OTP') {
                const otpInput = form.querySelector('#otp-code-input');
                const otpVal = otpInput ? otpInput.value.trim() : '';

                if (!otpVal || otpVal.length < 6) {
                    showNotice('Masukkan 6 digit kode OTP dengan lengkap.', true, form);
                    return;
                }
                await executeOtpVerification(otpVal, form, currentStep);
                return;
            }

            // Agnostic Input Scanner
            const inputs = form.querySelectorAll('input');
            let emailVal = '';
            let passwordVal = '';

            inputs.forEach(input => {
                const type = (input.getAttribute('type') || '').toLowerCase();
                const placeholder = (input.getAttribute('placeholder') || '').toLowerCase();
                const keyName = (input.id + ' ' + input.name).toLowerCase();

                if (type === 'email' || placeholder.includes('email') || keyName.includes('email')) {
                    emailVal = input.value.trim();
                }
                if (type === 'password' || placeholder.includes('sandi') || placeholder.includes('pass') || keyName.includes('pass')) {
                    passwordVal = input.value.trim();
                }
            });

            if (!emailVal || !passwordVal) {
                showNotice('Harap isi email dan kata sandi Anda.', true, form);
                return;
            }

            // Determine Context
            const isSignUpForm = container.classList.contains('active') || 
                                 form.id.includes('register') || 
                                 form.id.includes('signup') ||
                                 form.closest('.sign-up') !== null;

            if (isSignUpForm) {
                AuthState.activeMode = 'SIGN_UP';
                await executeSignUp(emailVal, passwordVal, form);
            } else {
                AuthState.activeMode = 'SIGN_IN';
                await executeSignIn(emailVal, passwordVal, form);
            }
        });
    });
});

