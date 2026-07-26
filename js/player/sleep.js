/**
 * ============================================================================
 * NGAOS PLATFORM PLAYER
 * ----------------------------------------------------------------------------
 * File        : sleep.js
 * Folder      : /js/player
 * Version     : 1.0.0
 *
 * Description
 * ----------------------------------------------------------------------------
 * Sleep Timer Manager.
 *
 * Mengatur penghentian otomatis player setelah waktu tertentu.
 * Tidak mengontrol UI secara langsung.
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



    class SleepTimer {



        constructor(){


            this.timer =
                null;


            this.remaining =
                0;


            this.active =
                false;


        }





        start(minutes){


            this.stop();



            minutes =
                Number(minutes);



            if(
                !Number.isFinite(minutes) ||
                minutes <= 0
            ){

                return false;

            }



            this.remaining =
                minutes * 60;



            this.active =
                true;



            this.timer =
                setInterval(()=>{


                    this.remaining--;



                    NPC.Core.Events?.emit(
                        "player.sleep.tick",
                        this.remaining
                    );



                    if(
                        this.remaining <= 0
                    ){

                        this.finish();

                    }



                },1000);




            NPC.Core.Events?.emit(
                "player.sleep.started",
                {
                    minutes
                }
            );



            return true;


        }





        finish(){


            this.stop();



            NPC.Core.Events?.emit(
                "player.sleep.finished"
            );


        }





        stop(){


            if(this.timer){


                clearInterval(
                    this.timer
                );


                this.timer =
                    null;


            }



            this.remaining =
                0;



            this.active =
                false;



        }





        isActive(){


            return this.active;


        }





        getRemaining(){


            return this.remaining;


        }



    }





    NPC.Player.Sleep =
        SleepTimer;



})(window.NPC);
