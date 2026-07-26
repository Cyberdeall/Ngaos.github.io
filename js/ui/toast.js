/**
 * ============================================================================
 * NGAOS PLATFORM UI
 * ----------------------------------------------------------------------------
 * File        : toast.js
 * Folder      : /js/ui
 * Version     : 1.0.0
 * Author      : Fadil Ahmad & ChatGPT
 *
 * Description
 * ----------------------------------------------------------------------------
 * Toast Notification Manager.
 * ============================================================================
 */

"use strict";


(function(NPC){


    if(!NPC){

        throw new Error(
            "NPC namespace belum tersedia."
        );

    }


    NPC.UI = NPC.UI || {};



    let container = null;



    function createContainer(){


        if(container){

            return;

        }


        container =
            document.createElement(
                "div"
            );


        container.className =
            "npc-toast-container";


        document.body.appendChild(
            container
        );


    }



    function show(
        message,
        type="info",
        duration=4000
    ){


        createContainer();



        const toast =
            document.createElement(
                "div"
            );



        toast.className =
            `npc-toast ${type}`;



        toast.textContent =
            message;



        container.appendChild(
            toast
        );



        setTimeout(()=>{


            toast.classList.add(
                "hide"
            );


            setTimeout(()=>{

                toast.remove();

            },300);



        },duration);



    }



    const Toast = {


        success(message,duration){

            show(
                message,
                "success",
                duration
            );

        },


        error(message,duration){

            show(
                message,
                "error",
                duration
            );

        },


        warning(message,duration){

            show(
                message,
                "warning",
                duration
            );

        },


        info(message,duration){

            show(
                message,
                "info",
                duration
            );

        },


        clear(){

            if(container){

                container.innerHTML="";

            }

        }


    };



    Object.freeze(Toast);



    NPC.UI.Toast =
        Toast;



})(window.NPC);
