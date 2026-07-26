/**
 * ============================================================================
 * NGAOS PLATFORM CORE
 * ----------------------------------------------------------------------------
 * File        : provider.js
 * Folder      : /js/core
 * Version     : 1.0.0
 *
 * Description
 * ----------------------------------------------------------------------------
 * Authentication Provider Loader.
 *
 * Memilih provider berdasarkan konfigurasi environment.
 * ============================================================================
 */

"use strict";


(function(NPC){


    if(!NPC){

        throw new Error(
            "NPC namespace belum tersedia."
        );

    }



    NPC.Core =
    NPC.Core || {};



    const ProviderLoader = {



        active:null,



        /**
         * Load provider aktif
         */
        init(){


            if(
                !NPC.Config ||
                !NPC.Config.auth
            ){

                throw new Error(
                    "Konfigurasi auth belum tersedia."
                );

            }



            const providerName =
                NPC.Config.auth.provider;



            switch(providerName){



                case "clerk":


                    if(
                        NPC.Auth &&
                        NPC.Auth.Clerk
                    ){

                        ProviderLoader.active =
                            NPC.Auth.Clerk;

                    }

                    break;



                case "custom":


                    if(
                        NPC.Auth &&
                        NPC.Auth.Custom
                    ){

                        ProviderLoader.active =
                            NPC.Auth.Custom;

                    }

                    break;



                default:


                    console.warn(
                        "Provider tidak dikenal:",
                        providerName
                    );


            }



            if(
                ProviderLoader.active
            ){

                NPC.Auth.Provider =
                    ProviderLoader.active;


                console.log(
                    "[NPC] Provider aktif:",
                    ProviderLoader.active.name
                );


                return true;

            }



            console.warn(
                "[NPC] Provider belum tersedia"
            );


            return false;


        },





        current(){


            return ProviderLoader.active;


        }



    };



    NPC.Core.Provider =
        ProviderLoader;



})(window.NPC);
