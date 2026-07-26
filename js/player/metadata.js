/**
 * ============================================================================
 * NGAOS PLATFORM PLAYER
 * ----------------------------------------------------------------------------
 * File        : metadata.js
 * Folder      : /js/player
 * Version     : 1.0.0
 *
 * Description
 * ----------------------------------------------------------------------------
 * Player Metadata Manager.
 *
 * Mengelola informasi lagu/siaran.
 * Tidak mengambil data langsung dari server.
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



    class MetadataManager {



        constructor(){


            this.data = {

                title: "",

                artist: "",

                album: "",

                artwork: "",

                station: "",

                updatedAt: null

            };


        }





        set(data = {}){


            this.data = {


                ...this.data,


                ...data,


                updatedAt:
                    Date.now()


            };



            NPC.Core.Events?.emit(

                "player.metadata.updated",

                this.get()

            );


        }





        get(){


            return {

                ...this.data

            };


        }





        clear(){


            this.data = {


                title: "",

                artist: "",

                album: "",

                artwork: "",

                station: "",

                updatedAt: null


            };



            NPC.Core.Events?.emit(

                "player.metadata.cleared"

            );


        }





        title(){


            return this.data.title;


        }





        artist(){


            return this.data.artist;


        }





        artwork(){


            return this.data.artwork;


        }





        station(){


            return this.data.station;


        }



    }





    NPC.Player.Metadata =

        new MetadataManager();



})(window.NPC);
