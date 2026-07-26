/**
 * ============================================================================
 * NGAOS PLATFORM UI
 * ----------------------------------------------------------------------------
 * File        : loading.js
 * Folder      : /js/ui
 * Version     : 1.0.0
 * Author      : Fadil Ahmad & ChatGPT
 *
 * Description
 * ----------------------------------------------------------------------------
 * Global Loading Overlay Manager.
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


    let overlay = null;



    function create(){


        if(overlay){

            return;

        }



        overlay =
            document.createElement(
                "div"
            );


        overlay.className =
            "npc-loading-overlay";


        overlay.innerHTML = `

            <div class="npc-loading-box">

                <div class="npc-spinner"></div>

                <div class="npc-loading-text">
                    Memuat...
                </div>

            </div>

        `;



        document.body.appendChild(
            overlay
        );


    }



    function show(message="Memuat..."){


        create();



        const text =
            overlay.querySelector(
                ".npc-loading-text"
            );


        if(text){

            text.textContent =
                message;

        }



        overlay.classList.add(
            "active"
        );



        NPC.Core.Events?.emit(
            "loading.show",
            message
        );


    }



    function hide(){


        if(!overlay){

            return;

        }



        overlay.classList.remove(
            "active"
        );



        NPC.Core.Events?.emit(
            "loading.hide"
        );


    }



    const Loading = {


        show,


        hide,


        visible(){


            return (
                overlay &&
                overlay.classList.contains(
                    "active"
                )
            );


        }


    };



    Object.freeze(Loading);



    NPC.UI.Loading =
        Loading;



})(window.NPC);
