/**
 * ============================================================================
 * NGAOS PLATFORM LOCALIZATION
 * ----------------------------------------------------------------------------
 * File        : translator.js
 * Folder      : /js/locales
 * Version     : 2.0.0
 *
 * Description
 * ----------------------------------------------------------------------------
 * Internationalization Manager.
 * ============================================================================
 */

"use strict";


(function(NPC){


    if(!NPC){

        throw new Error(
            "NPC namespace belum tersedia."
        );

    }



    NPC.I18n = {



        current:
        "id",



        setLanguage(lang){


            if(
                !NPC.Locales[lang]
            ){

                console.warn(
                    "Bahasa tidak tersedia:",
                    lang
                );

                return false;

            }



            NPC.I18n.current =
            lang;



            localStorage.setItem(
                "npc_language",
                lang
            );



            if(
                NPC.Core &&
                NPC.Core.Events
            ){

                NPC.Core.Events.emit(
                    "language.changed",
                    lang
                );

            }



            return true;


        },





        getLanguage(){


            return NPC.I18n.current;


        },





        t(key){


            const lang =
            NPC.I18n.current;



            const dictionary =
            NPC.Locales[lang];



            if(!dictionary){

                return key;

            }



            const parts =
            key.split(".");



            let result =
            dictionary;



            for(
                const part of parts
            ){

                result =
                result?.[part];

            }



            return result || key;


        },





        init(){


            const saved =
            localStorage.getItem(
                "npc_language"
            );



            if(saved){

                NPC.I18n.setLanguage(
                    saved
                );

            }



        }



    };



})(window.NPC);
