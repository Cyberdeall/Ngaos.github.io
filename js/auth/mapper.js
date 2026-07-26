/**
 * ============================================================================
 * NGAOS PLATFORM AUTHENTICATION
 * ----------------------------------------------------------------------------
 * File        : mapper.js
 * Folder      : /js/auth
 * Version     : 1.0.0
 *
 * Description
 * ----------------------------------------------------------------------------
 * User Data Normalizer.
 *
 * Mengubah data provider menjadi format internal NPC.
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



    const Mapper = {



        /**
         * Mapping user dari Clerk
         */
        fromClerk(user){


            if(!user){

                return null;

            }



            let email =
                null;



            if(
                user.primaryEmailAddress
            ){

                email =
                user
                .primaryEmailAddress
                .emailAddress;

            }



            const name =

                [
                    user.firstName,
                    user.lastName

                ]

                .filter(Boolean)

                .join(" ");





            return {


                id:

                user.id,



                name:

                name || "User",



                email:

                email,



                provider:

                "clerk",



                role:

                "user",



                created:

                Date.now()


            };


        },





        /**
         * Mapping user generic
         */
        normalize(
            user,
            provider="unknown"
        ){


            if(!user){

                return null;

            }



            return {


                id:

                user.id || null,



                name:

                user.name ||
                "User",



                email:

                user.email ||
                null,



                provider,



                role:

                user.role ||
                "user"



            };


        }



    };



    Object.freeze(
        Mapper
    );



    NPC.Auth.Mapper =
        Mapper;



})(window.NPC);
