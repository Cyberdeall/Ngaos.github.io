/**
 * ============================================================================
 * NGAOS PLATFORM UI
 * ----------------------------------------------------------------------------
 * File        : modal.js
 * Folder      : /js/ui
 * Version     : 1.0.0
 * Author      : Fadil Ahmad & ChatGPT
 *
 * Description
 * ----------------------------------------------------------------------------
 * Universal Modal Manager.
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
            "npc-modal-overlay";


        overlay.innerHTML = `

            <div class="npc-modal">

                <div class="npc-modal-header">

                    <h3 class="npc-modal-title"></h3>

                    <button class="npc-modal-close">
                        ×
                    </button>

                </div>


                <div class="npc-modal-body"></div>


                <div class="npc-modal-footer"></div>


            </div>

        `;



        document.body.appendChild(
            overlay
        );



        overlay
        .querySelector(
            ".npc-modal-close"
        )
        .onclick =
        close;


    }



    function open(options={}){


        create();



        const title =
            overlay.querySelector(
                ".npc-modal-title"
            );


        const body =
            overlay.querySelector(
                ".npc-modal-body"
            );


        const footer =
            overlay.querySelector(
                ".npc-modal-footer"
            );



        title.textContent =
            options.title || "";



        body.innerHTML =
            options.content || "";



        footer.innerHTML =
            options.footer || "";



        overlay.classList.add(
            "active"
        );


    }



    function close(){


        if(overlay){

            overlay.classList.remove(
                "active"
            );

        }


    }



    const Modal = {


        open,


        close,



        alert(message,title="Informasi"){


            open({

                title,

                content:
                `<p>${message}</p>`,

                footer:
                `
                <button
                class="npc-modal-ok">
                OK
                </button>
                `

            });



            overlay
            .querySelector(
                ".npc-modal-ok"
            )
            ?.addEventListener(
                "click",
                close
            );


        },


        confirm(
            message,
            onConfirm,
            title="Konfirmasi"
        ){


            open({

                title,

                content:
                `<p>${message}</p>`,

                footer:
                `
                <button
                class="npc-modal-cancel">
                Batal
                </button>

                <button
                class="npc-modal-confirm">
                Ya
                </button>
                `

            });



            overlay
            .querySelector(
                ".npc-modal-cancel"
            )
            ?.addEventListener(
                "click",
                close
            );



            overlay
            .querySelector(
                ".npc-modal-confirm"
            )
            ?.addEventListener(
                "click",
                ()=>{

                    close();

                    if(onConfirm){

                        onConfirm();

                    }

                }
            );


        }


    };



    Object.freeze(Modal);



    NPC.UI.Modal =
        Modal;



})(window.NPC);
