/**
 * ============================================================================
 * NGAOS PLATFORM LOCALIZATION
 * ----------------------------------------------------------------------------
 * File        : en.js
 * Folder      : /js/locales
 * Version     : 1.0.0
 * Language    : English
 *
 * Description
 * ----------------------------------------------------------------------------
 * English language pack.
 * ============================================================================
 */

"use strict";


(function(NPC){


    if(!NPC){

        throw new Error(
            "NPC namespace is not available."
        );

    }


    NPC.Locale =
        NPC.Locale || {};



    const EN = {


        app_name:
        "Ngaos Al Falah Ploso",



        auth:{


            login_success:

            "Login successful. Welcome back.",


            login_failed:

            "Login failed. Please check your account information.",


            email_not_found:

            "Email is not registered. Please check your email or create a new account.",


            password_wrong:

            "The password you entered is incorrect. Please try again.",


            account_locked:

            "Your account has been temporarily locked due to too many login attempts.",


            session_expired:

            "Your session has expired. Please login again.",


            logout_success:

            "You have successfully logged out."

        },



        register:{


            success:

            "Registration successful. Please continue account verification.",


            email_used:

            "This email is already registered with another account.",


            invalid_email:

            "Invalid email format.",


            weak_password:

            "Password is too weak. Use a stronger combination."

        },



        network:{


            offline:

            "No internet connection. Please check your network.",


            timeout:

            "Connection timed out. Please try again.",


            server_error:

            "The server is currently unavailable. Please try again later."

        },



        player:{


            loading:

            "Connecting to radio stream...",


            stream_error:

            "The radio cannot be played. Please try again.",


            offline:

            "The broadcast is currently unavailable."

        },



        system:{


            loading:

            "Loading application...",


            error:

            "An error occurred. Please try again.",


            unknown:

            "Unknown error."

        }



    };



    NPC.Locale.en =
        EN;



})(window.NPC);
