/**
 * ============================================================================
 * NGAOS PLATFORM CONFIGURATION
 * ----------------------------------------------------------------------------
 * File        : config.js
 * Folder      : /js
 * Version     : 2.0.0
 *
 * Description
 * ----------------------------------------------------------------------------
 * Application configuration bridge.
 *
 * Membaca environment dan menyediakan konfigurasi
 * untuk seluruh aplikasi.
 * ============================================================================
 */

"use strict";


window.NPC =
window.NPC || {};



(function(NPC){


    if(!NPC.Env){

        throw new Error(
            "Environment belum dimuat. Pastikan env.js berada sebelum config.js"
        );

    }



    NPC.Config = {



        app:{


            name:
            "Ngaos Al Falah Ploso",


            version:
            "5.0.0",


            mode:
            NPC.Env.mode



        },



        auth:{


            provider:
            NPC.Env.auth.provider,


            clerk:
            {


                publishableKey:
                NPC.Env.auth.clerk.publishableKey


            }


        },



        server:{


            apiUrl:
            NPC.Env.server.apiUrl,


            websocketUrl:
            NPC.Env.server.websocketUrl


        },



        radio:{


            provider:
            NPC.Env.radio.provider,


            streamUrl:
            NPC.Env.radio.streamUrl,


            autoPlay:
            false


        }



    };



})(window.NPC);
