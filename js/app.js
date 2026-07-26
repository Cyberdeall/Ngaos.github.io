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
                 * Set bahasa default
                 */

                if(
                    NPC.Locale &&
                    NPC.I18n
                ){

                    NPC.I18n.setLanguage(
                        "id"
                    );

                }



                /*
                 * Initialize Authentication
                 */

                if(
                    NPC.Auth &&
                    NPC.Auth.init
                ){

                    await NPC.Auth.init();

                }



                /*
                 * Application Ready
                 */

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



                NPC.UI.Toast?.error(
                    NPC.I18n?.t(
                        "system.error"
                    )
                );


            }


        },





        isReady(){


            return App.ready;


        }



    };



    Object.freeze(App);



    NPC.App =
        App;



    /*
     * Jalankan setelah halaman siap
     */

    window.addEventListener(
        "DOMContentLoaded",
        ()=>{

            App.init();

        }
    );



})(window.NPC);
