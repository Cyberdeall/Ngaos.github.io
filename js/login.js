// =========================================================================
// LOGIN.JS - Perbaikan Akurat Proteksi Multi-Device Murni Server Icecast
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
            tampilkanError("Username dan Password wajib diisi!");
            return;
        }

        CryptoEngine.sha256(passwordVal).then(inputPasswordHash => {
            
            // 1. Validasi Akun Lokal via users.js
            const akunDitemukan = USER_DATA.DAFTAR_USER.find(user => 
                user.USERNAME.toLowerCase() === usernameVal.toLowerCase() && 
                user.PASSWORD_HASH === inputPasswordHash
            );

            if (akunDitemukan) {
                if (akunDitemukan.STATUS !== "AKTIF") {
                    tampilkanError("Akun Anda telah dinonaktifkan oleh Admin!");
                    return;
                }

                // 2. PROTEKSI MULTI-DEVICE AKURAT: Membaca Jumlah Pendengar Aktif di Server
                const statusUrl = CONFIG.STREAM_URL.replace("/stream", "/status-json.xsl");
                
                fetch(statusUrl + "?cb=" + Date.now())
                .then(res => res.json())
                .then(data => {
                    let jumlahPendengarAktif = 0;
                    
                    if (data && data.icestats && data.icestats.source) {
                        const sources = Array.isArray(data.icestats.source) ? data.icestats.source : [data.icestats.source];
                        
                        // Membaca properti 'listeners' resmi dari server Icecast
                        sources.forEach(src => {
                            if (src.listeners !== undefined) {
                                jumlahPendengarAktif = parseInt(src.listeners, 10);
                            }
                        });
                    }

                    // ATURAN TEGAS: Jika di server sudah ada 1 pendengar aktif, kunci gerbang masuk
                    if (jumlahPendengarAktif >= 1) {
                        tampilkanError("Akun ini sedang aktif digunakan di perangkat lain!");
                    } else {
                        // Jika server kosong (0 pendengar), izinkan login perangkat baru
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
                    // Mode Darurat otomatis jika jaringan server putus / offline
                    console.log("Server check bypassed:", err);
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

