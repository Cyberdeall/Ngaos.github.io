// ==========================================
// KONFIGURASI PWA NGAOS AL FALAH PLOSO
// ==========================================
const CLERK_PUBLISHABLE_KEY = 'pk_test_...'; // Ganti dengan Publishable Key Anda
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

// 2. HELPER NOTIFIKASI (ANTI-BISU)
function showNotice(msg, isError = false) {
    const statusEl = document.getElementById('status-message');
    if (statusEl) {
        statusEl.textContent = msg;
        statusEl.style.color = isError ? '#ff4d4d' : '#00e676';
        statusEl.style.display = 'block';
    } else {
        alert((isError ? '❌ ERROR: ' : '✅ INFO: ') + msg);
    }
}

function setBtnLoading(isLoading) {
    const btn = document.getElementById('btn-submit') || document.querySelector('button[type="submit"]');
    if (btn) {
        btn.disabled = isLoading;
        btn.textContent = isLoading ? 'Memproses...' : 'MASUK';
    }
}

// 3. FUNGSI UTAMA AUTHENTICATION & PENANGANAN ERROR SPESIFIK
async function processAuth(email, password) {
    setBtnLoading(true);
    showNotice('Memeriksa akun...');

    try {
        // Coba Login / Sign In
        const signIn = await clerk.client.signIn.create({
            identifier: email,
            password: password,
        });

        if (signIn.status === 'complete') {
            showNotice('Login Berhasil! Mengalihkan...');
            await clerk.setActive({ session: signIn.createdSessionId });
            window.location.href = PLAYER_PAGE;
            return;
        } else {
            showNotice('Status login: ' + signIn.status, true);
            setBtnLoading(false);
        }

    } catch (err) {
        setBtnLoading(false);

        // Ambil kode error utama dari Clerk
        const firstError = (err.errors && err.errors.length > 0) ? err.errors[0] : null;
        const errorCode = firstError ? firstError.code : '';

        // DIPERIKSA BERDASARKAN KASUS ERROR:

        // KASUS A: Kata Sandi Salah
        if (errorCode === 'form_password_incorrect') {
            showNotice('Kata sandi yang Anda masukkan salah.', true);
        } 
        // KASUS B: Email Belum Terdaftar -> Alihkan ke Pendaftaran
        else if (errorCode === 'form_identifier_not_found') {
            showNotice('Email belum terdaftar. Mengalihkan ke proses pendaftaran...');
            
            // Eksekusi Pendaftaran Otomatis
            setTimeout(() => {
                handleSignUp(email, password);
            }, 1200);
        } 
        // KASUS C: Format Email Salah
        else if (errorCode === 'form_param_format_invalid') {
            showNotice('Format alamat email tidak valid.', true);
        }
        // KASUS D: Error Lainnya dari Clerk
        else {
            const msg = firstError ? (firstError.longMessage || firstError.message) : err.message;
            showNotice(msg || 'Gagal memproses permintaan.', true);
        }
    }
}

// 4. FUNGSI SIGN UP (JIKA EMAIL BELUM TERDAFTAR)
async function handleSignUp(email, password) {
    setBtnLoading(true);
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

        showNotice('Link verifikasi telah dikirim ke email Anda. Silakan periksa kotak masuk!');
        
        // Polling status verifikasi
        startPolling(signUp);

    } catch (signUpErr) {
        setBtnLoading(false);
        const firstErr = (signUpErr.errors && signUpErr.errors.length > 0) ? signUpErr.errors[0] : null;
        
        if (firstErr && firstErr.code === 'form_password_length_too_short') {
            showNotice('Pendaftaran gagal: Kata sandi minimal 8 karakter.', true);
        } else {
            const errorDetail = firstErr ? firstErr.longMessage : signUpErr.message;
            showNotice('Gagal mendaftar: ' + errorDetail, true);
        }
    }
}

// 5. POLLING STATUS VERIFIKASI
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

// 6. EVENT LISTENER FORM (MEMBACA VALUE INPUT DENGAN PRESISI)
document.addEventListener('DOMContentLoaded', () => {
    const authForm = document.getElementById('auth-form') || document.querySelector('form');
    
    if (authForm) {
        authForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Pindai semua tag input di dalam form
            const inputs = authForm.querySelectorAll('input');
            let emailVal = '';
            let passwordVal = '';

            inputs.forEach(input => {
                const type = (input.getAttribute('type') || '').toLowerCase();
                const placeholder = (input.getAttribute('placeholder') || '').toLowerCase();
                const idName = (input.id + ' ' + input.name).toLowerCase();

                // Cari input email
                if (type === 'email' || placeholder.includes('email') || idName.includes('email')) {
                    emailVal = input.value.trim();
                }
                // Cari input password
                if (type === 'password' || placeholder.includes('sandi') || placeholder.includes('pass') || idName.includes('pass')) {
                    passwordVal = input.value.trim();
                }
            });

            // Validasi keberadaan isi
            if (!emailVal || !passwordVal) {
                showNotice('Mohon isi email dan kata sandi terlebih dahulu.', true);
                return;
            }

            // Jalankan alur autentikasi pintar
            await processAuth(emailVal, passwordVal);
        });
    }
});

