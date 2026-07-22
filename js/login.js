// ==========================================
// PWA NGAOS AL FALAH PLOSO - SAFE AUTH ENGINE
// ==========================================
const CLERK_PUBLISHABLE_KEY = 'pk_test_ZnVuLXBpZ2Vvbi02Mi5jbGVyay5hY2NvdW50cy5kZXYk'; // WAJIB: Masukkan Publishable Key Clerk Anda di sini
const REDIRECT_URL = './player.html';

let clerk;

window.addEventListener('load', async () => {
    try {
        if (!window.Clerk) {
            console.error('Clerk SDK tidak ditemukan.');
            return;
        }
        clerk = window.Clerk;
        await clerk.load({ publishableKey: CLERK_PUBLISHABLE_KEY });

        if (clerk.user) {
            window.location.href = REDIRECT_URL;
        }
    } catch (err) {
        console.error('Gagal inisialisasi Clerk:', err);
    }
});

function notify(message, isError = false) {
    // Cari elemen status jika ada, jika tidak gunakan alert biasa agar tidak merusak UI
    const statusEl = document.querySelector('#status-message, .status-message');
    if (statusEl) {
        statusEl.textContent = message;
        statusEl.style.color = isError ? '#ff5252' : '#00e676';
        statusEl.style.display = 'block';
    } else {
        alert((isError ? '⚠️ ' : '✅ ') + message);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form');

    forms.forEach((form) => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const emailInput = form.querySelector('input[type="email"]') || form.querySelector('input[name*="email"]');
            const passInput = form.querySelector('input[type="password"]') || form.querySelector('input[name*="pass"]');

            if (!emailInput || !passInput) {
                notify('Input email atau password tidak ditemukan pada form.', true);
                return;
            }

            const email = emailInput.value.trim();
            const password = passInput.value.trim();

            if (!email || !password) {
                notify('Mohon isi email dan password.', true);
                return;
            }

            const isSignUp = form.id.includes('register') || 
                             form.id.includes('signup') || 
                             form.classList.contains('sign-up') ||
                             document.querySelector('.container')?.classList.contains('active');

            try {
                if (isSignUp) {
                    notify('Memproses pendaftaran...');
                    const signUp = await clerk.client.signUp.create({ emailAddress: email, password: password });
                    await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
                    
                    const code = prompt('Kode OTP telah dikirim ke email Anda. Masukkan 6 digit kode OTP:');
                    if (code) {
                        const complete = await signUp.attemptEmailAddressVerification({ code });
                        if (complete.status === 'complete') {
                            await clerk.setActive({ session: complete.createdSessionId });
                            window.location.href = REDIRECT_URL;
                        }
                    }
                } else {
                    notify('Memproses login...');
                    const signIn = await clerk.client.signIn.create({ identifier: email, password: password });
                    if (signIn.status === 'complete') {
                        await clerk.setActive({ session: signIn.createdSessionId });
                        window.location.href = REDIRECT_URL;
                    } else {
                        notify('Status login: ' + signIn.status, true);
                    }
                }
            } catch (err) {
                const firstErr = err.errors ? err.errors[0] : null;
                notify(firstErr ? firstErr.longMessage || firstErr.message : err.message, true);
            }
        });
    });
});

