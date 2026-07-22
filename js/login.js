// ==========================================
// KONFIGURASI PWA NGAOS AL FALAH PLOSO
// ==========================================
const CLERK_PUBLISHABLE_KEY = 'pk_test_...'; // Ganti dengan Publishable Key Anda jika belum
const PWA_BASE_URL = 'https://cyberdeall.github.io/Ngaos/';
const PLAYER_PAGE = 'https://cyberdeall.github.io/Ngaos/player.html';

let clerk;

// 1. INISIALISASI CLERK SDK
window.addEventListener('load', async () => {
    try {
        if (!window.Clerk) {
            showNotice('SDK Clerk gagal dimuat! Periksa koneksi atau script HTML.', true);
            return;
        }
        
        clerk = window.Clerk;
        await clerk.load({ publishableKey: CLERK_PUBLISHABLE_KEY });

        // Jika user sudah terautentikasi, langsung arahkan ke Player
        if (clerk.user) {
            window.location.href = PLAYER_PAGE;
        }
    } catch (err) {
        showNotice('Gagal inisialisasi Clerk: ' + err.message, true);
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
        // Fallback jika tag HTML penampung pesan belum terpasang
        alert((isError ? '❌ ERROR: ' : '✅ INFO: ') + msg);
    }
}

function setBtnLoading(isLoading) {
    const btn = document.getElementById('btn-submit') || document.querySelector('button[type="submit"]');
    if (btn) {
        btn.disabled = isLoading;
        btn.textContent = isLoading ? 'Memproses...' : 'Masuk / Daftar';
    }
}

// 3. FUNGSI UTAMA AUTHENTICATION (INTELLIGENT FLOW)
async function processAuth(email, password) {
    setBtnLoading(true);
    showNotice('Memeriksa kredensial...');

    try {
        // LANGKAH 1: Coba Sign In terlebih dahulu (Untuk akun yang sudah ada di dasbor)
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
            showNotice('Status login: ' + signIn.status + '. Memerlukan verifikasi lanjutan.', true);
        }

    } catch (signInErr) {
        // Ambil kode error dari Clerk
        const errorCode = signInErr.errors ? signInErr.errors[0].code : '';

        // Jika error karena pengguna belum terdaftar, otomatis alihkan ke Sign Up
        if (errorCode === 'form_identifier_not_found') {
            showNotice('Akun belum ada, mencoba membuat akun baru...');
            await handleSignUp(email, password);
        } else {
            // Jika error karena password salah atau hal lain, tampilkan error aslinya
            setBtnLoading(false);
            const errorDetail = signInErr.errors ? signInErr.errors[0].longMessage : signInErr.message;
            showNotice(errorDetail, true);
        }
    }
}

// 4. FUNGSI SIGN UP (JIKA AKUN BELUM TERDAFTAR)
async function handleSignUp(email, password) {
    try {
        const signUp = await clerk.client.signUp.create({
            emailAddress: email,
            password: password,
        });

        // Kirim link verifikasi email
        await signUp.prepareEmailAddressVerification({
            strategy: 'email_link',
            redirectUrl: PWA_BASE_URL
        });

        showNotice('Link verifikasi dikirim! Silakan cek email Anda (atau gunakan kode 424242 jika di Test Mode).');
        
        // Polling untuk mendeteksi penyelesaian verifikasi
        startPolling(signUp);

    } catch (signUpErr) {
        setBtnLoading(false);
        const errorDetail = signUpErr.errors ? signUpErr.errors[0].longMessage : signUpErr.message;
        showNotice('Gagal Pendaftaran: ' + errorDetail, true);
    }
}

// 5. POLLING DETECTOR (Mencegah Stagnan/Infinite Loading)
function startPolling(signUpObject) {
    const interval = setInterval(async () => {
        try {
            await signUpObject.reload();
            if (signUpObject.status === 'complete') {
                clearInterval(interval);
                showNotice('Verifikasi Selesai! Mengalihkan...');
                await clerk.setActive({ session: signUpObject.createdSessionId });
                window.location.href = PLAYER_PAGE;
            }
        } catch (err) {
            console.error('Polling error:', err);
        }
    }, 2500);
}

// 6. EVENT LISTENER FORM
document.addEventListener('DOMContentLoaded', () => {
    // Cari form berdasarkan ID atau tag <form> pertama di halaman
    const authForm = document.getElementById('auth-form') || document.querySelector('form');
    
    if (authForm) {
        authForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Cari elemen input email & password secara fleksibel
            const emailInput = document.getElementById('email-input') || document.querySelector('input[type="email"]');
            const passwordInput = document.getElementById('password-input') || document.querySelector('input[type="password"]');

            if (!emailInput || !passwordInput) {
                alert('ERROR: Input Email atau Password tidak ditemukan di elemen HTML!');
                return;
            }

            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            if (!email || !password) {
                showNotice('Mohon isi email dan kata sandi terlebih dahulu.', true);
                return;
            }

            await processAuth(email, password);
        });
    } else {
        console.error('Elemen <form> tidak ditemukan di HTML.');
    }
});
