/**
 * ============================================================================
 * NGAOS PLATFORM UI
 * ----------------------------------------------------------------------------
 * File        : toast.js
 * Folder      : /js/ui
 * Version     : 1.0.0
 *
 * Description
 * ----------------------------------------------------------------------------
 * Notification Toast System.
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



    const Toast = {



        container:null,



        init(){


            if(
                Toast.container
            ){

                return;

            }



            const div =
            document.createElement(
                "div"
            );



            div.id =
            "npcToastContainer";



            div.className =
            "npc-toast-container";



            document.body
            .appendChild(div);



            Toast.container =
            div;


        },





        show(
            message,
            type="info",
            duration=3000
        ){


            Toast.init();



            const item =
            document.createElement(
                "div"
            );



            item.className =
            "npc-toast npc-toast-"+type;



            item.textContent =
            message;



            Toast.container
            .appendChild(item);



            setTimeout(()=>{


                item.classList.add(
                    "hide"
                );



                setTimeout(()=>{


                    item.remove();


                },300);



            },duration);



        },





        success(message){


            Toast.show(
                message,
                "success"
            );


        },





        error(message){


            Toast.show(
                message,
                "error"
            );


        },





        info(message){


            Toast.show(
                message,
                "info"
            );


        }



    };



    NPC.UI.Toast =
        Toast;



})(window.NPC);
