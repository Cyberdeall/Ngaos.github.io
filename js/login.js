// =========================================================================
// LOGIN.JS - Validasi Multi-User, Proteksi Multi-Device, & Remember Me
// =========================================================================
document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");
    const usernameInput = document.getElementById("username");
    const rememberCheckbox = document.getElementById("remember");
    const messageOutput = document.getElementById("message");

    const savedUsername = localStorage.getItem(CONFIG.REMEMBER_KEY);
    if (savedUsername) {
        usernameInput.value = savedUsername;
        rememberCheckbox.checked = true;
    }

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
            tampilkanError("Username and Password wajib diisi!");
            return;
        }

        CryptoEngine.sha256(passwordVal).then(inputPasswordHash => {
            
            // 1. Cari dulu apakah ada Username dan Password yang cocok
            const akunDitemukan = USER_DATA.DAFTAR_USER.find(user => 
                user.USERNAME.toLowerCase() === usernameVal.toLowerCase() && 
                user.PASSWORD_HASH === inputPasswordHash
            );

            if (akunDitemukan) {
                // 2. CEK STATUS AKUN: Jika statusnya tidak AKTIF, tolak akses masuk
                if (akunDitemukan.STATUS !== "AKTIF") {
                    tampilkanError("Akun Anda telah dinonaktifkan oleh Admin!");
                    return;
                }

                // 3. PROTEKSI MULTI-DEVICE MURNI SERVER: Periksa status manifes Icecast
                // Mengambil manifes JSON publik dari port HTTPS ArenaStreaming Anda
                const statusUrl = CONFIG.STREAM_URL.replace("/stream", "/status-json.xsl");
                
                fetch(statusUrl + "?cb=" + Date.now())
                .then(res => res.json())
                .then(data => {
                    let userSedangAktif = false;
                    
                    // Memeriksa parameter identitas client yang terhubung ke server radio
                    if (data && data.icestats && data.icestats.source) {
                        const sources = Array.isArray(data.icestats.source) ? data.icestats.source : [data.icestats.source];
                        
                        // Memindai apakah nama user terdeteksi di dalam manifes streaming aktif
                        const targetUser = akunDitemukan.USERNAME.toLowerCase();
                        sources.forEach(src => {
                            if (src.client_info && src.client_info.includes(targetUser)) {
                                userSedangAktif = true;
                            }
                        });
                    }

                    // Eksekusi Aturan Ralat: Tolak login perangkat baru jika sedang aktif
                    if (userSedangAktif) {
                        tampilkanError("Akun ini sedang aktif digunakan di perangkat lain!");
                    } else {
                        // Jika server kosong, persilahkan masuk dan buatkan sesi login
                        Auth.createSession(akunDitemukan.USERNAME);

                        if (rememberCheckbox.checked) {
                            localStorage.setItem(CONFIG.REMEMBER_KEY, akunDitemukan.USERNAME);
                        } else {
                            localStorage.removeItem(CONFIG.REMEMBER_KEY);
                        }

                        window.location.href = CONFIG.PLAYER_PAGE;
                    }
                })
                .catch(err => {
                    // Penanganan Cadangan: Jika server down atau gagal fetch data manifes,
                    // sistem mengizinkan login lokal agar jemaah tidak terhambat akibat kendala teknis server
                    console.log("Server sync bypassed:", err);
                    Auth.createSession(akunDitemukan.USERNAME);
                    if (rememberCheckbox.checked) {
                        localStorage.setItem(CONFIG.REMEMBER_KEY, akunDitemukan.USERNAME);
                    } else {
                        localStorage.removeItem(CONFIG.REMEMBER_KEY);
                    }
                    window.location.href = CONFIG.PLAYER_PAGE;
                });

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
