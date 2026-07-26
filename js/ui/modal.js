/**
 * ============================================================================
 * NGAOS PLATFORM UI
 * ----------------------------------------------------------------------------
 * File        : modal.js
 * Folder      : /js/ui
 * Version     : 1.0.0
 *
 * Description
 * ----------------------------------------------------------------------------
 * Modal Controller.
 *
 * Mengontrol modal aplikasi tanpa bergantung pada halaman tertentu.
 * ============================================================================
 */

"use strict";


(function(NPC){


    if(!NPC){

        throw new Error(
            "NPC namespace belum tersedia."
        );

    }



    NPC.UI =
    NPC.UI || {};



    const Modal = {



        get(id){


            return document.getElementById(
                id
            );


        },





        open(id){


            const modal =
            Modal.get(id);



            if(!modal){

                console.warn(
                    "Modal tidak ditemukan:",
                    id
                );

                return false;

            }



            modal.classList
            .remove("hidden");



            modal.setAttribute(
                "aria-hidden",
                "false"
            );



            return true;


        },





        close(id){


            const modal =
            Modal.get(id);



            if(!modal){

                return false;

            }



            modal.classList
            .add("hidden");



            modal.setAttribute(
                "aria-hidden",
                "true"
            );



            return true;


        },





        toggle(id){


            const modal =
            Modal.get(id);



            if(!modal){

                return false;

            }



            if(
                modal.classList
                .contains("hidden")
            ){

                return Modal.open(id);

            }



            return Modal.close(id);


        },





        closeAll(){


            document
            .querySelectorAll(
                ".modal-overlay"
            )
            .forEach(
                modal=>{

                    modal.classList
                    .add("hidden");

                }
            );


        }



    };



    Object.freeze(
        Modal
    );



    NPC.UI.Modal =
        Modal;



})(window.NPC);
