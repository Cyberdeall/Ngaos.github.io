/**
 * ============================================================================
 * NGAOS PLATFORM LOCALIZATION
 * ----------------------------------------------------------------------------
 * File        : id.js
 * Folder      : /js/locales
 * Version     : 1.0.0
 * Language    : Indonesian
 *
 * Description
 * ----------------------------------------------------------------------------
 * Bahasa utama aplikasi.
 * ============================================================================
 */

"use strict";


(function(NPC){


    if(!NPC){

        throw new Error(
            "NPC namespace belum tersedia."
        );

    }


    NPC.Locale =
        NPC.Locale || {};



    const ID = {


        app_name:
        "Ngaos Al Falah Ploso",



        auth:{


            login_success:

            "Login berhasil. Selamat datang kembali.",


            login_failed:

            "Login gagal. Periksa kembali data akun Anda.",


            email_not_found:

            "Email belum terdaftar. Silakan periksa kembali email Anda atau buat akun baru.",


            password_wrong:

            "Password yang Anda masukkan salah. Silakan coba lagi.",


            account_locked:

            "Akun sementara dikunci karena terlalu banyak percobaan login.",


            session_expired:

            "Sesi Anda telah berakhir. Silakan login kembali.",


            logout_success:

            "Anda berhasil keluar dari akun."

        },



        register:{


            success:

            "Pendaftaran berhasil. Silakan lanjutkan verifikasi akun.",


            email_used:

            "Email ini sudah digunakan oleh akun lain.",


            invalid_email:

            "Format email tidak valid.",


            weak_password:

            "Password terlalu mudah. Gunakan kombinasi yang lebih aman."

        },



        network:{


            offline:

            "Tidak ada koneksi internet. Periksa jaringan Anda.",


            timeout:

            "Koneksi terlalu lama. Silakan coba kembali.",


            server_error:

            "Server sedang mengalami gangguan. Silakan coba beberapa saat lagi."

        },



        player:{


            loading:

            "Menghubungkan ke radio...",


            stream_error:

            "Radio tidak dapat diputar. Silakan coba kembali.",


            offline:

            "Siaran sedang tidak tersedia."

        },



        system:{


            loading:

            "Memuat aplikasi...",


            error:

            "Terjadi kesalahan. Silakan coba kembali.",


            unknown:

            "Kesalahan tidak diketahui."

        }



    };



    NPC.Locale.id =
        ID;



    NPC.Locale.current =
        "id";



})(window.NPC);
