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
 * Main Player Controller.
 *
 * Interface utama aplikasi untuk audio streaming.
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



    let currentSource = null;



    const Player = {



        async init(){


            NPC.Core.Events?.emit(
                "player.init"
            );


            return true;


        },





        load(url){


            if(!url){

                throw new Error(
                    "Stream URL kosong."
                );

            }



            currentSource =
                url;



            return NPC.Player.Engine
            .load(url);


        },





        async play(){


            return await NPC.Player.Engine
            .play();


        },





        pause(){


            return NPC.Player.Engine
            .pause();


        },





        stop(){


            return NPC.Player.Engine
            .stop();


        },





        toggle(){


            if(
                NPC.Player.Engine.playing()
            ){

                return this.pause();

            }



            return this.play();


        },





        volume(value){


            if(
                NPC.Player.Volume &&
                typeof NPC.Player.Volume === "object"
            ){

                return NPC.Player.Volume
                .set(value);

            }



            return NPC.Player.Engine
            .volume(value);


        },





        mute(){


            if(
                NPC.Player.Volume
            ){

                return NPC.Player.Volume
                .mute();

            }



            return NPC.Player.Engine
            .muted(true);


        },





        unmute(){


            if(
                NPC.Player.Volume
            ){

                return NPC.Player.Volume
                .unmute();

            }



            return NPC.Player.Engine
            .muted(false);


        },





        source(){


            return currentSource;


        },





        metadata(){


            return NPC.Player.Metadata
            ?.get();


        },





        statistics(){


            return NPC.Player.Statistics
            ?.get();


        },





        sleep(minutes){


            return NPC.Player.Sleep
            ?.start(minutes);


        },





        reconnect(){


            return NPC.Player.Reconnect
            ?.schedule();


        },





        isPlaying(){


            return NPC.Player.Engine
            ?.playing();


        }



    };



    Object.freeze(
        Player
    );



    NPC.Player =
    Object.assign(
        NPC.Player,
        Player
    );



})(window.NPC);
