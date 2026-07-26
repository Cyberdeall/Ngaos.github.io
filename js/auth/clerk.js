/**
 * ============================================================================
 * NGAOS PLATFORM AUTHENTICATION
 * ----------------------------------------------------------------------------
 * File        : clerk.js
 * Folder      : /js/auth
 * Version     : 2.0.0
 * Author      : Fadil Ahmad & ChatGPT
 * License     : Private
 *
 * Description
 * ----------------------------------------------------------------------------
 * Clerk Authentication Provider.
 *
 * Provider ini mengimplementasikan NPC.Auth.Adapter.
 * Seluruh pengelolaan Session, Event, UI, dan Navigation dilakukan
 * oleh auth.js, bukan oleh provider.
 * ============================================================================
 */

"use strict";

(function (NPC) {

    if (!NPC) {
        throw new Error("NPC namespace belum tersedia.");
    }

    if (!NPC.Auth || !NPC.Auth.Adapter) {
        throw new Error("Auth Adapter belum dimuat.");
    }

    class ClerkProvider extends NPC.Auth.Adapter {

        constructor() {

            super("clerk");

            this.client = null;

        }

        async init() {

            if (this.client) {
                return true;
            }

            if (typeof Clerk === "undefined") {

                console.warn(
                    "[NPC] Clerk SDK belum dimuat."
                );

                return false;

            }

            try {

                await Clerk.load();

                this.client = Clerk;

                console.log(
                    "[NPC] Clerk Provider siap."
                );

                return true;

            } catch (error) {

                console.error(
                    "[NPC] Clerk gagal diinisialisasi.",
                    error
                );

                return false;

            }

        }

        isReady() {

            return this.client !== null;

        }
                /**
         * Login menggunakan Clerk
         * @returns {Promise<Object>}
         */
        async login() {

            if (!this.isReady()) {

                throw new Error(
                    "Clerk Provider belum diinisialisasi."
                );

            }

            try {

                await this.client.openSignIn();

                return this.getCurrentUser();

            } catch (error) {

                console.error(
                    "[NPC] Login Clerk gagal.",
                    error
                );

                throw error;

            }

        }



        /**
         * Registrasi menggunakan Clerk
         * @returns {Promise<Object>}
         */
        async register() {

            if (!this.isReady()) {

                throw new Error(
                    "Clerk Provider belum diinisialisasi."
                );

            }

            try {

                await this.client.openSignUp();

                return this.getCurrentUser();

            } catch (error) {

                console.error(
                    "[NPC] Registrasi Clerk gagal.",
                    error
                );

                throw error;

            }

        }



        /**
         * Ambil user yang sedang login
         * @returns {Object|null}
         */
        getCurrentUser() {

            if (!this.isReady()) {

                return null;

            }

            return this.client.user || null;

        }
                /**
         * Logout user
         * @returns {Promise<boolean>}
         */
        async logout() {

            if (!this.isReady()) {
                return false;
            }

            try {

                await this.client.signOut();

                return true;

            } catch (error) {

                console.error(
                    "[NPC] Logout Clerk gagal.",
                    error
                );

                throw error;

            }

        }



        /**
         * Cek status autentikasi
         * @returns {boolean}
         */
        isAuthenticated() {

            if (!this.isReady()) {
                return false;
            }

            return !!this.client.user;

        }

    }



    Object.freeze(ClerkProvider);



    /**
     * Registrasi provider.
     *
     * Provider aktif dipilih oleh:
     * js/core/provider.js
     *
     * BUKAN oleh file ini.
     */
    NPC.Auth.Clerk = new ClerkProvider();

})(window.NPC);
