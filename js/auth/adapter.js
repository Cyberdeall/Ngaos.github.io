/**
 * ============================================================================
 * NGAOS PLATFORM AUTHENTICATION
 * ----------------------------------------------------------------------------
 * File        : adapter.js
 * Folder      : /js/auth
 * Version     : 1.0.0
 *
 * Description
 * ----------------------------------------------------------------------------
 * Authentication Provider Adapter.
 *
 * Menjadi kontrak antara aplikasi dan provider auth.
 * ============================================================================
 */

"use strict";


(function(NPC){


    if(!NPC){

        throw new Error(
            "NPC namespace belum tersedia."
        );

    }


    NPC.Auth =
        NPC.Auth || {};



    const Provider = {


        name:
        "none",



        async login(){

            throw new Error(
                "Auth provider belum dipasang."
            );

        },



        async logout(){

            throw new Error(
                "Auth provider belum dipasang."
            );

        },



        async register(){

            throw new Error(
                "Auth provider belum dipasang."
            );

        },



        async user(){

            return null;

        },



        isReady(){

            return false;

        }


    };



    NPC.Auth.Provider =
        Provider;



})(window.NPC);
