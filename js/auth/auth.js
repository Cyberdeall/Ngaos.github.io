/**
 * ============================================================================
 * NGAOS PLATFORM AUTHENTICATION
 * ----------------------------------------------------------------------------
 * File        : auth.js
 * Folder      : /js/auth
 * Version     : 1.0.0
 *
 * Description
 * ----------------------------------------------------------------------------
 * Authentication Controller.
 *
 * Interface utama aplikasi untuk login/register/logout.
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



    let currentUser = null;



    const Auth = {



        async init(){


            if(
                NPC.Auth.Provider.init
            ){

                await NPC.Auth.Provider
                .init();

            }



            const user =
                await NPC.Auth.Provider
                .user();



            if(user){

                currentUser =
                    NPC.Auth.Mapper
                    .fromClerk(user);


                NPC.Core.Events?.emit(
                    "auth.login",
                    currentUser
                );

            }



        },





        async login(){


            try{


                NPC.UI.Loading?.show(
                    NPC.I18n.t(
                        "system.loading"
                    )
                );



                const result =
                    await NPC.Auth.Provider
                    .login();



                return result;



            }catch(error){


                NPC.UI.Toast?.error(
                    NPC.I18n.t(
                        "auth.login_failed"
                    )
                );


                throw error;


            }

            finally{


                NPC.UI.Loading?.hide();


            }


        },





        async register(){


            try{


                NPC.UI.Loading?.show(
                    NPC.I18n.t(
                        "system.loading"
                    )
                );



                return await NPC.Auth.Provider
                .register();



            }finally{


                NPC.UI.Loading?.hide();


            }


        },





        async logout(){


            await NPC.Auth.Provider
            .logout();



            currentUser =
                null;



            NPC.Core.Events?.emit(
                "auth.logout"
            );


        },





        async current(){


            if(currentUser){

                return currentUser;

            }



            const user =
                await NPC.Auth.Provider
                .user();



            if(!user){

                return null;

            }



            currentUser =
                NPC.Auth.Mapper
                .fromClerk(user);



            return currentUser;


        },





        loggedIn(){


            return (
                currentUser !== null
            );


        }



    };



    Object.freeze(Auth);



    NPC.Auth =
    Object.assign(
        NPC.Auth,
        Auth
    );



})(window.NPC);
