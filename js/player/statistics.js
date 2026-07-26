/**
 * ============================================================================
 * NGAOS PLATFORM PLAYER
 * ----------------------------------------------------------------------------
 * File        : statistics.js
 * Folder      : /js/player
 * Version     : 1.0.0
 * Author      : Fadil Ahmad & ChatGPT
 * License     : Private
 *
 * Description
 * ----------------------------------------------------------------------------
 * Player Statistics Manager.
 *
 * Menyimpan statistik penggunaan player selama aplikasi berjalan.
 * Tidak melakukan penyimpanan database maupun local storage.
 * ============================================================================
 */

"use strict";

(function (NPC) {

    if (!NPC) {
        throw new Error("NPC namespace belum tersedia.");
    }

    NPC.Player = NPC.Player || {};

    class StatisticsManager {

        constructor() {

            this.reset();

            this.bindEvents();

        }

        reset() {

            this.data = {

                playCount: 0,

                pauseCount: 0,

                stopCount: 0,

                reconnectCount: 0,

                errorCount: 0,

                metadataUpdateCount: 0,

                listeningTime: 0,

                lastError: null,

                startedAt: null

            };

        }

        bindEvents() {

            NPC.Core.Events.on("player.playing", () => {

                this.data.playCount++;

                this.data.startedAt = Date.now();

            });

            NPC.Core.Events.on("player.pause", () => {

                this.data.pauseCount++;

                this.calculateListeningTime();

            });

            NPC.Core.Events.on("player.stop", () => {

                this.data.stopCount++;

                this.calculateListeningTime();

            });

            NPC.Core.Events.on("player.error", (error) => {

                this.data.errorCount++;

                this.data.lastError = error || null;

            });

            NPC.Core.Events.on("player.reconnect.success", () => {

                this.data.reconnectCount++;

            });

            NPC.Core.Events.on("player.metadata.changed", () => {

                this.data.metadataUpdateCount++;

            });

        }

        calculateListeningTime() {

            if (!this.data.startedAt) {
                return;
            }

            this.data.listeningTime +=
                Date.now() - this.data.startedAt;

            this.data.startedAt = null;

        }

        get() {

            return Object.freeze({

                ...this.data

            });

        }

    }

    Object.freeze(StatisticsManager);

    NPC.Player.Statistics =
        new StatisticsManager();

})(window.NPC);
