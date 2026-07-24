// =========================================================================
// AUTH.JS - Manajemen Sesi Login, Token Keamanan & Proteksi Anti-Bypass
// =========================================================================
const Auth = {
    createSession: function(username) {
        const sessionData = {
            username: username,
            loginTime: Date.now(),
            expireTime: Date.now() + (CONFIG.SESSION_HOURS * 60 * 60 * 1000)
        };
        localStorage.setItem(CONFIG.SESSION_KEY, JSON.stringify(sessionData));
    },

    checkSession: function() {
        const sessionStr = localStorage.getItem(CONFIG.SESSION_KEY);
        if (!sessionStr) return false;

        try {
            const session = JSON.parse(sessionStr);
            if (Date.now() > session.expireTime) {
                this.logout();
                return false;
            }
            return true;
        } catch (e) {
            this.logout();
            return false;
        }
    },

    protectPage: function() {
        if (!this.checkSession()) {
            window.location.href = CONFIG.LOGIN_PAGE;
        }
    },

    logout: function() {
        localStorage.removeItem(CONFIG.SESSION_KEY);
        window.location.href = CONFIG.LOGIN_PAGE;
    }
};
