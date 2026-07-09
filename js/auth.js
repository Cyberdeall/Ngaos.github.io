// =========================================
// AUTH.JS
// Final Version 1.1
// =========================================

const SESSION_KEY = "radio_session";

// =========================================
// CREATE SESSION
// =========================================

function createSession(user){

    const now = Date.now();

    const session = {

        username: user.username,

        role: user.role,

        login: true,

        loginTime: now,

        expire: now + (CONFIG.SESSION_HOURS * 60 * 60 * 1000)

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

    const raw = localStorage.getItem(SESSION_KEY);

    if(!raw){
        return null;
    }

    try{

        return JSON.parse(raw);

    }catch(error){

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

    const user = USERS.find(function(item){

        return item.username === session.username;

    });

    if(!user){
        return false;
    }

    if(user.active !== true){
        return false;
    }

    return true;

}

// =========================================
// LOGIN
// =========================================

async function login(username,password){

    username = username.trim();

    const hash = await sha256(password);

    const user = USERS.find(function(item){

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

    if(!isLoggedIn()){

        logout();

        return false;

    }

    return true;

}

// =========================================
// GET CURRENT USER
// =========================================

function getCurrentUser(){

    if(!isLoggedIn()){

        return null;

    }

    const session = getSession();

    return USERS.find(function(item){

        return item.username === session.username;

    });

}

// =========================================
// REFRESH SESSION
// =========================================

function refreshSession(){

    const user = getCurrentUser();

    if(!user){

        logout();

        return false;

    }

    const session = getSession();

    session.expire =
        Date.now() +
        (CONFIG.SESSION_HOURS * 60 * 60 * 1000);

    localStorage.setItem(
        SESSION_KEY,
        JSON.stringify(session)
    );

    return true;

}

// =========================================
// LOGOUT
// =========================================

function logout(){

    localStorage.removeItem(SESSION_KEY);

    window.location.replace("index.html");

}
