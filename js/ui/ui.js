/**
 * ============================================================================
 * NGAOS PLATFORM UI CORE
 * ----------------------------------------------------------------------------
 * File        : ui.js
 * Folder      : /js/ui
 * Version     : 1.0.0
 *
 * Description
 * ----------------------------------------------------------------------------
 * UI Framework Core.
 *
 * Pengelola komponen antarmuka aplikasi.
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



    const UI = {



        select(selector){


            return document.querySelector(
                selector
            );


        },





        selectAll(selector){


            return document.querySelectorAll(
                selector
            );


        },





        show(element){


            if(
                typeof element === "string"
            ){

                element =
                UI.select(element);

            }



            if(element){

                element.style.display =
                "";

            }


        },





        hide(element){


            if(
                typeof element === "string"
            ){

                element =
                UI.select(element);

            }



            if(element){

                element.style.display =
                "none";

            }


        },





        addClass(
            element,
            className
        ){


            if(
                typeof element === "string"
            ){

                element =
                UI.select(element);

            }



            element?.classList
            .add(className);


        },





        removeClass(
            element,
            className
        ){


            if(
                typeof element === "string"
            ){

                element =
                UI.select(element);

            }



            element?.classList
            .remove(className);


        },





        toggleClass(
            element,
            className
        ){


            if(
                typeof element === "string"
            ){

                element =
                UI.select(element);

            }



            element?.classList
            .toggle(className);


        },





        text(
            element,
            value
        ){


            if(
                typeof element === "string"
            ){

                element =
                UI.select(element);

            }



            if(element){

                element.textContent =
                value;

            }


        }




    };



    Object.freeze(UI);



    NPC.UI.Core =
    UI;



})(window.NPC);
