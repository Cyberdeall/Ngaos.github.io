/**
 * ============================================================================
 * NGAOS PLATFORM PLAYER
 * ----------------------------------------------------------------------------
 * File        : controller.js
 * Folder      : /js/player
 * Version     : 1.0.0
 * Author      : Fadil Ahmad & ChatGPT
 * License     : Private
 *
 * Description
 * ----------------------------------------------------------------------------
 * Player Controller.
 *
 * Menghubungkan Event Bus dengan UI aplikasi.
 * Controller tidak mengontrol Audio secara langsung.
 * ============================================================================
 */

"use strict";

(function (NPC) {

    if (!NPC) {
        throw new Error("NPC namespace belum tersedia.");
    }

    NPC.Player = NPC.Player || {};

    class PlayerController {

        constructor() {

            this.bindEvents();

        }

        bindEvents() {

            const Events = NPC.Core.Events;

            if (!Events) {
                return;
            }

            Events.on(
                "player.playing",
                () => this.onPlaying()
            );

            Events.on(
                "player.pause",
                () => this.onPause()
            );

            Events.on(
                "player.stop",
                () => this.onStop()
            );

            Events.on(
                "player.error",
                (error) => this.onError(error)
            );

            Events.on(
                "player.metadata.changed",
                (metadata) => this.onMetadata(metadata)
            );

            Events.on(
                "player.sleep.finished",
                () => this.onSleepFinished()
            );

        }

        onPlaying() {

            NPC.Core.Events.emit(
                "ui.player.playing"
            );

        }

        onPause() {

            NPC.Core.Events.emit(
                "ui.player.pause"
            );

        }

        onStop() {

            NPC.Core.Events.emit(
                "ui.player.stop"
            );

        }

        onError(error) {

            NPC.UI.Toast?.error(
                error?.message ||
                NPC.I18n?.t("player.error") ||
                "Player Error"
            );

        }

        onMetadata(metadata) {

            NPC.Core.Events.emit(
                "ui.player.metadata",
                metadata
            );

        }

        onSleepFinished() {

            NPC.Core.Events.emit(
                "player.stop.request"
            );

            NPC.UI.Toast?.info(
                NPC.I18n?.t("player.sleep_finished") ||
                "Sleep timer selesai."
            );

        }

    }

    Object.freeze(PlayerController);

    NPC.Player.Controller =
        new PlayerController();

})(window.NPC);
