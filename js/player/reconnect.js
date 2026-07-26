/**
 * ============================================================================
 * NGAOS PLATFORM PLAYER
 * ----------------------------------------------------------------------------
 * File        : reconnect.js
 * Folder      : /js/player
 * Version     : 1.0.0
 * Author      : Fadil Ahmad & ChatGPT
 * License     : Private
 *
 * Description
 * ----------------------------------------------------------------------------
 * Auto Reconnect Manager.
 *
 * Menangani koneksi ulang ketika stream terputus.
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

    class ReconnectManager {

        constructor() {

            this.enabled = true;

            this.retry = 0;

            this.maxRetry = 10;

            this.timer = null;

            this.bind();

        }

        bind() {

            NPC.Core.Events.on(
                "player.error",
                () => this.schedule()
            );

        }

        schedule() {

            if (!this.enabled) {
                return;
            }

            if (this.retry >= this.maxRetry) {

                NPC.Core.Events.emit(
                    "player.reconnect.failed"
                );

                return;

            }

            this.retry++;

            const delay = Math.min(
                this.retry * 3000,
                30000
            );

            clearTimeout(this.timer);

            this.timer = setTimeout(
                () => this.reconnect(),
                delay
            );

            NPC.Core.Events.emit(
                "player.reconnect.wait",
                delay
            );

        }

        async reconnect() {

            const engine = NPC.Player.Engine;

            const url = engine.getSource();

            if (!url) {
                return;
            }

            try {

                engine.stop();

                engine.setSource(url);

                await engine.play();

                this.retry = 0;

                NPC.Core.Events.emit(
                    "player.reconnect.success"
                );

            } catch (error) {

                this.schedule();

            }

        }

        reset() {

            this.retry = 0;

            clearTimeout(this.timer);

        }

        enable() {

            this.enabled = true;

        }

        disable() {

            this.enabled = false;

            this.reset();

        }

    }

    Object.freeze(ReconnectManager);

    NPC.Player.Reconnect =
        new ReconnectManager();

})(window.NPC);
