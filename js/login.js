// ==========================================
// CONFIGURATION & INITIALIZATION
// ==========================================
const CLERK_PUBLISHABLE_KEY = 'pk_test_...'; // Ganti dengan Publishable Key Anda jika belum
const PWA_URL = 'https://cyberdeall.github.io/Ngaos/';
const REDIRECT_AFTER_LOGIN = 'https://cyberdeall.github.io/Ngaos/player.html';

let clerk;

// Inisialisasi Clerk SDK
window.addEventListener('load', async () => {
    try {
        if (!window.Clerk) {
            console.error('Clerk SDK belum dimuat di HTML.');
            return;
        }
        
        clerk = window.Clerk;
        await clerk.load({ publishableKey: CLERK_PUBLISHABLE_KEY });

        // Jika pengguna sudah login, langsung lempar ke halaman player
        if (clerk.user) {
            window.location.href = REDIRECT_AFTER_LOGIN;
        }
    } catch (err) {
        console.error('Gagal menginisialisasi Clerk:', err);
    }
});

// ==========================================
// HELPER FUNCTIONS (UI & NOTIFICATION)
// ==========================================
function showMessage(msg, isError = false) {
    const statusEl = document.getElementById('status-message');
    if (statusEl) {
        statusEl.textContent = msg;
        statusEl.style.color = isError ? '#ff4d4d' : '#00e676';
        statusEl.style.display = 'block';
    } else {
        alert(msg);
    }
}

function setLoading(isLoading) {
    const btnSubmit = document.getElementById('btn-submit');
    if (btnSubmit) {
        btnSubmit.disabled = isLoading;
        btnSubmit.textContent = isLoading ? 'Memproses...' : 'Lanjutkan';
    }
}

// ==========================================
// MAIN AUTHENTICATION FLOW
// ==========================================

// 1. FUNGSI PENDAFTARAN (SIGN UP)
async function handleSignUp(email, password) {
    setLoading(true);
    try {
        // Buat sesi pendaftaran di Clerk
        const signUp = await clerk.client.signUp.create({
            emailAddress: email,
            password: password,
        });

        // Kirim link verifikasi ke email
        const verification = await signUp.prepareEmailAddressVerification({
            strategy: 'email_link',
            redirectUrl: PWA_URL
        });

        showMessage('Link verifikasi telah dikirim! Silakan periksa inbox email Anda.');

        // Jalankan Polling untuk mendeteksi ketika pengguna mengklik link di email
        startVerificationPolling(signUp);

    } catch (err) {
        setLoading(false);
        const errorMsg = err.errors ? err.errors[0].longMessage : err.message;
        showMessage(`Gagal Mendaftar: ${errorMsg}`, true);
    }
}

// 2. FUNGSI MASUK (SIGN IN)
async function handleSignIn(email, password) {
    setLoading(true);
    try {
        const signIn = await clerk.client.signIn.create({
            identifier: email,
            password: password,
        });

        if (signIn.status === 'complete') {
            await clerk.setActive({ session: signIn.createdSessionId });
            window.location.href = REDIRECT_AFTER_LOGIN;
        } else {
            // Jika butuh verifikasi tambahan
            showMessage('Diperlukan verifikasi tambahan.', true);
            setLoading(false);
        }
    } catch (err) {
        setLoading(false);
        const errorMsg = err.errors ? err.errors[0].longMessage : err.message;
        showMessage(`Gagal Login: ${errorMsg}`, true);
    }
}

// 3. POLLING DETECTOR (Mencegah Infinite Loading)
function startVerificationPolling(signUpObject) {
    const interval = setInterval(async () => {
        try {
            // Reload status pendaftaran dari server
            await signUpObject.reload();

            if (signUpObject.status === 'complete') {
                clearInterval(interval);
                showMessage('Verifikasi berhasil! Mengalihkan...');
                
                // Aktifkan sesi login dan pindahkan halaman
                await clerk.setActive({ session: signUpObject.createdSessionId });
                window.location.href = REDIRECT_AFTER_LOGIN;
            }
        } catch (err) {
            console.error('Error saat mengecek status verifikasi:', err);
        }
    }, 2500); // Cek setiap 2.5 detik
}

// ==========================================
// EVENT LISTENER FORM
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const authForm = document.getElementById('auth-form');
    
    if (authForm) {
        authForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email-input').value.trim();
            const password = document.getElementById('password-input').value.trim();
            const isSignUp = document.getElementById('mode-toggle')?.checked; // Asumsi toggle checkbox untuk switch Sign In / Sign Up

            if (!email || !password) {
                showMessage('Harap isi email dan kata sandi.', true);
                return;
            }

            if (isSignUp) {
                await handleSignUp(email, password);
            } else {
                await handleSignIn(email, password);
            }
        });
    }
});
