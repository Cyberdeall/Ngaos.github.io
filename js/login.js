// ==========================================
// KONFIGURASI PWA NGAOS AL FALAH PLOSO
// ==========================================
const CLERK_PUBLISHABLE_KEY = 'pk_test_...'; // Masukkan Publishable Key Clerk Anda
const PWA_BASE_URL = 'https://cyberdeall.github.io/Ngaos/';
const PLAYER_PAGE = 'https://cyberdeall.github.io/Ngaos/player.html';

let clerk;

// 1. INISIALISASI CLERK SDK
window.addEventListener('load', async () => {
    try {
        if (!window.Clerk) {
            showNotice('SDK Clerk tidak ditemukan di HTML!', true);
            return;
        }
        
        clerk = window.Clerk;
        await clerk.load({ publishableKey: CLERK_PUBLISHABLE_KEY });

        if (clerk.user) {
            window.location.href = PLAYER_PAGE;
        }
    } catch (err) {
        showNotice('Gagal muat sistem autentikasi: ' + err.message, true);
    }
});

// 2. HELPER NOTIFIKASI & LOADING
function showNotice(msg, isError = false) {
    const statusEls = document.querySelectorAll('#status-message, .status-message');
    if (statusEls.length > 0) {
        statusEls.forEach(el => {
            el.textContent = msg;
            el.style.color = isError ? '#ff4d4d' : '#00e676';
            el.style.display = 'block';
        });
    } else {
        alert((isError ? '❌ ERROR: ' : '✅ INFO: ') + msg);
    }
}

function setBtnLoading(formElement, isLoading, defaultText = 'KIRIM') {
    const btn = formElement.querySelector('button[type="submit"]');
    if (btn) {
        btn.disabled = isLoading;
        btn.textContent = isLoading ? 'Memproses...' : defaultText;
    }
}

// 3. FUNGSI LOGIN (SIGN IN)
async function handleSignIn(email, password, formEl) {
    const btn = formEl.querySelector('button[type="submit"]');
    const originalText = btn ? btn.textContent : 'MASUK';
    
    setBtnLoading(formEl, true);
    showNotice('Memeriksa akun...');

    try {
        const signIn = await clerk.client.signIn.create({
            identifier: email,
            password: password,
        });

        if (signIn.status === 'complete') {
            showNotice('Login Berhasil! Mengalihkan...');
            await clerk.setActive({ session: signIn.createdSessionId });
            window.location.href = PLAYER_PAGE;
        } else {
            showNotice('Status login: ' + signIn.status, true);
            setBtnLoading(formEl, false, originalText);
        }

    } catch (err) {
        setBtnLoading(formEl, false, originalText);
        const firstErr = (err.errors && err.errors.length > 0) ? err.errors[0] : null;
        const code = firstErr ? firstErr.code : '';

        if (code === 'form_password_incorrect') {
            showNotice('Kata sandi yang Anda masukkan salah.', true);
        } else if (code === 'form_identifier_not_found') {
            showNotice('Email belum terdaftar. Silakan klik "Daftar Akun" untuk membuat akun baru.', true);
        } else {
            const msg = firstErr ? (firstErr.longMessage || firstErr.message) : err.message;
            showNotice(msg || 'Gagal masuk.', true);
        }
    }
}

// 4. FUNGSI DAFTAR (SIGN UP)
async function handleSignUp(email, password, formEl) {
    const btn = formEl.querySelector('button[type="submit"]');
    const originalText = btn ? btn.textContent : 'DAFTAR';

    setBtnLoading(formEl, true);
    showNotice('Membuat akun baru...');

    try {
        const signUp = await clerk.client.signUp.create({
            emailAddress: email,
            password: password,
        });

        await signUp.prepareEmailAddressVerification({
            strategy: 'email_link',
            redirectUrl: PWA_BASE_URL
        });

        showNotice('Link verifikasi telah dikirim ke email Anda. Silakan periksa inbox/spam.');
        startPolling(signUp);

    } catch (signUpErr) {
        setBtnLoading(formEl, false, originalText);
        const firstErr = (signUpErr.errors && signUpErr.errors.length > 0) ? signUpErr.errors[0] : null;
        const code = firstErr ? firstErr.code : '';

        if (code === 'form_password_length_too_short') {
            showNotice('Pendaftaran gagal: Kata sandi minimal 8 karakter.', true);
        } else if (code === 'form_identifier_exists') {
            showNotice('Email ini sudah terdaftar. Silakan klik "Masuk".', true);
        } else {
            const errorDetail = firstErr ? firstErr.longMessage : signUpErr.message;
            showNotice('Gagal mendaftar: ' + errorDetail, true);
        }
    }
}

// 5. POLLING STATUS VERIFIKASI EMAIL
function startPolling(signUpObject) {
    const interval = setInterval(async () => {
        try {
            await signUpObject.reload();
            if (signUpObject.status === 'complete') {
                clearInterval(interval);
                showNotice('Verifikasi berhasil! Mengalihkan...');
                await clerk.setActive({ session: signUpObject.createdSessionId });
                window.location.href = PLAYER_PAGE;
            }
        } catch (err) {
            console.error('Polling error:', err);
        }
    }, 2500);
}

// 6. INITIALIZER (SLIDER TOGGLE & FORM SUBMIT)
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container') || document.body;
    const registerBtn = document.querySelector('.register-btn');
    const loginBtn = document.querySelector('.login-btn');

    // A. PEMICU ANIMASI SLIDE CSS
    if (registerBtn) {
        registerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            container.classList.add('active');
        });
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            container.classList.remove('active');
        });
    }

    // B. PENANGANAN SUBMIT SEMUA FORM
    const forms = document.querySelectorAll('form');

    forms.forEach((form) => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const inputs = form.querySelectorAll('input');
            let emailVal = '';
            let passwordVal = '';

            inputs.forEach(input => {
                const type = (input.getAttribute('type') || '').toLowerCase();
                const placeholder = (input.getAttribute('placeholder') || '').toLowerCase();
                const idName = (input.id + ' ' + input.name).toLowerCase();

                if (type === 'email' || placeholder.includes('email') || idName.includes('email')) {
                    emailVal = input.value.trim();
                }
                if (type === 'password' || placeholder.includes('sandi') || placeholder.includes('pass') || idName.includes('pass')) {
                    passwordVal = input.value.trim();
                }
            });

            if (!emailVal || !passwordVal) {
                showNotice('Mohon isi email dan kata sandi terlebih dahulu.', true);
                return;
            }

            // Deteksi jenis form berdasarkan posisi slider atau ID
            const isSignUp = container.classList.contains('active') || 
                             form.id.includes('register') || 
                             form.id.includes('signup');

            if (isSignUp) {
                await handleSignUp(emailVal, passwordVal, form);
            } else {
                await handleSignIn(emailVal, passwordVal, form);
            }
        });
    });
});

