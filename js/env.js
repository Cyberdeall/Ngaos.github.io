/**
 * ============================================================================
 * NGAOS PLATFORM ENVIRONMENT
 * ----------------------------------------------------------------------------
 * File        : env.js
 * Folder      : /js
 * Version     : 1.0.0
 *
 * Description
 * ----------------------------------------------------------------------------
 * Environment configuration layer.
 *
 * Tempat konfigurasi yang berubah saat deployment.
 * ============================================================================
 */

"use strict";


window.NPC =
window.NPC || {};



NPC.Env = {


    mode:

    "production",



    debug:

    false,



    auth:{


        provider:

        "clerk",


        clerk:{


            publishableKey:

            ""


        }


    },



    server:{


        apiUrl:

        "",


        websocketUrl:

        ""


    },



    radio:{


        provider:

        "listen2myradio",


        streamUrl:

        ""

    }



};
