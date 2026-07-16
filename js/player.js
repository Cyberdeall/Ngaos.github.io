// Membaca STREAM_URL secara dinamis dari CONFIG di file js/config.js Anda
const STREAM_URL = CONFIG.STREAM_URL;

let audio = null;
let isPlaying = false;
let timerInterval = null;
let secondsElapsed = 0;

const playBtn = document.getElementById("playBtn");
const playIcon = document.getElementById("playIcon");
const statusIndicator = document.getElementById("statusIndicator");
const radioCover = document.getElementById("radioCover");
const streamTime = document.getElementById("streamTime");

function toggleRadio() {
    if (!isPlaying) {
        startStreaming();
    } else {
        stopStreaming();
    }
}

function startStreaming() {
    statusIndicator.innerText = "Menghubungkan...";
    statusIndicator.className = "status-text text-connecting";
    playIcon.className = "fas fa-spinner fa-spin"; 

    // Memutus cache browser dengan penanda waktu unik (?cb=) agar siaran tidak tertinggal / delay
    audio = new Audio(STREAM_URL + "?cb=" + Date.now());
    
    audio.play().then(() => {
        isPlaying = true;
        statusIndicator.innerText = "🔴 LIVE STREAMING";
        statusIndicator.className = "status-text text-live";
        playIcon.className = "fas fa-pause"; 
        radioCover.style.animationPlayState = "running"; 
        startTimer();
    }).catch(err => {
        console.error("Gagal memutar siaran radio:", err);
        statusIndicator.innerText = "Gagal terhubung ke server.";
        statusIndicator.className = "status-text text-muted";
        playIcon.className = "fas fa-play";
    });
}

function stopStreaming() {
    if (audio) {
        audio.pause();
        audio.src = "";
        audio.load(); 
        audio = null;
    }
    isPlaying = false;
    statusIndicator.innerText = "Siaran Dihentikan";
    statusIndicator.className = "status-text text-muted";
    playIcon.className = "fas fa-play"; 
    radioCover.style.animationPlayState = "paused"; 
    stopTimer();
}

function startTimer() {
    secondsElapsed = 0;
    timerInterval = setInterval(() => {
        secondsElapsed++;
        let mins = Math.floor(secondsElapsed / 60);
        let secs = secondsElapsed % 60;
        streamTime.innerText = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    streamTime.innerText = "0:00";
}

function logout() {
    // Menyesuaikan arah logout sesuai dengan CONFIG Anda (index.html)
    window.location.href = CONFIG.LOGIN_PAGE; 
}
