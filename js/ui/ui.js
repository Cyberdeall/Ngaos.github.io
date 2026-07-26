/**
 * ============================================================================
 * NGAOS PLATFORM UI
 * ----------------------------------------------------------------------------
 * File        : ui.js
 * Folder      : /js/ui
 * Version     : 1.0.0
 * Author      : Fadil Ahmad & ChatGPT
 *
 * Description
 * ----------------------------------------------------------------------------
 * UI Manager utama aplikasi.
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


    const UI = {


        init(){

            NPC.Core.Logger?.info(
                "UI System initialized"
            );


            NPC.Core.Events?.emit(
                "ui.ready"
            );

        },


        get(selector){

            return document.querySelector(
                selector
            );

        },


        getAll(selector){

            return [
                ...document.querySelectorAll(selector)
            ];

        },


        show(element){

            if(element){

                element.classList.remove(
                    "hidden"
                );

            }

        },


        hide(element){

            if(element){

                element.classList.add(
                    "hidden"
                );

            }

        },


        toggle(element){

            if(element){

                element.classList.toggle(
                    "hidden"
                );

            }

        }


    };


    Object.freeze(UI);


    NPC.UI.Core = UI;


})(window.NPC);
