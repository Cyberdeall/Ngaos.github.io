/**
 * ============================================================================
 * NGAOS PLATFORM PLAYER
 * ----------------------------------------------------------------------------
 * File        : player.js
 * Folder      : /js/player
 * Version     : 1.0.0
 *
 * Description
 * ----------------------------------------------------------------------------
 * Public Player Interface.
 *
 * Semua aplikasi menggunakan file ini.
 * Modul internal tidak dipanggil langsung dari luar.
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



    const Player = {



        /**
         * Load stream
         */
        load(url){


            return NPC.Player.Engine
            .load(url);


        },





        /**
         * Play
         */
        async play(){


            return await NPC.Player.Engine
            .play();


        },





        /**
         * Pause
         */
        pause(){


            return NPC.Player.Engine
            .pause();


        },





        /**
         * Stop
         */
        stop(){


            return NPC.Player.Engine
            .stop();


        },





        /**
         * Volume
         */
        volume(value){


            if(
                value === undefined
            ){

                return NPC.Player.Engine
                .volume();

            }



            return NPC.Player.Engine
            .volume(value);


        },





        /**
         * Mute
         */
        mute(status=true){


            return NPC.Player.Engine
            .muted(status);


        },





        /**
         * Metadata
         */
        metadata(){


            return NPC.Player.Metadata
            .get();


        },





        /**
         * Sleep timer
         */
        sleep(minutes){


            return NPC.Player.Sleep
            .start(minutes);


        },





        /**
         * Cancel sleep
         */
        cancelSleep(){


            return NPC.Player.Sleep
            .stop();


        },





        /**
         * Statistics
         */
        statistics(){


            return NPC.Player.Statistics
            .get();


        },





        /**
         * Current source
         */
        source(){


            return NPC.Player.Engine
            .getSource();


        },





        /**
         * Playing status
         */
        isPlaying(){


            return NPC.Player.Engine
            .playing();


        }



    };



    Object.freeze(
        Player
    );



    NPC.Player.API =
        Player;



})(window.NPC);
