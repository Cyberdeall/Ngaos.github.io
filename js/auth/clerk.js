/**
 * ============================================================================
 * NGAOS PLATFORM AUTHENTICATION
 * ----------------------------------------------------------------------------
 * File        : clerk.js
 * Folder      : /js/auth
 * Version     : 1.0.0
 *
 * Description
 * ----------------------------------------------------------------------------
 * Clerk Authentication Provider.
 *
 * Implementasi provider pertama.
 * ============================================================================
 */

"use strict";


(function(NPC){


    if(!NPC){

        throw new Error(
            "NPC namespace belum tersedia."
        );

    }


    NPC.Auth =
        NPC.Auth || {};



    const ClerkProvider = {



        name:

        "clerk",




        client:null,



        async init(){


            if(
                typeof Clerk === "undefined"
            ){

                console.warn(
                    "Clerk SDK belum dimuat."
                );


                return false;

            }



            try{


                await Clerk.load();



                ClerkProvider.client =
                    Clerk;



                NPC.Core.Logger?.info(
                    "Clerk berhasil diinisialisasi"
                );


                return true;



            }catch(error){


                NPC.Core.Logger?.error(
                    "Clerk gagal init",
                    error
                );


                return false;


            }


        },





        async login(){


            if(
                !ClerkProvider.client
            ){

                throw new Error(
                    "Clerk belum siap."
                );

            }



            return await ClerkProvider
            .client
            .openSignIn();


        },





        async register(){


            if(
                !ClerkProvider.client
            ){

                throw new Error(
                    "Clerk belum siap."
                );

            }



            return await ClerkProvider
            .client
            .openSignUp();


        },





        async logout(){


            if(
                !ClerkProvider.client
            ){

                return false;

            }



            await ClerkProvider
            .client
            .signOut();



            NPC.Core.Session.destroy();



            return true;


        },





        async user(){


            if(
                !ClerkProvider.client
            ){

                return null;

            }



            return ClerkProvider
            .client
            .user;



        },





        isReady(){


            return (
                ClerkProvider.client !== null
            );


        }



    };



    Object.freeze(
        ClerkProvider
    );



    NPC.Auth.Clerk =
        ClerkProvider;



    /*
       Mengganti adapter default
       dengan Clerk provider
    */

    NPC.Auth.Provider =
        ClerkProvider;



})(window.NPC);
