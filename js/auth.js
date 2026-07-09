// ====================================
// AUTH SYSTEM
// ====================================

async function login(username, password){

    const hash = await sha256(password);

    for(const user of USERS){

        if(
            user.username === username &&
            user.password === hash
        ){

            localStorage.setItem(
                "radio_login",
                "true"
            );

            localStorage.setItem(
                "radio_user",
                username
            );

            return true;
        }

    }

    return false;

}

// ----------------------------

function logout(){

    localStorage.removeItem("radio_login");

    localStorage.removeItem("radio_user");

    location.href="index.html";

}

// ----------------------------

function checkLogin(){

    if(
        localStorage.getItem("radio_login")
        !== "true"
    ){

        location.href="index.html";

    }

}
