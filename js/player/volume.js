/**
 * ============================================================================
 * NGAOS PLATFORM PLAYER
 * ----------------------------------------------------------------------------
 * File        : volume.js
 * Folder      : /js/player
 * Version     : 1.0.0
 * Author      : Fadil Ahmad & ChatGPT
 * License     : Private
 *
 * Description
 * ----------------------------------------------------------------------------
 * Volume Manager.
 *
 * Mengelola volume dan mute.
 * Tidak mengontrol tombol UI.
 * Tidak mengontrol play/pause.
 * ============================================================================
 */

"use strict";

(function (NPC) {

    if (!NPC) {
        throw new Error("NPC namespace belum tersedia.");
    }

    if (!NPC.Player || !NPC.Player.Engine) {
        throw new Error("Player Engine belum dimuat.");
    }

    NPC.Player = NPC.Player || {};

    class VolumeManager {

        constructor() {

            this.audio = NPC.Player.Engine.getAudio();

            this.volume = 1;

            this.previousVolume = 1;

            this.audio.volume = this.volume;

        }

        set(value) {

            value = Number(value);

            if (Number.isNaN(value)) {
                return;
            }

            value = Math.max(0, Math.min(1, value));

            this.volume = value;

            this.audio.volume = value;

            if (value > 0) {
                this.previousVolume = value;
            }

            NPC.Core.Events?.emit(
                "player.volume.changed",
                value
            );

        }

        get() {

            return this.volume;

        }

        mute() {

            if (this.volume > 0) {
                this.previousVolume = this.volume;
            }

            this.set(0);

            NPC.Core.Events?.emit(
                "player.volume.mute"
            );

        }

        unmute() {

            this.set(
                this.previousVolume || 1
            );

            NPC.Core.Events?.emit(
                "player.volume.unmute"
            );

        }

        toggleMute() {

            if (this.volume === 0) {
                this.unmute();
            } else {
                this.mute();
            }

        }

        isMuted() {

            return this.volume === 0;

        }

    }

    Object.freeze(VolumeManager);

    NPC.Player.Volume =
        new VolumeManager();

})(window.NPC);
