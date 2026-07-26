/**
 * ============================================================================
 * NGAOS PLATFORM PLAYER
 * ----------------------------------------------------------------------------
 * File        : adapter.js
 * Folder      : /js/player
 * Version     : 1.0.0
 *
 * Description
 * ----------------------------------------------------------------------------
 * Player Engine Adapter.
 *
 * Kontrak dasar untuk engine audio.
 * ============================================================================
 */

"use strict";


(function(NPC){


    if(!NPC){

        throw new Error(
            "NPC namespace belum tersedia."
        );

    }


    NPC.Player =
        NPC.Player || {};



    const Adapter = {



        name:
        "none",



        load(){

            throw new Error(
                "Player engine belum dipasang."
            );

        },



        async play(){

            throw new Error(
                "Player engine belum dipasang."
            );

        },



        pause(){

            throw new Error(
                "Player engine belum dipasang."
            );

        },



        stop(){

            throw new Error(
                "Player engine belum dipasang."
            );

        },



        volume(){

            return 1;

        },



        source(){

            return null;

        }



    };



    NPC.Player.Adapter =
        Adapter;



})(window.NPC);
