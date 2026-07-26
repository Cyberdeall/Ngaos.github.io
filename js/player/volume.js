/**
 * ============================================================================
 * NGAOS PLATFORM PLAYER
 * ----------------------------------------------------------------------------
 * File        : volume.js
 * Folder      : /js/player
 * Version     : 1.0.0
 *
 * Description
 * ----------------------------------------------------------------------------
 * Player Volume Manager.
 *
 * Mengatur volume dan mute audio.
 * Tidak menangani UI.
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



    class VolumeManager {



        constructor(engine){


            this.engine =
                engine;


            this.value =
                1;


            this.muted =
                false;


        }





        set(value){


            value =
                Number(value);



            if(
                Number.isNaN(value)
            ){

                return;

            }



            this.value =
                Math.min(
                    1,
                    Math.max(
                        0,
                        value
                    )
                );



            if(this.engine){

                this.engine.volume(
                    this.value
                );

            }



            NPC.Core.Events?.emit(
                "player.volume.changed",
                this.value
            );


        }





        get(){


            return this.value;


        }





        mute(){


            this.muted =
                true;



            if(this.engine){

                this.engine.muted(
                    true
                );

            }



            NPC.Core.Events?.emit(
                "player.muted"
            );


        }





        unmute(){


            this.muted =
                false;



            if(this.engine){

                this.engine.muted(
                    false
                );

            }



            NPC.Core.Events?.emit(
                "player.unmuted"
            );


        }





        toggle(){


            if(this.muted){

                this.unmute();

            }else{

                this.mute();

            }


        }





        isMuted(){


            return this.muted;


        }



    }





    NPC.Player.Volume =
        VolumeManager;



})(window.NPC);
