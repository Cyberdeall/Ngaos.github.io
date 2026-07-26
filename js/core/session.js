/**
 * ============================================================================
 * NGAOS PLATFORM CORE (NPC)
 * ----------------------------------------------------------------------------
 * File        : session.js
 * Folder      : /js/core
 * Version     : 1.0.0
 * Author      : Fadil Ahmad & ChatGPT
 * License     : Private
 *
 * Description
 * ----------------------------------------------------------------------------
 * User Session Manager.
 *
 * Mengelola sesi pengguna tanpa bergantung pada provider autentikasi.
 * ============================================================================
 */

"use strict";

(function (NPC) {


    if (!NPC) {

        throw new Error(
            "NPC namespace belum tersedia."
        );

    }



    const SESSION_KEY =
        "user_session";



    const Session = {



        /**
         * Membuat session baru
         *
         * @param {Object} user
         */
        create(user) {


            const session = {


                id:
                NPC.Core.Utils.uuid(),


                user,


                created:
                Date.now(),


                expires:

                Date.now() +
                (
                    (NPC.Config?.SESSION?.HOURS || 4)
                    *
                    60
                    *
                    60
                    *
                    1000
                )


            };



            NPC.Core.Storage.set(
                SESSION_KEY,
                session
            );



            NPC.Core.Events?.emit(
                "session.created",
                session
            );



            return session;


        },




        /**
         * Mendapatkan session
         */
        get() {


            return NPC.Core.Storage.get(
                SESSION_KEY,
                null
            );


        },




        /**
         * Mengecek session aktif
         */
        isActive() {


            const session =
                Session.get();



            if (!session) {

                return false;

            }



            if (
                Date.now()
                >
                session.expires
            ) {


                Session.destroy();


                return false;


            }



            return true;


        },




        /**
         * Mengambil user aktif
         */
        user() {


            if (
                !Session.isActive()
            ) {

                return null;

            }



            return Session.get().user;


        },




        /**
         * Perpanjang session
         */
        refresh() {


            const session =
                Session.get();



            if (!session) {

                return false;

            }



            session.expires =
                Date.now()
                +
                (
                    (NPC.Config?.SESSION?.HOURS || 4)
                    *
                    60
                    *
                    60
                    *
                    1000
                );



            NPC.Core.Storage.set(
                SESSION_KEY,
                session
            );


            return true;


        },




        /**
         * Hapus session
         */
        destroy() {


            NPC.Core.Storage.remove(
                SESSION_KEY
            );



            NPC.Core.Events?.emit(
                "session.destroyed"
            );


        },




        /**
         * Status session
         */
        status() {


            return {


                active:
                Session.isActive(),


                user:
                Session.user()


            };


        }


    };



    Object.freeze(Session);



    NPC.Core.Session =
        Session;



})(window.NPC);
