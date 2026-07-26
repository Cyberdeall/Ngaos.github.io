/**
 * ============================================================================
 * NGAOS PLATFORM PLAYER
 * ----------------------------------------------------------------------------
 * File        : sleep.js
 * Folder      : /js/player
 * Version     : 1.0.0
 * Author      : Fadil Ahmad & ChatGPT
 * License     : Private
 *
 * Description
 * ----------------------------------------------------------------------------
 * Sleep Timer Manager.
 *
 * Mengatur penghentian player secara otomatis setelah waktu tertentu.
 * Tidak menangani UI dan tidak berhubungan langsung dengan Audio Engine.
 * ============================================================================
 */

"use strict";

(function (NPC) {

    if (!NPC) {
        throw new Error("NPC namespace belum tersedia.");
    }

    NPC.Player = NPC.Player || {};

    class SleepTimer {

        constructor() {

            this.timer = null;

            this.duration = 0;

            this.startedAt = null;

            this.active = false;

        }

        start(minutes) {

            this.stop();

            minutes = Number(minutes);

            if (!Number.isFinite(minutes) || minutes <= 0) {
                return false;
            }

            this.duration = minutes * 60000;

            this.startedAt = Date.now();

            this.active = true;

            this.timer = setTimeout(() => {

                this.active = false;

                this.timer = null;

                NPC.Core.Events?.emit(
                    "player.sleep.finished"
                );

            }, this.duration);

            NPC.Core.Events?.emit(
                "player.sleep.started",
                {
                    minutes,
                    duration: this.duration
                }
            );

            return true;

        }

        stop() {

            if (this.timer) {

                clearTimeout(this.timer);

                this.timer = null;

            }

            if (this.active) {

                NPC.Core.Events?.emit(
                    "player.sleep.cancelled"
                );

            }

            this.active = false;

            this.duration = 0;

            this.startedAt = null;

        }

        isActive() {

            return this.active;

        }

        remaining() {

            if (!this.active) {
                return 0;
            }

            return Math.max(
                0,
                this.duration - (Date.now() - this.startedAt)
            );

        }

        getDuration() {

            return this.duration;

        }

    }

    Object.freeze(SleepTimer);

    NPC.Player.Sleep =
        new SleepTimer();

})(window.NPC);
