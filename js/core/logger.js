/**
 * ============================================================================
 * NGAOS PLATFORM CORE (NPC)
 * ----------------------------------------------------------------------------
 * File        : logger.js
 * Folder      : /js/core
 * Version     : 1.0.0
 * Author      : Fadil Ahmad & ChatGPT
 * License     : Private
 *
 * Description
 * ----------------------------------------------------------------------------
 * Central Logging System.
 *
 * Semua pencatatan aplikasi melalui modul ini.
 * ============================================================================
 */

"use strict";

(function (NPC) {

    if (!NPC) {
        throw new Error("NPC namespace belum tersedia.");
    }


    const LEVEL = Object.freeze({

        INFO: "INFO",
        WARN: "WARN",
        ERROR: "ERROR",
        DEBUG: "DEBUG"

    });



    function timestamp() {

        return new Date()
            .toISOString();

    }



    function output(level, message, data = null) {


        const prefix =
            `[NPC ${level}] ${timestamp()}`;


        switch (level) {


            case LEVEL.ERROR:

                console.error(
                    prefix,
                    message,
                    data ?? ""
                );

                break;


            case LEVEL.WARN:

                console.warn(
                    prefix,
                    message,
                    data ?? ""
                );

                break;


            case LEVEL.DEBUG:

                if (
                    NPC.Config &&
                    NPC.Config.DEBUG &&
                    NPC.Config.DEBUG.ENABLED
                ) {

                    console.debug(
                        prefix,
                        message,
                        data ?? ""
                    );

                }

                break;


            default:

                console.log(
                    prefix,
                    message,
                    data ?? ""
                );

        }


    }



    const Logger = {


        info(message, data = null) {

            output(
                LEVEL.INFO,
                message,
                data
            );

        },


        warn(message, data = null) {

            output(
                LEVEL.WARN,
                message,
                data
            );

        },


        error(message, data = null) {

            output(
                LEVEL.ERROR,
                message,
                data
            );

        },


        debug(message, data = null) {

            output(
                LEVEL.DEBUG,
                message,
                data
            );

        },


        group(title, callback) {


            console.group(
                `[NPC] ${title}`
            );


            try {

                callback();

            } finally {

                console.groupEnd();

            }


        }


    };


    Object.freeze(Logger);


    NPC.Core.Logger = Logger;


})(window.NPC);
