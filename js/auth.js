// =========================================
// AUTH.JS
// Final Version 1.0
// =========================================

const SESSION_KEY = "radio_session";

// =========================================
// CREATE SESSION
// =========================================

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
        SESSION_KEY,
        JSON.stringify(session)
    );

}

// =========================================
// GET SESSION
// =========================================

function getSession(){

    const raw =
        localStorage.getItem(SESSION_KEY);

    if(!raw){

        return null;

    }

    try{

        return JSON.parse(raw);

    }

    catch(error){

        localStorage.removeItem(SESSION_KEY);

        return null;

    }

}

// =========================================
// IS LOGGED IN
// =========================================

function isLoggedIn(){

    const session = getSession();

    if(!session){

        return false;

    }

    if(session.login !== true){

        return false;

    }

    if(Date.now() > session.expire){

        return false;

    }

    return true;

}

// =========================================
// LOGIN
// =========================================

async function login(username,password){

    username = username.trim();

    const hash =
        await sha256(password);

    const user =
        USERS.find(function(item){

            return (

                item.username === username &&

                item.passwordHash === hash &&

                item.active === true

            );

        });

    if(!user){

        return false;

    }

    createSession(user);

    return true;

}

// =========================================
// CHECK LOGIN
// =========================================

function checkLogin(){

    const session =
        getSession();

    if(!session){

        logout();

        return false;

    }

    if(session.login !== true){

        logout();

        return false;

    }

    if(Date.now() > session.expire){

        logout();

        return false;

    }

    const user =
        USERS.find(function(item){

            return item.username === session.username;

        });

    if(!user){

        logout();

        return false;

    }

    if(user.active !== true){

        logout();

        return false;

    }

    return true;

}

// =========================================
// GET CURRENT USER
// =========================================

function getCurrentUser(){

    const session =
        getSession();

    if(!session){

        return null;

    }

    return USERS.find(function(item){

        return item.username === session.username;

    });

}

// =========================================
// LOGOUT
// =========================================

function logout(){

    localStorage.removeItem(SESSION_KEY);

    window.location.replace("index.html");

}

// =========================================
// REFRESH SESSION
// =========================================

function refreshSession(){

    const user =
        getCurrentUser();

    if(!user){

        logout();

        return;

    }

    createSession(user);

}
