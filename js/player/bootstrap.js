/**
 * ============================================================================
 * NGAOS PLATFORM PLAYER
 * ----------------------------------------------------------------------------
 * File        : bootstrap.js
 * Folder      : /js/player
 * Version     : 1.0.0
 *
 * Description
 * ----------------------------------------------------------------------------
 * Player Initializer.
 *
 * Merakit seluruh modul Player.
 * ============================================================================
 */

"use strict";


(function(NPC){


    if(!NPC){

        throw new Error(
            "NPC namespace belum tersedia."
        );

    }



    NPC.Player =
        NPC.Player || {};



    const Bootstrap = {


        init(){


            if(!NPC.Player.Engine){

                console.warn(
                    "Engine belum dimuat."
                );

                return false;

            }



            if(NPC.Player.Volume){

                NPC.Player.Volume =
                    new NPC.Player.Volume(
                        NPC.Player.Engine
                    );

            }



            if(NPC.Player.Reconnect){

                NPC.Player.Reconnect =
                    new NPC.Player.Reconnect(
                        NPC.Player.Engine
                    );

            }



            if(NPC.Player.Controller){

                NPC.Player.Controller =
                    new NPC.Player.Controller();

            }



            NPC.Core.Events?.emit(
                "player.ready"
            );


            return true;


        }


    };



    NPC.Player.Bootstrap =
        Bootstrap;



})(window.NPC);
