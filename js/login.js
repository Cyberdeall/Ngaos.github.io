// ===============================
// LOGIN
// ===============================

const form = document.getElementById("loginForm");

form.addEventListener("submit", async function(e){

    e.preventDefault();

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value;

    const remember =
        document.getElementById("remember").checked;

    const message =
        document.getElementById("message");

    const success =
        await login(username,password);

    if(success){

        if(remember){

            localStorage.setItem(
                "remember_user",
                username
            );

        }else{

            localStorage.removeItem(
                "remember_user"
            );

        }

        window.location.href="player.html";

    }else{

        message.innerHTML =
        "Username atau Password salah";

    }

});

// ===============================
// REMEMBER USER
// ===============================

window.onload=function(){

    const saved=
        localStorage.getItem("remember_user");

    if(saved){

        document.getElementById("username").value=saved;

        document.getElementById("remember").checked=true;

    }

}
