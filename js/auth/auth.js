/**
 * ============================================================================
 * NGAOS PLATFORM AUTHENTICATION
 * ----------------------------------------------------------------------------
 * File        : auth.js
 * Folder      : /js/auth
 * Version     : 2.0.0
 * Author      : Fadil Ahmad & ChatGPT
 * License     : Private
 *
 * Description
 * ----------------------------------------------------------------------------
 * Authentication Controller.
 *
 * Mengelola autentikasi aplikasi menggunakan provider aktif.
 * Seluruh Session, Event, Toast, Loading, dan I18n dipusatkan di sini.
 * ============================================================================
 */

"use strict";

(function (NPC) {

    if (!NPC) {
        throw new Error("NPC namespace belum tersedia.");
    }

    NPC.Auth = NPC.Auth || {};

    let currentUser = null;

    const Auth = {

        /**
         * Inisialisasi Authentication
         */
        async init() {

            const provider = NPC.Core.Provider.get();

            if (!provider) {
                throw new Error("Authentication Provider tidak tersedia.");
            }

            if (!provider.isReady()) {
                await provider.init();
            }

            await this.restoreSession();

        },

        /**
         * Restore session lokal
         */
        async restoreSession() {

            const session =
                NPC.Core.Session.get();

            if (!session) {
                return false;
            }

            currentUser = session;

            NPC.Core.Events?.emit(
                "auth.restored",
                currentUser
            );

            return true;

        },

        /**
         * Login
         */
        async login(button = null) {

            const provider =
                NPC.Core.Provider.get();

            try {

                if (button) {
                    NPC.UI.Loading.show(button);
                }

                const user =
                    await provider.login();

                if (!user) {
                    throw new Error(
                        NPC.I18n.t(
                            "auth.login_failed"
                        )
                    );
                }

                currentUser =
                    NPC.Auth.Mapper.fromClerk(user);

                NPC.Core.Session.save(
                    currentUser
                );

                NPC.Core.Events.emit(
                    "auth.login",
                    currentUser
                );

                NPC.UI.Toast.success(
                    NPC.I18n.t(
                        "auth.login_success"
                    )
                );

                return currentUser;

            } catch (error) {

                NPC.UI.Toast.error(
                    error.message ||
                    NPC.I18n.t(
                        "auth.login_failed"
                    )
                );

                throw error;

            } finally {

                if (button) {
                    NPC.UI.Loading.hide(button);
                }

            }

        },        /**
         * Register
         */
        async register(button = null) {

            const provider =
                NPC.Core.Provider.get();

            try {

                if (button) {
                    NPC.UI.Loading.show(button);
                }

                const user =
                    await provider.register();

                if (!user) {

                    throw new Error(
                        NPC.I18n.t(
                            "auth.register_failed"
                        )
                    );

                }

                currentUser =
                    NPC.Auth.Mapper.fromClerk(user);

                NPC.Core.Session.save(
                    currentUser
                );

                NPC.Core.Events.emit(
                    "auth.register",
                    currentUser
                );

                NPC.UI.Toast.success(
                    NPC.I18n.t(
                        "auth.register_success"
                    )
                );

                return currentUser;

            } catch (error) {

                NPC.UI.Toast.error(
                    error.message ||
                    NPC.I18n.t(
                        "auth.register_failed"
                    )
                );

                throw error;

            } finally {

                if (button) {
                    NPC.UI.Loading.hide(button);
                }

            }

        },



        /**
         * Logout
         */
        async logout() {

            const provider =
                NPC.Core.Provider.get();

            try {

                await provider.logout();

            } finally {

                NPC.Core.Session.destroy();

                currentUser = null;

                NPC.Core.Events.emit(
                    "auth.logout"
                );

            }

            NPC.UI.Toast.info(
                NPC.I18n.t(
                    "auth.logout_success"
                )
            );

            return true;

        },



        /**
         * Ambil user aktif
         */
        current() {

            return currentUser;

        },



        /**
         * Apakah user sudah login
         */
        isAuthenticated() {

            return currentUser !== null;

        },



        /**
         * Refresh user dari provider
         */
        async refresh() {

            const provider =
                NPC.Core.Provider.get();

            const user =
                await provider.getCurrentUser();

            if (!user) {

                currentUser = null;

                NPC.Core.Session.destroy();

                return null;

            }

            currentUser =
                NPC.Auth.Mapper.fromClerk(user);

            NPC.Core.Session.save(
                currentUser
            );

            NPC.Core.Events.emit(
                "auth.refresh",
                currentUser
            );

            return currentUser;

        },        /**
         * Ambil provider aktif.
         *
         * @returns {Object|null}
         */
        provider() {

            return NPC.Core.Provider.get();

        },



        /**
         * Apakah provider siap digunakan.
         *
         * @returns {boolean}
         */
        ready() {

            const provider =
                NPC.Core.Provider.get();

            if (!provider) {
                return false;
            }

            return provider.isReady();

        },



        /**
         * Ambil nama provider aktif.
         *
         * @returns {string}
         */
        providerName() {

            const provider =
                NPC.Core.Provider.get();

            if (!provider) {
                return "";
            }

            return provider.name;

        }

    };



    Object.freeze(Auth);



    NPC.Auth.Manager =
        Auth;



})(window.NPC);
