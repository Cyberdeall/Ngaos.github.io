/**
 * ============================================================================
 * NGAOS PLATFORM AUTH
 * ----------------------------------------------------------------------------
 * File        : adapter.js
 * Folder      : /js/auth
 * Version     : 2.0.0
 * Author      : Fadil Ahmad & ChatGPT
 * License     : Private
 *
 * Description
 * ----------------------------------------------------------------------------
 * Authentication Provider Adapter.
 *
 * File ini merupakan kontrak (interface) untuk seluruh provider autentikasi.
 * Seluruh provider (Clerk, Supabase, Auth0, Custom Server, dll.) harus
 * mengimplementasikan method yang tersedia di file ini.
 *
 * File ini TIDAK boleh berisi implementasi login sebenarnya.
 * ============================================================================
 */

"use strict";

(function (NPC) {

    if (!NPC) {
        throw new Error("NPC namespace belum tersedia.");
    }

    NPC.Auth = NPC.Auth || {};

    class AuthAdapter {

        constructor(name = "unknown") {
            this.name = name;
        }

        /**
         * Inisialisasi provider.
         * @returns {Promise<boolean>}
         */
        async init() {
            return true;
        }

        /**
         * Login.
         * @param {Object} credentials
         * @returns {Promise<Object>}
         */
        async login(credentials) {
            throw new Error("login() belum diimplementasikan.");
        }

        /**
         * Register.
         * @param {Object} data
         * @returns {Promise<Object>}
         */
        async register(data) {
            throw new Error("register() belum diimplementasikan.");
        }

        /**
         * Logout.
         * @returns {Promise<boolean>}
         */
        async logout() {
            return true;
        }

        /**
         * Ambil user yang sedang login.
         * @returns {Promise<Object|null>}
         */
        async getCurrentUser() {
            return null;
        }

        /**
         * Apakah provider sudah siap.
         * @returns {boolean}
         */
        isReady() {
            return true;
        }

        /**
         * Apakah user sudah login.
         * @returns {Promise<boolean>}
         */
        async isAuthenticated() {
            return false;
        }

    }

    Object.freeze(AuthAdapter);

    NPC.Auth.Adapter = AuthAdapter;

})(window.NPC);
