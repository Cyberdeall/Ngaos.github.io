// =========================================================================
// LOGIN.JS - Pengendali Validasi Multi-User & Fitur Remember Me
// =========================================================================
document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");
    const usernameInput = document.getElementById("username");
    const rememberCheckbox = document.getElementById("remember");
    const messageOutput = document.getElementById("message");

    // Memeriksa dan memuat data Remember Me saat halaman terbuka
    const savedUsername = localStorage.getItem(CONFIG.REMEMBER_KEY);
    if (savedUsername) {
        usernameInput.value = savedUsername;
        rememberCheckbox.checked = true;
    }

    // Mencegah bypass jika user yang sudah login sah malah membuka halaman login kembali
    if (localStorage.getItem(CONFIG.SESSION_KEY)) {
        try {
            const session = JSON.parse(localStorage.getItem(CONFIG.SESSION_KEY));
            if (Date.now() < session.expireTime) {
                window.location.href = CONFIG.PLAYER_PAGE;
            }
        } catch(e) {}
    }

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        messageOutput.style.display = "none";

        const usernameVal = usernameInput.value.trim();
        const passwordVal = document.getElementById("password").value;

        if (!usernameVal || !passwordVal) {
            tampilkanError("Semua kolom input wajib diisi!");
            return;
        }

        // Jalankan pencocokan enkripsi SHA-256 secara asinkronus
        CryptoEngine.sha256(passwordVal).then(inputPasswordHash => {
            
            // MENCARI AKUN DI DALAM DAFTAR ARRAY USER_DATA
            const akunDitemukan = USER_DATA.DAFTAR_USER.find(user => 
                user.USERNAME.toLowerCase() === usernameVal.toLowerCase() && 
                user.PASSWORD_HASH === inputPasswordHash
            );

            if (akunDitemukan) {
                // 1. Buat token sesi aktif menggunakan nama user yang berhasil login
                Auth.createSession(akunDitemukan.USERNAME);

                // 2. Eksekusi penyimpanan Remember Me
                if (rememberCheckbox.checked) {
                    localStorage.setItem(CONFIG.REMEMBER_KEY, akunDitemukan.USERNAME);
                } else {
                    localStorage.removeItem(CONFIG.REMEMBER_KEY);
                }

                // 3. Alihkan pengguna masuk ke halaman dalam
                window.location.href = CONFIG.PLAYER_PAGE;
            } else {
                tampilkanError("Username atau Password salah!");
            }
        }).catch(err => {
            console.error(err);
            tampilkanError("Terjadi kesalahan sistem keamanan enkripsi.");
        });
    });

    function tampilkanError(teks) {
        messageOutput.innerText = teks;
        messageOutput.style.display = "block";
    }
});
