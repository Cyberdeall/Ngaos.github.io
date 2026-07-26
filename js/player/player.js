/**
 * ============================================================================
 * NGAOS PLATFORM PLAYER
 * ----------------------------------------------------------------------------
 * File        : player.js
 * Folder      : /js/player
 * Version     : 1.0.0
 * Author      : Fadil Ahmad & ChatGPT
 * License     : Private
 *
 * Description
 * ----------------------------------------------------------------------------
 * Player Facade.
 *
 * Seluruh modul aplikasi wajib menggunakan API pada file ini.
 * Jangan mengakses Engine, Volume ataupun Metadata secara langsung.
 * ============================================================================
 */

"use strict";

(function (NPC) {

    if (!NPC) {
        throw new Error("NPC namespace belum tersedia.");
    }

    NPC.Player = NPC.Player || {};

    const Player = {

        play() {

            return NPC.Player.Engine.play();

        },

        pause() {

            return NPC.Player.Engine.pause();

        },

        stop() {

            return NPC.Player.Engine.stop();

        },

        toggle() {

            if (NPC.Player.Engine.isPlaying()) {
                return this.pause();
            }

            return this.play();

        },

        source(url) {

            if (url === undefined) {
                return NPC.Player.Engine.getSource();
            }

            NPC.Player.Engine.setSource(url);

        },

        volume(value) {

            if (value === undefined) {
                return NPC.Player.Volume.get();
            }

            NPC.Player.Volume.set(value);

        },

        mute() {

            NPC.Player.Volume.mute();

        },

        unmute() {

            NPC.Player.Volume.unmute();

        },

        metadata() {

            return NPC.Player.Metadata.get();

        },

        statistics() {

            return NPC.Player.Statistics.get();

        },

        sleep(minutes) {

            NPC.Player.Sleep.start(minutes);

        },

        cancelSleep() {

            NPC.Player.Sleep.stop();

        },

        isPlaying() {

            return NPC.Player.Engine.isPlaying();

        },

        isReady() {

            return NPC.Player.Engine.isReady();

        }

    };

    Object.freeze(Player);

    NPC.Player.API = Player;

})(window.NPC);
