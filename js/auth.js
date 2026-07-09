// =======================================
// AUTH.JS
// Sistem Login Final
// =======================================

// Membuat session
function createSession(user){

    const session = {

        username: user.username,

        role: user.role,

        login: true,

        loginTime: Date.now(),

        expire:
            Date.now() +
            (CONFIG.SESSION_HOURS * 60 * 60 * 1000)

    };

    localStorage.setItem(
        "radio_session",
        JSON.stringify(session)
    );

}

// --------------------------------------
// Mengambil session
// --------------------------------------

function getSession(){

    const raw =
        localStorage.getItem("radio_session");

    if(!raw){

        return null;

    }

    try{

        return JSON.parse(raw);

    }catch(e){

        return null;

    }

}

// --------------------------------------
// Menghapus session
// --------------------------------------

function logout(){

    localStorage.removeItem(
        "radio_session"
    );

    location.href="index.html";

}

// --------------------------------------
// Cek login
// --------------------------------------

function checkLogin(){

    const session =
        getSession();

    if(!session){

        location.href="index.html";

        return;

    }

    if(session.login!==true){

        logout();

        return;

    }

    if(Date.now()>session.expire){

        logout();

        return;

    }

}

// --------------------------------------
// Login
// --------------------------------------

async function login(
    username,
    password
){

    const hash =
        await sha256(password);

    const user =
        USERS.find(u=>{

            return(

                u.username===username &&

                u.passwordHash===hash &&

                u.active===true

            );

        });

    if(!user){

        return false;

    }

    createSession(user);

    return true;

}
