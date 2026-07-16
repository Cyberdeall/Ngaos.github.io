// =========================================================================
// 🔒 SISTEM PENGAMAN MANDIRI (ANTI-BYPASS & PROTEKSI SESI)
// =========================================================================
function validasiKeamananHalaman() {
    // Membaca kunci token sesi dinamis dari CONFIG bawaan Anda (radio_session)
    const tokenSesi = localStorage.getItem(CONFIG.SESSION_KEY);
    
    // Jika token kosong (user belum login / mencoba ketik url langsung), tendang ke index.html
    if (!tokenSesi) {
        window.location.href = CONFIG.LOGIN_PAGE;
    }
}
// Langsung eksekusi proteksi di detik pertama halaman dimuat sebelum memuat audio
validasiKeamananHalaman();


// =========================================================================
// 📻 LOGIKA UTAMA AUDIO STREAMING (ARENASTREAMING)
// =========================================================================
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

    // Memutus cache browser dengan parameter acak unik (?cb=) agar audio tidak delay
    audio = new Audio(STREAM_URL + "?cb=" + Date.now());
    
    audio.play().then(() => {
        isPlaying = true;
        statusIndicator.innerText = "🔴 LIVE STREAMING";
        statusIndicator.className = "status-text text-live";
        playIcon.className = "fas fa-pause"; 
        radioCover.style.animationPlayState = "running"; 
        startTimer();
    }).catch(err => {
        console.error("Gagal menjangkau server ArenaStreaming:", err);
        statusIndicator.innerText = "Gagal terhubung ke server.";
        statusIndicator.className = "status-text text-muted";
        playIcon.className = "fas fa-play";
    });
}

function stopStreaming() {
    if (audio) {
        audio.pause();
        audio.src = "";
        audio.load(); // Memutus total sedotan data internet
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


// =========================================================================
// 🚪 PERBAIKAN TOTAL FUNGSI LOGOUT (PASTI BERFUNGSI)
// =========================================================================
function logout() {
    // 1. Matikan aliran suara radio terlebih dahulu
    stopStreaming(); 
    
    // 2. Hapus token login (radio_session) secara paksa dari penyimpanan lokal browser
    localStorage.removeItem(CONFIG.SESSION_KEY);
    
    // 3. Bersihkan juga sisa cookie / session storage cadangan jika ada
    sessionStorage.clear();
    
    // 4. Lemparkan kembali ke halaman masuk utama (index.html)
    window.location.href = CONFIG.LOGIN_PAGE; 
}
