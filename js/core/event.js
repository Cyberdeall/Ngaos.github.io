/**
 * ============================================================================
 * NGAOS PLATFORM CORE
 * ----------------------------------------------------------------------------
 * File        : events.js
 * Folder      : /js/core
 * Version     : 1.0.0
 *
 * Description
 * ----------------------------------------------------------------------------
 * Internal Application Event Bus.
 *
 * Sistem komunikasi antar modul tanpa dependency langsung.
 * ============================================================================
 */

"use strict";


(function(NPC){


    if(!NPC){

        throw new Error(
            "NPC namespace belum tersedia."
        );

    }



    NPC.Core =
    NPC.Core || {};



    const listeners = {};



    const Events = {



        /**
         * Daftar listener
         */
        on(
            event,
            callback
        ){


            if(
                typeof callback !== "function"
            ){

                return false;

            }



            if(
                !listeners[event]
            ){

                listeners[event] = [];

            }



            listeners[event]
            .push(callback);



            return true;


        },





        /**
         * Hapus listener
         */
        off(
            event,
            callback
        ){


            if(
                !listeners[event]
            ){

                return false;

            }



            listeners[event] =

                listeners[event]
                .filter(
                    fn => fn !== callback
                );



            return true;


        },





        /**
         * Kirim event
         */
        emit(
            event,
            data=null
        ){


            if(
                !listeners[event]
            ){

                return false;

            }



            listeners[event]
            .forEach(
                callback => {


                    try{


                        callback(data);


                    }
                    catch(error){


                        console.error(
                            "[NPC Event Error]",
                            error
                        );


                    }


                }
            );



            return true;


        },





        /**
         * Hapus semua event
         */
        clear(){


            Object.keys(
                listeners
            )
            .forEach(
                key=>{

                    delete listeners[key];

                }
            );


        }




    };



    Object.freeze(
        Events
    );



    NPC.Core.Events =
        Events;



})(window.NPC);
