/**
 * ============================================================================
 * NGAOS PLATFORM CORE
 * ----------------------------------------------------------------------------
 * File        : session.js
 * Folder      : /js/core
 * Version     : 1.0.0
 *
 * Description
 * ----------------------------------------------------------------------------
 * User Session Management.
 *
 * Mengelola session internal aplikasi.
 * Tidak bergantung pada provider authentication.
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



    const Session = {



        key:

        "npc_session",



        lifetime:

        1000 * 60 * 60 * 24 * 7,





        save(user){


            if(!user){

                return false;

            }



            const data = {


                user:user,


                created:

                Date.now(),


                expired:

                Date.now()
                +
                Session.lifetime


            };



            localStorage.setItem(

                Session.key,

                JSON.stringify(data)

            );



            return true;


        },





        get(){


            const raw =
            localStorage.getItem(
                Session.key
            );



            if(!raw){

                return null;

            }



            try{


                const data =
                JSON.parse(raw);



                if(
                    Date.now()
                    >
                    data.expired
                ){

                    Session.destroy();

                    return null;

                }



                return data.user;



            }
            catch(error){


                Session.destroy();


                return null;


            }


        },





        exists(){


            return (
                Session.get()
                !==
                null
            );


        },





        destroy(){


            localStorage.removeItem(
                Session.key
            );


        },





        refresh(user){


            Session.destroy();


            return Session.save(
                user
            );


        }



    };



    Object.freeze(
        Session
    );



    NPC.Core.Session =
        Session;



})(window.NPC);
