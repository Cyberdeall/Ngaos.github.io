// =========================================
// LOGIN.JS
// Final Version 1.0
// =========================================

document.addEventListener("DOMContentLoaded", function(){

    const form = document.getElementById("loginForm");

    const username =
        document.getElementById("username");

    const password =
        document.getElementById("password");

    const remember =
        document.getElementById("remember");

    const message =
        document.getElementById("message");

    const submitButton =
        form.querySelector("button[type='submit']");

    // ----------------------------
    // Remember Username
    // ----------------------------

    const savedUser =
        localStorage.getItem("remember_username");

    if(savedUser){

        username.value = savedUser;

        remember.checked = true;

    }

    // ----------------------------
    // Submit Login
    // ----------------------------

    form.addEventListener("submit", async function(event){

        event.preventDefault();

        message.textContent = "";

        const user =
            username.value.trim();

        const pass =
            password.value;

        if(user===""){

            message.textContent =
                "Username wajib diisi.";

            username.focus();

            return;

        }

        if(pass===""){

            message.textContent =
                "Password wajib diisi.";

            password.focus();

            return;

        }

        submitButton.disabled = true;

        submitButton.textContent =
            "Memproses...";

        try{

            const success =
                await login(user,pass);

            if(success){

                if(remember.checked){

                    localStorage.setItem(
                        "remember_username",
                        user
                    );

                }else{

                    localStorage.removeItem(
                        "remember_username"
                    );

                }

                window.location.replace(
                    "player.html"
                );

                return;

            }

            message.textContent =
                "Username atau password salah.";

        }

        catch(error){

            console.error(error);

            message.textContent =
                "Terjadi kesalahan.";

        }

        finally{

            submitButton.disabled = false;

            submitButton.textContent =
                "LOGIN";

        }

    });

});
