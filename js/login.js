document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('registerBtn');
    const loginBtn = document.getElementById('loginBtn');

    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('signUpForm');

    const signInMsg = document.getElementById('signInMsg');
    const signUpMsg = document.getElementById('signUpMsg');

    // 1. ANIMASI SLIDE SLIDER (Bekerja di Desktop & HP)
    if (registerBtn && loginBtn) {
        registerBtn.addEventListener('click', () => {
            container.classList.add('active');
            clearMessages();
        });

        loginBtn.addEventListener('click', () => {
            container.classList.remove('active');
            clearMessages();
        });
    }

    function clearMessages() {
        signInMsg.textContent = '';
        signUpMsg.textContent = '';
    }

    // 2. SUBMIT FORM LOGIN
    signInForm.addEventListener('submit', (e) => {
        e.preventDefault();
        signInMsg.style.color = '#ffcc00';
        signInMsg.textContent = 'Memproses login...';

        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        // Simulasi Login Mandiri (Tanpa SDK luar)
        setTimeout(() => {
            if (email && password) {
                signInMsg.style.color = '#4caf50';
                signInMsg.textContent = 'Berhasil masuk! Mengalihkan...';
                // window.location.href = 'index.html';
            } else {
                signInMsg.style.color = '#ff4d4d';
                signInMsg.textContent = 'Gagal masuk: Periksa data Anda';
            }
        }, 1000);
    });

    // 3. SUBMIT FORM PENDAFTARAN
    signUpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        signUpMsg.style.color = '#ffcc00';
        signUpMsg.textContent = 'Memproses pendaftaran...';

        const username = document.getElementById('regUsername').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;

        // Simulasi Register Mandiri
        setTimeout(() => {
            if (username && email && password) {
                signUpMsg.style.color = '#4caf50';
                signUpMsg.textContent = 'Pendaftaran berhasil! Silakan masuk.';
            } else {
                signUpMsg.style.color = '#ff4d4d';
                signUpMsg.textContent = 'Gagal mendaftar: Data tidak lengkap';
            }
        }, 1000);
    });
});
