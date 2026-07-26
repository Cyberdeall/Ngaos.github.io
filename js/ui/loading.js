/**
 * ============================================================================
 * NGAOS PLATFORM UI
 * ----------------------------------------------------------------------------
 * File        : loading.js
 * Folder      : /js/ui
 * Version     : 1.0.0
 *
 * Description
 * ----------------------------------------------------------------------------
 * Loading State Controller.
 *
 * Mengelola status loading tombol dan proses aplikasi.
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



    const Loading = {



        activeCount:0,



        show(target){


            if(
                typeof target === "string"
            ){

                target =
                document.querySelector(
                    target
                );

            }



            if(!target){

                return false;

            }



            Loading.activeCount++;



            target.disabled =
            true;



            target.classList
            .add("loading");



            const text =
            target.querySelector(
                ".btn-text"
            );



            const loader =
            target.querySelector(
                ".btn-loader"
            );



            if(text){

                text.classList
                .add("hidden");

            }



            if(loader){

                loader.classList
                .remove("hidden");

            }



            return true;


        },





        hide(target){


            if(
                typeof target === "string"
            ){

                target =
                document.querySelector(
                    target
                );

            }



            if(!target){

                return false;

            }



            Loading.activeCount =
            Math.max(
                0,
                Loading.activeCount - 1
            );



            target.disabled =
            false;



            target.classList
            .remove("loading");



            const text =
            target.querySelector(
                ".btn-text"
            );



            const loader =
            target.querySelector(
                ".btn-loader"
            );



            if(text){

                text.classList
                .remove("hidden");

            }



            if(loader){

                loader.classList
                .add("hidden");

            }



            return true;


        },





        isLoading(){


            return (
                Loading.activeCount > 0
            );


        }



    };



    Object.freeze(
        Loading
    );



    NPC.UI.Loading =
        Loading;



})(window.NPC);
