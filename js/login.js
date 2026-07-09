// =========================================
// LOGIN.JS
// Final Version 2.0
// =========================================

document.addEventListener("DOMContentLoaded", function () {

    // ----------------------------
    // Jika sudah login
    // ----------------------------

    if (isLoggedIn()) {

        window.location.replace("player.html");

        return;

    }

    const form = document.getElementById("loginForm");

    const username = document.getElementById("username");

    const password = document.getElementById("password");

    const remember = document.getElementById("remember");

    const message = document.getElementById("message");

    const submitButton =
        form.querySelector("button[type='submit']");

    // ----------------------------
    // Remember Username
    // ----------------------------

    const savedUser =
        localStorage.getItem(CONFIG.REMEMBER_KEY);

    if (savedUser) {

        username.value = savedUser;

        remember.checked = true;

    }

    // ----------------------------
    // Clear Message
    // ----------------------------

    function showMessage(text, color = "#ff4444") {

        message.textContent = text;

        message.style.color = color;

    }

    // ----------------------------
    // Submit Login
    // ----------------------------

    form.addEventListener("submit", async function (event) {

        event.preventDefault();

        showMessage("");

        const user = username.value.trim();

        const pass = password.value;

        if (user === "") {

            showMessage("Username wajib diisi.");

            username.focus();

            return;

        }

        if (pass === "") {

            showMessage("Password wajib diisi.");

            password.focus();

            return;

        }

        submitButton.disabled = true;

        submitButton.textContent = "MEMPROSES...";

        try {

            const success =
                await login(user, pass);

            if (success) {

                if (remember.checked) {

                    localStorage.setItem(
                        CONFIG.REMEMBER_KEY,
                        user
                    );

                } else {

                    localStorage.removeItem(
                        CONFIG.REMEMBER_KEY
                    );

                }

                showMessage(
                    "Login berhasil...",
                    "#00aa55"
                );

                setTimeout(function () {

                    window.location.replace(
                        "player.html"
                    );

                }, 300);

                return;

            }

            showMessage(
                "Username atau password salah."
            );

        }

        catch (error) {

            console.error(error);

            showMessage(
                "Terjadi kesalahan sistem."
            );

        }

        finally {

            submitButton.disabled = false;

            submitButton.textContent = "LOGIN";

        }

    });

});
