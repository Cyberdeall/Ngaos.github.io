/**
 * ============================================================================
 * NGAOS PLATFORM LOCALIZATION
 * ----------------------------------------------------------------------------
 * File        : translator.js
 * Folder      : /js/locales
 * Version     : 1.0.0
 * Author      : Fadil Ahmad & ChatGPT
 *
 * Description
 * ----------------------------------------------------------------------------
 * Internationalization Engine.
 * ============================================================================
 */

"use strict";


(function(NPC){


    if(!NPC){

        throw new Error(
            "NPC namespace belum tersedia."
        );

    }


    NPC.I18n =
        NPC.I18n || {};



    const I18n = {


        language:
        "id",



        /**
         * Mengambil teks
         */
        t(key){


            let data =
                NPC.Locale[
                    I18n.language
                ];



            if(!data){

                data =
                    NPC.Locale.id;

            }



            const result =
                key
                .split(".")
                .reduce(
                    (obj,part)=>
                    obj?.[part],
                    data
                );



            if(result){

                return result;

            }



            // fallback Indonesia

            const fallback =
                key
                .split(".")
                .reduce(
                    (obj,part)=>
                    obj?.[part],
                    NPC.Locale.id
                );



            return (
                fallback ||
                key
            );


        },



        /**
         * Mengubah bahasa
         */
        setLanguage(lang){


            if(
                !NPC.Locale[lang]
            ){

                console.warn(
                    "Language tidak tersedia:",
                    lang
                );


                return false;

            }



            I18n.language =
                lang;



            NPC.Core.Events?.emit(
                "language.changed",
                lang
            );



            return true;


        },



        /**
         * Bahasa aktif
         */
        current(){


            return I18n.language;


        },



        /**
         * Daftar bahasa
         */
        available(){


            return Object.keys(
                NPC.Locale
            );


        }


    };



    Object.freeze(I18n);



    NPC.I18n =
        I18n;



})(window.NPC);
