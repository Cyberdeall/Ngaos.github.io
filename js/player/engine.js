/**
 * ============================================================================
 * NGAOS PLATFORM PLAYER
 * ----------------------------------------------------------------------------
 * File        : engine.js
 * Folder      : /js/player
 * Version     : 1.0.0
 *
 * Description
 * ----------------------------------------------------------------------------
 * Audio Engine Core.
 *
 * Mengelola HTML5 Audio.
 * Tidak menangani UI.
 * Tidak menangani metadata.
 * Tidak menangani volume.
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



    class AudioEngine {


        constructor(){


            this.audio =
                new Audio();


            this.audio.preload =
                "none";


            this.audio.crossOrigin =
                "anonymous";


            this.source =
                null;


            this.state =
                "idle";


            this.bind();


        }





        bind(){


            this.audio.addEventListener(
                "playing",
                ()=>{


                    this.state =
                        "playing";


                    NPC.Core.Events?.emit(
                        "player.playing"
                    );


                }
            );



            this.audio.addEventListener(
                "pause",
                ()=>{


                    this.state =
                        "paused";


                    NPC.Core.Events?.emit(
                        "player.paused"
                    );


                }
            );



            this.audio.addEventListener(
                "error",
                (error)=>{


                    this.state =
                        "error";


                    NPC.Core.Events?.emit(
                        "player.error",
                        error
                    );


                }
            );



            this.audio.addEventListener(
                "waiting",
                ()=>{


                    NPC.Core.Events?.emit(
                        "player.buffering"
                    );


                }
            );


        }





        load(url){


            if(!url){

                throw new Error(
                    "Stream URL kosong."
                );

            }


            this.source =
                url;


            this.audio.src =
                url;


            this.state =
                "loaded";



            NPC.Core.Events?.emit(
                "player.loaded",
                url
            );


        }





        async play(){


            await this.audio.play();


        }





        pause(){


            this.audio.pause();


        }





        stop(){


            this.audio.pause();


            this.audio.removeAttribute(
                "src"
            );


            this.audio.load();


            this.state =
                "stopped";


            NPC.Core.Events?.emit(
                "player.stopped"
            );


        }





        volume(value){


            if(value === undefined){

                return this.audio.volume;

            }


            this.audio.volume =
                Math.max(
                    0,
                    Math.min(
                        1,
                        Number(value)
                    )
                );


        }





        muted(value){


            if(value === undefined){

                return this.audio.muted;

            }


            this.audio.muted =
                Boolean(value);


        }





        playing(){


            return (
                !this.audio.paused &&
                !this.audio.ended
            );


        }





        getSource(){


            return this.source;


        }





        getElement(){


            return this.audio;


        }



    }





    NPC.Player.Engine =
        new AudioEngine();



})(window.NPC);
