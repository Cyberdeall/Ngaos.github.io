/**
 * ============================================================================
 * NGAOS PLATFORM PLAYER
 * ----------------------------------------------------------------------------
 * File        : controller.js
 * Folder      : /js/player
 * Version     : 1.0.0
 *
 * Description
 * ----------------------------------------------------------------------------
 * Player Controller.
 *
 * Interface antara aplikasi dan Player API.
 * Tidak mengelola audio secara langsung.
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



    const Controller = {



        async play(){


            return await NPC.Player.API.play();


        },





        pause(){


            return NPC.Player.API.pause();


        },





        stop(){


            return NPC.Player.API.stop();


        },





        toggle(){


            if(
                NPC.Player.API.isPlaying()
            ){

                return this.pause();

            }


            return this.play();


        },





        volume(value){


            return NPC.Player.API.volume(
                value
            );


        },





        mute(){


            return NPC.Player.API.mute(
                true
            );


        },





        unmute(){


            return NPC.Player.API.mute(
                false
            );


        },





        metadata(){


            return NPC.Player.API.metadata();


        }



    };



    Object.freeze(
        Controller
    );



    NPC.Player.Controller =
        Controller;



})(window.NPC);
