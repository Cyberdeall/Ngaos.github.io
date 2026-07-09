// =========================================
// PLAYER.JS
// Final Version 1.0
// Bagian 1
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    // ============================
    // WAJIB LOGIN
    // ============================

    if (!checkLogin()) {
        window.location.replace(CONFIG.LOGIN_PAGE);
        return;
    }

    // ============================
    // ELEMENT
    // ============================

    const audio = document.getElementById("radioPlayer");

    const playButton = document.getElementById("playButton");

    const volumeSlider = document.getElementById("volumeSlider");

    const loading = document.getElementById("loading");

    const liveText = document.getElementById("liveText");

    const liveDot = document.getElementById("liveDot");

    const logoutButton = document.getElementById("logoutButton");

    const currentUser = document.getElementById("currentUser");

    // ============================
    // USER
    // ============================

    const user = getCurrentUser();

    if (user) {

        currentUser.textContent = user.username;

    }

    // ============================
    // AUDIO
    // ============================

    audio.src = CONFIG.STREAM_URL;

    audio.preload = "none";

    audio.crossOrigin = "anonymous";

    // ============================
    // VOLUME
    // ============================

    const savedVolume =
        localStorage.getItem("radio_volume");

    if (savedVolume !== null) {

        audio.volume = Number(savedVolume);

        volumeSlider.value =
            Number(savedVolume) * 100;

    } else {

        audio.volume = 1;

    }

    // ============================
    // STATUS
    // ============================

    let reconnectTimer = null;

    let playing = false;

    function setOffline() {

        liveText.textContent = "OFFLINE";

        liveDot.style.background = "#808080";

    }

    function setConnecting() {

        loading.style.display = "block";

        liveText.textContent = "CONNECTING";

        liveDot.style.background = "#facc15";

    }

    function setOnline() {

        loading.style.display = "none";

        liveText.textContent = "LIVE";

        liveDot.style.background = "#22c55e";

    }
    // ============================
    // PLAY
    // ============================

    async function startPlayer() {

        try {

            setConnecting();

            await audio.play();

        }

        catch (error) {

            console.error(error);

            loading.style.display = "none";

            setOffline();

            playButton.textContent = "▶ PLAY";

            playing = false;

        }

    }

    // ============================
    // PAUSE
    // ============================

    function stopPlayer() {

        audio.pause();

        playButton.textContent = "▶ PLAY";

        loading.style.display = "none";

        setOffline();

        playing = false;

    }

    // ============================
    // PLAY BUTTON
    // ============================

    playButton.addEventListener("click", async function () {

        if (!playing) {

            playing = true;

            playButton.textContent = "❚❚ PAUSE";

            await startPlayer();

        } else {

            stopPlayer();

        }

    });

    // ============================
    // VOLUME
    // ============================

    volumeSlider.addEventListener("input", function () {

        const volume = this.value / 100;

        audio.volume = volume;

        localStorage.setItem(
            "radio_volume",
            volume
        );

    });

    // ============================
    // AUDIO EVENTS
    // ============================

    audio.addEventListener("playing", function () {

        setOnline();

    });

    audio.addEventListener("waiting", function () {

        setConnecting();

    });

    audio.addEventListener("stalled", function () {

        setConnecting();

    });

    audio.addEventListener("loadstart", function () {

        setConnecting();

    });

    audio.addEventListener("pause", function () {

        if (!audio.ended) {

            setOffline();

        }

    });

    audio.addEventListener("ended", function () {

        if (playing) {

            reconnect();

        }

    });

    audio.addEventListener("error", function () {

        reconnect();

    });

    // ============================
    // AUTO RECONNECT
    // ============================

    function reconnect() {

        if (!playing) {

            return;

        }

        clearTimeout(reconnectTimer);

        setConnecting();

        reconnectTimer = setTimeout(async function () {

            audio.load();

            await startPlayer();

        }, 5000);

    }

    // ============================
    // LOGOUT
    // ============================

    logoutButton.addEventListener("click", function () {

        stopPlayer();

        logout();

    });

    // ============================
    // REFRESH SESSION
    // ============================

    setInterval(function () {

        refreshSession();

    }, 60000);
        // ============================
    // ANTI BACK
    // ============================

    history.pushState(null, null, location.href);

    window.addEventListener("popstate", function () {

        history.pushState(null, null, location.href);

    });

    // ============================
    // PAGE HIDDEN
    // ============================

    document.addEventListener("visibilitychange", function () {

        if (document.visibilityState === "visible") {

            if (isLoggedIn()) {

                refreshSession();

            }

        }

    });

    // ============================
    // BEFORE UNLOAD
    // ============================

    window.addEventListener("beforeunload", function () {

        clearTimeout(reconnectTimer);

    });

    // ============================
    // INITIALIZE
    // ============================

    setOffline();

    loading.style.display = "none";

});
