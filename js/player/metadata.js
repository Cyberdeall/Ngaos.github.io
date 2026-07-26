/**
 * ============================================================================
 * NGAOS PLATFORM PLAYER
 * ----------------------------------------------------------------------------
 * File        : metadata.js
 * Folder      : /js/player
 * Version     : 1.0.0
 * Author      : Fadil Ahmad & ChatGPT
 * License     : Private
 *
 * Description
 * ----------------------------------------------------------------------------
 * Metadata Manager.
 *
 * Mengelola metadata lagu yang sedang diputar.
 * Tidak melakukan request jaringan secara langsung.
 * Data diperoleh dari adapter/service yang akan dibuat kemudian.
 * ============================================================================
 */

"use strict";

(function (NPC) {

    if (!NPC) {
        throw new Error("NPC namespace belum tersedia.");
    }

    NPC.Player = NPC.Player || {};

    class MetadataManager {

        constructor() {

            this.reset();

        }

        reset() {

            this.data = {

                title: "",

                artist: "",

                album: "",

                artwork: "",

                presenter: "",

                listeners: 0,

                updatedAt: null

            };

        }

        set(data = {}) {

            this.data = {

                ...this.data,

                ...data,

                updatedAt: Date.now()

            };

            NPC.Core.Events?.emit(
                "player.metadata.changed",
                this.get()
            );

        }

        get() {

            return Object.freeze({

                ...this.data

            });

        }

        clear() {

            this.reset();

            NPC.Core.Events?.emit(
                "player.metadata.cleared"
            );

        }

        title() {

            return this.data.title;

        }

        artist() {

            return this.data.artist;

        }

        album() {

            return this.data.album;

        }

        artwork() {

            return this.data.artwork;

        }

        presenter() {

            return this.data.presenter;

        }

        listeners() {

            return this.data.listeners;

        }

        updatedAt() {

            return this.data.updatedAt;

        }

    }

    Object.freeze(MetadataManager);

    NPC.Player.Metadata =
        new MetadataManager();

})(window.NPC);
