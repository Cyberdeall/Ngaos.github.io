// =========================================
// AUTH.JS
// Final Version 2.0
// =========================================

const SESSION_KEY = CONFIG.SESSION_KEY;

// =========================================
// SAVE SESSION
// =========================================

function createSession(user) {

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

function getSession() {

    const raw =
        localStorage.getItem(SESSION_KEY);

    if (!raw) {

        return null;

    }

    try {

        const session = JSON.parse(raw);

        return session;

    }

    catch (error) {

        console.error(error);

        localStorage.removeItem(SESSION_KEY);

        return null;

    }

}

// =========================================
// CHECK EXPIRE
// =========================================

function isSessionExpired(session) {

    if (!session) {

        return true;

    }

    return Date.now() > session.expire;

}

// =========================================
// IS LOGGED IN
// =========================================

function isLoggedIn() {

    const session =
        getSession();

    if (!session) {

        return false;

    }

    if (session.login !== true) {

        return false;

    }

    if (isSessionExpired(session)) {

        logout(false);

        return false;

    }

    return true;

}

// =========================================
// LOGIN
// =========================================

async function login(username, password) {

    username = username.trim();

    const hash =
        await sha256(password);

    const user =
        USERS.find(function (item) {

            return (

                item.username === username &&

                item.passwordHash === hash &&

                item.active === true

            );

        });

    if (!user) {

        return false;

    }

    createSession(user);

    return true;

}

// =========================================
// CHECK LOGIN
// =========================================

function checkLogin() {

    const session =
        getSession();

    if (!session) {

        logout(false);

        return false;

    }

    if (session.login !== true) {

        logout(false);

        return false;

    }

    if (isSessionExpired(session)) {

        logout(false);

        return false;

    }

    const user =
        USERS.find(function (item) {

            return item.username === session.username;

        });

    if (!user) {

        logout(false);

        return false;

    }

    if (user.active !== true) {

        logout(false);

        return false;

    }

    refreshSession();

    return true;

}

// =========================================
// GET CURRENT USER
// =========================================

function getCurrentUser() {

    const session =
        getSession();

    if (!session) {

        return null;

    }

    return USERS.find(function (item) {

        return item.username === session.username;

    }) || null;

}

// =========================================
// REFRESH SESSION
// =========================================

function refreshSession() {

    const user =
        getCurrentUser();

    if (!user) {

        logout(false);

        return;

    }

    createSession(user);

}

// =========================================
// LOGOUT
// =========================================

function logout(redirect = true) {

    localStorage.removeItem(SESSION_KEY);

    sessionStorage.clear();

    if (redirect) {

        window.location.replace("index.html");

    }

}

// =========================================
// AUTO REFRESH
// =========================================

setInterval(function () {

    if (isLoggedIn()) {

        refreshSession();

    }

}, 5 * 60 * 1000);
