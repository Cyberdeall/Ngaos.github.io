/**
 * ============================================================================
 * NGAOS PLATFORM CORE (NPC)
 * ----------------------------------------------------------------------------
 * File        : kernel.js
 * Folder      : /js/core
 * Version     : 1.0.0
 * Author      : Fadil Ahmad & ChatGPT
 * License     : Private
 *
 * Description
 * ----------------------------------------------------------------------------
 * Main Application Kernel.
 *
 * Mengatur lifecycle utama aplikasi.
 * ============================================================================
 */

"use strict";

(function (NPC) {


    if (!NPC) {

        throw new Error(
            "NPC namespace belum tersedia."
        );

    }



    const Kernel = {


        state: "created",



        modules: [],



        /**
         * Register module
         */
        register(name) {


            if (
                !Kernel.modules.includes(name)
            ) {

                Kernel.modules.push(name);

            }


        },



        /**
         * Start Core
         */
        async boot() {


            if (
                Kernel.state !== "created"
            ) {

                return false;

            }



            Kernel.state =
                "booting";



            NPC.Core.Logger?.info(
                "NPC Kernel mulai"
            );



            try {



                Kernel.register(
                    "utils"
                );


                Kernel.register(
                    "events"
                );


                Kernel.register(
                    "logger"
                );


                Kernel.register(
                    "storage"
                );


                Kernel.register(
                    "network"
                );


                Kernel.register(
                    "session"
                );



                Kernel.state =
                    "ready";



                NPC.Core.Events?.emit(
                    NPC.Constants.EVENTS.APP_READY,
                    {
                        modules:
                        Kernel.modules
                    }
                );



                NPC.Core.Logger?.info(
                    "NPC Core siap",
                    Kernel.modules
                );



                return true;



            } catch(error) {



                Kernel.state =
                    "error";



                NPC.Core.Logger?.error(
                    "NPC Kernel gagal",
                    error
                );



                NPC.Core.Events?.emit(
                    NPC.Constants.EVENTS.APP_ERROR,
                    error
                );



                return false;


            }


        },



        /**
         * Mendapat status
         */
        status() {


            return {

                state:
                Kernel.state,


                modules:
                [...Kernel.modules]

            };


        },



        /**
         * Shutdown
         */
        shutdown() {


            Kernel.state =
                "stopped";



            NPC.Core.Events?.clear();



            NPC.Core.Logger?.info(
                "NPC Kernel berhenti"
            );


        }


    };



    Object.freeze(Kernel);



    NPC.Core.Kernel =
        Kernel;



})(window.NPC);
