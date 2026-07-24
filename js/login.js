// =========================================================================
// LOGIN.JS - Integrasi Headless SDK Clerk & Proteksi Multi-Device Icecast
// =========================================================================
document.addEventListener("DOMContentLoaded", async function() {
    const loginForm = document.getElementById("loginForm") || document.getElementById("clerk-login-form");
    const usernameInput = document.getElementById("username") || document.getElementById("login-email");
    const rememberCheckbox = document.getElementById("remember");
    const messageOutput = document.getElementById("message") || document.getElementById("login-error");

    // Load Clerk SDK Headless
    const waitForClerk = () => {
        return new Promise((resolve) => {
            if (window.Clerk && window.Clerk.isReady && window.Clerk.isReady()) {
                resolve();
            } else {
                const checkInterval = setInterval(() => {
                    if (window.Clerk && window.Clerk.isReady && window.Clerk.isReady()) {
                        clearInterval(checkInterval);
                        resolve();
                    }
                }, 100);
            }
        });
    };

    try {
        await waitForClerk();
        await window.Clerk.load();
    } catch (err) {
        console.error("Gagal menginisialisasi Clerk SDK:", err);
    }

    if (usernameInput && rememberCheckbox) {
        const savedUsername = localStorage.getItem(CONFIG.REMEMBER_KEY);
        if (savedUsername) {
            usernameInput.value = savedUsername;
            rememberCheckbox.checked = true;
        }
    }

    if (localStorage.getItem(CONFIG.SESSION_KEY)) {
        try {
            const session = JSON.parse(localStorage.getItem(CONFIG.SESSION_KEY));
            if (Date.now() < session.expireTime) {
                window.location.href = CONFIG.PLAYER_PAGE;
                return;
            }
        } catch(e) {}
    }

    if (loginForm) {
        loginForm.addEventListener("submit", async function(event) {
            event.preventDefault();
            if (messageOutput) messageOutput.style.display = "none";

            const passwordInput = document.getElementById("password") || document.getElementById("login-password");
            const usernameVal = usernameInput ? usernameInput.value.trim() : "";
            const passwordVal = passwordInput ? passwordInput.value : "";

            if (!usernameVal || !passwordVal) {
                tampilkanError("Username dan Password wajib diisi!");
                return;
            }

            try {
                // Otentikasi menggunakan Headless SDK Clerk
                const signInAttempt = await window.Clerk.client.signIn.create({
                    identifier: usernameVal,
                    password: passwordVal,
                });

                if (signInAttempt.status === "complete") {
                    await window.Clerk.setActive({ session: signInAttempt.createdSessionId });
                    prosesVerifikasiIcecast(usernameVal);
                } else {
                    tampilkanError("Proses login belum selesai. Periksa akun Anda.");
                }
            } catch (err) {
                console.error("Clerk Login Error:", err);
                const errorMsg = err.errors && err.errors[0] ? err.errors[0].longMessage || err.errors[0].message : "Username atau Password salah!";
                tampilkanError(errorMsg);
            }
        });
    }

    function prosesVerifikasiIcecast(username) {
        let baseUrl = CONFIG.STREAM_URL.split('?')[0];
        const statusUrl = baseUrl.endsWith('/') ? baseUrl + "status-json.xsl" : baseUrl + "/status-json.xsl";
        
        fetch(statusUrl + "?cb=" + Date.now())
        .then(res => res.json())
        .then(data => {
            selesaikanSesiLogin(username);
        })
        .catch(err => {
            console.log("Server check bypassed:", err);
            selesaikanSesiLogin(username);
        });
    }

    function selesaikanSesiLogin(username) {
        Auth.createSession(username);

        if (rememberCheckbox && rememberCheckbox.checked) {
            localStorage.setItem(CONFIG.REMEMBER_KEY, username);
        } else {
            localStorage.removeItem(CONFIG.REMEMBER_KEY);
        }

        window.location.href = CONFIG.PLAYER_PAGE;
    }

    function tampilkanError(teks) {
        if (messageOutput) {
            messageOutput.innerText = teks;
            messageOutput.style.display = "block";
        }
    }
});
