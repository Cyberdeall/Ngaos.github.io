// =========================================================================
// USERS.JS - Basis Data Fleksibel Terenkripsi SHA-256 Hash
// =========================================================================
const USER_DATA = Object.freeze({
    // Tambah, kurangi, atau ubah status AKTIF/NONAKTIF sesuka Anda di bawah ini
    DAFTAR_USER: [
        {
            USERNAME: "AFS",
            PASSWORD_HASH: "854d19cf6ced5bc4b7833ce07be41878d7e31cadefd9639c1c18575fb0372a98", // apabila status tidak aktif tuliskan "NONAKTIF"
            STATUS: "AKTIF" // Akun ini bisa digunakan untuk login
        },
        {
            USERNAME: "PPTA",
            PASSWORD_HASH: "a0864e3ebd760eea3c1c4a60d232f47d3294f6978bcc6ac8b8dc89f4394de793", // 
            STATUS: "NONAKTIF" // Akun ini dikunci/dinonaktifkan (Otomatis ditolak saat login)
        }
        // Silakan tambah baris baru di bawah ini menggunakan kode hijau dari generator.html. jangan lupa tanda koma setelah kurung kurawal apabila masih ada user di bawahnya.
    ]
});
