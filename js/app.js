/**
 * ============================================================================
 * NGAOS PLATFORM APPLICATION
 * ----------------------------------------------------------------------------
 * File        : app.js
 * Folder      : /js
 * Version     : 1.0.0
 *
 * Description
 * ----------------------------------------------------------------------------
 * Main Application Bootstrap.
 *
 * Menghidupkan seluruh modul aplikasi.
 * ============================================================================
 */

"use strict";


(function(NPC){


    if(!NPC){

        throw new Error(
            "NPC namespace belum tersedia."
        );

    }



    const App = {



        version:
        "5.0.0",



        ready:
        false,



        async init(){


            try{


                console.log(
                    "[NPC] Starting application..."
                );



                /*
                 * Authentication
                 */

                if(
                    NPC.Auth &&
                    NPC.Auth.init
                ){

                    await NPC.Auth.init();

                }




                /*
                 * Player
                 */

                if(
                    NPC.Player &&
                    NPC.Player.init
                ){

                    await NPC.Player.init();

                }




                App.ready =
                    true;



                NPC.Core.Events?.emit(
                    "app.ready"
                );



                console.log(
                    "[NPC] Application ready."
                );



            }
            catch(error){


                console.error(
                    "[NPC] Application failed:",
                    error
                );


            }


        },





        isReady(){


            return App.ready;


        }



    };



    Object.freeze(
        App
    );



    NPC.App =
        App;



    window.addEventListener(
        "DOMContentLoaded",
        ()=>{


            App.init();


        }
    );



})(window.NPC);
