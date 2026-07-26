/**
 * ============================================================================
 * NGAOS PLATFORM PLAYER
 * ----------------------------------------------------------------------------
 * File        : engine.js
 * Folder      : /js/player
 * Version     : 1.0.0
 * Author      : Fadil Ahmad & ChatGPT
 * License     : Private
 *
 * Description
 * ----------------------------------------------------------------------------
 * Audio Engine.
 *
 * Bertanggung jawab mengelola HTMLAudioElement.
 * File ini TIDAK menangani UI, Metadata, Volume maupun Reconnect.
 * ============================================================================
 */

"use strict";

(function (NPC) {

    if (!NPC) {
        throw new Error("NPC namespace belum tersedia.");
    }

    NPC.Player = NPC.Player || {};

    class AudioEngine {

        constructor() {

            this.audio = new Audio();

            this.audio.preload = "none";
            this.audio.autoplay = false;
            this.audio.crossOrigin = "anonymous";

            this.url = null;

            this.playing = false;

            this.ready = false;

            this.bindEvents();

        }

        bindEvents() {

            this.audio.addEventListener("playing", () => {

                this.playing = true;

                NPC.Core.Events?.emit(
                    "player.playing"
                );

            });

            this.audio.addEventListener("pause", () => {

                this.playing = false;

                NPC.Core.Events?.emit(
                    "player.pause"
                );

            });

            this.audio.addEventListener("ended", () => {

                this.playing = false;

                NPC.Core.Events?.emit(
                    "player.ended"
                );

            });

            this.audio.addEventListener("error", (event) => {

                this.playing = false;

                NPC.Core.Events?.emit(
                    "player.error",
                    event
                );

            });

            this.audio.addEventListener("loadedmetadata", () => {

                this.ready = true;

                NPC.Core.Events?.emit(
                    "player.ready"
                );

            });

        }

        setSource(url) {

            if (!url) {
                throw new Error("Stream URL kosong.");
            }

            this.url = url;

            this.audio.src = url;

        }

        async play() {

            if (!this.url) {
                throw new Error("Stream belum diset.");
            }

            await this.audio.play();

        }

        pause() {

            this.audio.pause();

        }

        stop() {

            this.audio.pause();

            this.audio.currentTime = 0;

        }

        isPlaying() {

            return this.playing;

        }

        isReady() {

            return this.ready;

        }

        getAudio() {

            return this.audio;

        }

    }

    Object.freeze(AudioEngine);

    NPC.Player.Engine = new AudioEngine();

})(window.NPC);
