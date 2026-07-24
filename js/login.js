document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const toRegisterBtn = document.getElementById('toRegisterBtn');
    const toLoginBtn = document.getElementById('toLoginBtn');

    const signUpForm = document.getElementById('signUpForm');
    const signInForm = document.getElementById('signInForm');

    const signUpMsg = document.getElementById('signUpMsg');
    const signInMsg = document.getElementById('signInMsg');

    // 1. DYNAMIC SLIDE TRIGGER
    if (toRegisterBtn && toLoginBtn) {
        toRegisterBtn.addEventListener('click', () => {
            container.classList.add('active');
            clearMessages();
        });

        toLoginBtn.addEventListener('click', () => {
            container.classList.remove('active');
            clearMessages();
        });
    }

    function clearMessages() {
        signUpMsg.textContent = '';
        signInMsg.textContent = '';
    }

    // 2. PENDAFTARAN (DENGAN STRATEGI PASSWORD LOGIC)
    signUpForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        signUpMsg.style.color = '#ffcc00';
        signUpMsg.textContent = 'Memproses pendaftaran...';

        const username = document.getElementById('regUsername').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;

        try {
            // Jika Anda menggunakan Supabase
            if (typeof supabase !== 'undefined') {
                const { data, error } = await supabase.auth.signUp({
                    email: email,
                    password: password,
                    options: { data: { username: username } }
                });
                if (error) throw error;
                signUpMsg.style.color = '#4caf50';
                signUpMsg.textContent = 'Pendaftaran berhasil! Silakan login.';
            } 
            // Jika Anda menggunakan Clerk JS SDK
            else if (window.Clerk && window.Clerk.client) {
                const signUp = await window.Clerk.client.signUp.create({
                    emailAddress: email,
                    password: password,
                    username: username
                });
                // Memastikan menggunakan password strategy tanpa email_link
                await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
                signUpMsg.style.color = '#4caf50';
                signUpMsg.textContent = 'Kode verifikasi telah dikirim ke email Anda.';
            } 
            else {
                // Fallback / Simulasi sukses jika backend belum terhubung penuh
                setTimeout(() => {
                    signUpMsg.style.color = '#4caf50';
                    signUpMsg.textContent = 'Pendaftaran berhasil! Silakan login.';
                }, 1000);
            }
        } catch (err) {
            signUpMsg.style.color = '#ff4d4d';
            signUpMsg.textContent = 'Gagal mendaftar: ' + (err.message || 'Periksa kembali data Anda');
        }
    });

    // 3. LOGIN
    signInForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        signInMsg.style.color = '#ffcc00';
        signInMsg.textContent = 'Memproses masuk...';

        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        try {
            if (typeof supabase !== 'undefined') {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email: email,
                    password: password
                });
                if (error) throw error;
                window.location.href = 'index.html';
            } 
            else if (window.Clerk && window.Clerk.client) {
                const signIn = await window.Clerk.client.signIn.create({
                    identifier: email,
                    password: password
                });
                if (signIn.status === "complete") {
                    await window.Clerk.setActive({ session: signIn.createdSessionId });
                    window.location.href = 'index.html';
                }
            } 
            else {
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            }
        } catch (err) {
            signInMsg.style.color = '#ff4d4d';
            signInMsg.textContent = 'Gagal masuk: ' + (err.message || 'Email atau password salah');
        }
    });
});

