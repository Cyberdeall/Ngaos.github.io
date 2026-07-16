// =========================================================================
// USERS.JS - Basis Data Banyak Pengguna Terenkripsi SHA-256 Hash
// =========================================================================
const USER_DATA = Object.freeze({
    // Daftar semua pengguna yang diizinkan masuk ke sistem radio
    DAFTAR_USER: [
        {
            USERNAME: "PPTAALFALAH", // Akun Utama Anda
            PASSWORD_HASH: "cc2cc8e2501a4fbda1a1f9e2b173523fc6c39b6f376cfb940026b91176b6b772"
        },
        {
            USERNAME: "SANTRI_PLOSO", // Contoh User Tambahan 1 (Password: santri2026)
            PASSWORD_HASH: "85a1cfd547f8b91a79f53e6b2f6ef3294ee5da03b41e330be1e7f093f6684b5c"
        },
        {
            USERNAME: "ALUMNI_PLOSO", // Contoh User Tambahan 2 (Password: alumni123)
            PASSWORD_HASH: "3dc37fb646294d1f67f03c004fe9a42f618b76c8c49509df63283f3e1b3d64b1"
        }
        // Hubungi saya jika Anda ingin menambah baris user baru lagi di sini
    ]
});
