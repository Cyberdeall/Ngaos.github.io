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
    playIcon.className = "fas fa-spinner fa-spin"; // Efek loading berputar saat menyambungkan

    // Memutus cache browser dengan penanda waktu unik (?cb=) agar siaran tidak tertinggal / delay
    audio = new Audio(STREAM_URL + "?cb=" + Date.now());
    
    audio.play().then(() => {
        isPlaying = true;
        statusIndicator.innerText = "🔴 LIVE STREAMING";
        statusIndicator.className = "status-text text-live";
        playIcon.className = "fas fa-pause"; // Mengubah ikon tombol menjadi Pause
        radioCover.style.animationPlayState = "running"; // Gambar sampul mulai berputar
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
        audio.load(); // Memutuskan koneksi server seutuhnya agar hemat kuota internet pengguna
        audio = null;
    }
    isPlaying = false;
    statusIndicator.innerText = "Siaran Dihentikan";
    statusIndicator.className = "status-text text-muted";
    playIcon.className = "fas fa-play"; // Mengubah kembali ikon tombol menjadi Play
    radioCover.style.animationPlayState = "paused"; // Menghentikan putaran gambar
    stopTimer();
}

// Menghitung Lama Durasi Pendengar Mendengarkan Radio
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

// Fungsi tombol untuk keluar dari sistem player radio
function logout() {
    // Otomatis kembali ke halaman login utama (index.html)
    window.location.href = "login.html"; 
}
