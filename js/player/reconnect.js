/**
 * ============================================================================
 * NGAOS PLATFORM PLAYER
 * ----------------------------------------------------------------------------
 * File        : reconnect.js
 * Folder      : /js/player
 * Version     : 1.0.0
 *
 * Description
 * ----------------------------------------------------------------------------
 * Player Auto Reconnect Manager.
 *
 * Menangani percobaan koneksi ulang ketika stream terputus.
 * Tidak mengontrol UI.
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



    class ReconnectManager {



        constructor(engine){


            this.engine =
                engine;


            this.enabled =
                true;


            this.attempt =
                0;


            this.maxAttempt =
                5;


            this.timer =
                null;


            this.delay =
                [
                    3000,
                    5000,
                    10000,
                    20000,
                    30000
                ];


        }





        start(){


            this.enabled =
                true;


        }





        stop(){


            this.enabled =
                false;


            this.clear();


        }





        clear(){


            if(this.timer){


                clearTimeout(
                    this.timer
                );


                this.timer =
                    null;


            }


        }





        schedule(){


            if(
                !this.enabled
            ){

                return;

            }



            if(
                this.attempt >=
                this.maxAttempt
            ){


                NPC.Core.Events?.emit(
                    "player.reconnect.failed"
                );


                return;


            }



            const wait =
                this.delay[
                    this.attempt
                ];



            this.attempt++;



            NPC.Core.Events?.emit(
                "player.reconnect.wait",
                wait
            );



            this.timer =
                setTimeout(
                    ()=>{

                        this.reconnect();

                    },
                    wait
                );


        }





        async reconnect(){


            if(
                !this.engine
            ){

                return;

            }



            const source =
                this.engine.getSource();



            if(!source){

                return;

            }



            try{


                this.engine.load(
                    source
                );


                await this.engine.play();



                this.attempt =
                    0;



                NPC.Core.Events?.emit(
                    "player.reconnect.success"
                );


            }
            catch(error){


                NPC.Core.Events?.emit(
                    "player.reconnect.error",
                    error
                );


                this.schedule();


            }


        }





        reset(){


            this.attempt =
                0;


            this.clear();


        }



    }





    NPC.Player.Reconnect =
        ReconnectManager;



})(window.NPC);
