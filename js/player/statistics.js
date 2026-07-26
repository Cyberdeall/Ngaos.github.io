/**
 * ============================================================================
 * NGAOS PLATFORM PLAYER
 * ----------------------------------------------------------------------------
 * File        : statistics.js
 * Folder      : /js/player
 * Version     : 1.0.0
 *
 * Description
 * ----------------------------------------------------------------------------
 * Player Statistics Manager.
 *
 * Menghitung statistik penggunaan player.
 * Tidak menyimpan database.
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



    class StatisticsManager {



        constructor(){


            this.reset();


            this.bind();



        }





        bind(){


            NPC.Core.Events?.on(

                "player.playing",

                ()=>{

                    this.data.play++;

                }

            );



            NPC.Core.Events?.on(

                "player.paused",

                ()=>{

                    this.data.pause++;

                }

            );



            NPC.Core.Events?.on(

                "player.stopped",

                ()=>{

                    this.data.stop++;

                }

            );



            NPC.Core.Events?.on(

                "player.error",

                ()=>{

                    this.data.error++;

                }

            );



            NPC.Core.Events?.on(

                "player.reconnect.success",

                ()=>{

                    this.data.reconnect++;

                }

            );



            NPC.Core.Events?.on(

                "player.metadata.updated",

                ()=>{

                    this.data.metadata++;

                }

            );


        }





        reset(){


            this.data = {


                play:0,


                pause:0,


                stop:0,


                error:0,


                reconnect:0,


                metadata:0,


                started:
                    Date.now()


            };


        }





        get(){


            return {

                ...this.data

            };


        }





        listeningTime(){


            return (

                Date.now()
                -
                this.data.started

            );


        }



    }





    NPC.Player.Statistics =
        StatisticsManager;



})(window.NPC);
