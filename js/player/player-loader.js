/**
 * ============================================================================
 * NGAOS PLATFORM PLAYER
 * ----------------------------------------------------------------------------
 * File        : player-loader.js
 * Folder      : /js/player
 * Version     : 1.0.0
 *
 * Description
 * ----------------------------------------------------------------------------
 * Player Module Loader.
 *
 * Memastikan semua modul Player aktif setelah halaman selesai dimuat.
 * ============================================================================
 */

"use strict";


(function(NPC){


    if(!NPC){

        throw new Error(
            "NPC namespace belum tersedia."
        );

    }



    const PlayerLoader = {



        init(){


            try{


                if(
                    NPC.Player.Bootstrap
                ){


                    NPC.Player.Bootstrap
                    .init();


                    NPC.Core.Logger?.info(
                        "Player berhasil diaktifkan."
                    );


                    return true;


                }



                console.warn(
                    "Player Bootstrap belum tersedia."
                );


                return false;



            }catch(error){


                NPC.Core.Logger?.error(
                    "Player gagal aktif.",
                    error
                );


                return false;


            }


        }



    };



    NPC.Player =
        NPC.Player || {};



    NPC.Player.Loader =
        PlayerLoader;



})(window.NPC);
