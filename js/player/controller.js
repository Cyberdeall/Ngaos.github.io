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
 * Menjadi penghubung event player dengan UI.
 * Tidak mengontrol audio secara langsung.
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



    class PlayerController {



        constructor(){


            this.bind();


        }





        bind(){


            if(
                !NPC.Core.Events
            ){

                return;

            }



            NPC.Core.Events.on(

                "player.playing",

                ()=>{

                    this.emitUI(
                        "playing"
                    );

                }

            );



            NPC.Core.Events.on(

                "player.paused",

                ()=>{

                    this.emitUI(
                        "paused"
                    );

                }

            );



            NPC.Core.Events.on(

                "player.stopped",

                ()=>{

                    this.emitUI(
                        "stopped"
                    );

                }

            );



            NPC.Core.Events.on(

                "player.error",

                (error)=>{

                    this.emitUI(
                        "error",
                        error
                    );

                }

            );



            NPC.Core.Events.on(

                "player.metadata.updated",

                (data)=>{

                    this.emitUI(
                        "metadata",
                        data
                    );

                }

            );


        }





        emitUI(event,data=null){


            NPC.Core.Events.emit(

                "ui.player." + event,

                data

            );


        }





        play(){


            NPC.Player.Engine.play();


        }





        pause(){


            NPC.Player.Engine.pause();


        }





        stop(){


            NPC.Player.Engine.stop();


        }





    }





    NPC.Player.Controller =

        new PlayerController();



})(window.NPC);
