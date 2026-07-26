/**
 * ============================================================================
 * NGAOS PLATFORM CONSTANTS
 * ----------------------------------------------------------------------------
 * File        : constants.js
 * Folder      : /js
 * Version     : 1.0.0
 *
 * Description
 * ----------------------------------------------------------------------------
 * Global immutable constants.
 * ============================================================================
 */

"use strict";


window.NPC =
window.NPC || {};



NPC.Constants = {



    Events:{


        AUTH_LOGIN:
        "auth.login",


        AUTH_LOGOUT:
        "auth.logout",


        AUTH_ERROR:
        "auth.error",


        LANGUAGE_CHANGED:
        "language.changed",


        LOADING_SHOW:
        "loading.show",


        LOADING_HIDE:
        "loading.hide"


    },



    Storage:{


        SESSION:
        "npc_session",


        LANGUAGE:
        "npc_language",


        SETTINGS:
        "npc_settings"


    },



    Roles:{


        USER:
        "user",


        ADMIN:
        "admin",


        SUPER_ADMIN:
        "super_admin"


    },



    Status:{


        ACTIVE:
        "active",


        INACTIVE:
        "inactive",


        PENDING:
        "pending",


        BLOCKED:
        "blocked"


    },



    Routes:{


        HOME:
        "/",


        LOGIN:
        "/index.html",


        PLAYER:
        "/player.html",


        DASHBOARD:
        "/dashboard.html"


    },



    Providers:{


        CLERK:
        "clerk",


        CUSTOM:
        "custom",


        NONE:
        "none"


    }



};



Object.freeze(
    NPC.Constants
);
