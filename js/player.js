// Link Streaming HTTPS Resmi dari ArenaStreaming Anda
const STREAM_URL = "https://arenastreaming.com";

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
    playIcon.className = "fas fa-spinner fa-spin"; // Mengubah icon menjadi loading berputar

    // Memutus cache dengan parameter unik agar siaran selalu aktual (anti-delay)
    audio = new Audio(STREAM_URL + "?cb=" + Date.now());
    
    audio.play().then(() => {
        isPlaying = true;
        statusIndicator.innerText = "🔴 LIVE STREAMING";
        statusIndicator.className = "status-text text-live";
        playIcon.className = "fas fa-pause"; // Mengubah icon menjadi pause
        radioCover.style.animationPlayState = "running"; // Putar lingkaran gambar
        startTimer();
    }).catch(err => {
        console.error("Gagal memutar:", err);
        statusIndicator.innerText = "Gagal terhubung ke server.";
        statusIndicator.className = "status-text text-muted";
        playIcon.className = "fas fa-play";
    });
}

function stopStreaming() {
    if (audio) {
        audio.pause();
        audio.src = "";
        audio.load(); // Putus total koneksi internet agar hemat kuota pengguna
        audio = null;
    }
    isPlaying = false;
    statusIndicator.innerText = "Siaran Dihentikan";
    statusIndicator.className = "status-text text-muted";
    playIcon.className = "fas fa-play";
    radioCover.style.animationPlayState = "paused"; // Hentikan lingkaran gambar
    stopTimer();
}

// Menghitung Durasi Mendengar Virtual
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

// Fungsi kembali ke halaman login
function logout() {
    // Sesuaikan nama file login Anda, misal index.html atau login.html
    window.location.href = "index.html"; 
}
