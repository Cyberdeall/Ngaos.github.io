/**
 * ============================================================================
 * NGAOS PLATFORM CONFIGURATION
 * ----------------------------------------------------------------------------
 * File        : config.js
 * Folder      : /js
 * Version     : 1.0.0
 *
 * Description
 * ----------------------------------------------------------------------------
 * Global application configuration.
 * ============================================================================
 */

"use strict";


window.NPC =
window.NPC || {};



NPC.Config = {


    app: {

        name:
        "Ngaos Al Falah Ploso",

        version:
        "5.0.0",

        environment:
        "production"


    },


    auth: {


        provider:
        "clerk",


        clerk: {

            publishableKey:
            "",

        }


    },


    radio: {


        name:
        "Ngaos Radio",


        streamUrl:
        "",


        autoPlay:
        false


    },


    api: {


        baseUrl:
        "",


    }


};
