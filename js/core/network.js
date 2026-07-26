/**
 * ============================================================================
 * NGAOS PLATFORM CORE (NPC)
 * ----------------------------------------------------------------------------
 * File        : network.js
 * Folder      : /js/core
 * Version     : 1.0.0
 * Author      : Fadil Ahmad & ChatGPT
 * License     : Private
 *
 * Description
 * ----------------------------------------------------------------------------
 * Network Manager.
 *
 * Menangani koneksi internet dan komunikasi HTTP aplikasi.
 * ============================================================================
 */

"use strict";

(function (NPC) {

    if (!NPC) {
        throw new Error("NPC namespace belum tersedia.");
    }


    const Network = {


        /**
         * Mengecek status internet
         */
        isOnline() {

            return navigator.onLine;

        },


        /**
         * Menunggu koneksi tersedia
         */
        waitOnline(timeout = 10000) {

            return new Promise((resolve, reject) => {


                if (navigator.onLine) {

                    resolve(true);
                    return;

                }


                let timer;


                const handler = () => {

                    clearTimeout(timer);

                    window.removeEventListener(
                        "online",
                        handler
                    );

                    resolve(true);

                };


                window.addEventListener(
                    "online",
                    handler
                );


                timer = setTimeout(() => {


                    window.removeEventListener(
                        "online",
                        handler
                    );


                    reject(
                        new Error(
                            "Connection timeout"
                        )
                    );


                }, timeout);


            });


        },


        /**
         * Fetch dengan timeout dan retry
         */
        async request(
            url,
            options = {},
            config = {}
        ) {


            const {

                timeout = 15000,

                retries = 2

            } = config;



            let attempt = 0;



            while (attempt <= retries) {


                try {


                    const controller =
                        new AbortController();



                    const timer =
                        setTimeout(
                            () =>
                            controller.abort(),
                            timeout
                        );



                    const response =
                        await fetch(
                            url,
                            {

                                ...options,

                                signal:
                                controller.signal

                            }
                        );



                    clearTimeout(timer);



                    if (!response.ok) {


                        throw new Error(
                            `HTTP ${response.status}`
                        );


                    }



                    return response;



                } catch(error) {



                    attempt++;



                    if (attempt > retries) {


                        NPC.Core.Logger?.error(
                            "Network request gagal",
                            {
                                url,
                                error:error.message
                            }
                        );


                        throw error;


                    }



                    await NPC.Core.Utils.sleep(
                        1000 * attempt
                    );


                }


            }


        },



        /**
         * GET JSON
         */
        async getJSON(url, options = {}) {


            const response =
                await Network.request(
                    url,
                    {
                        method:"GET",
                        ...options
                    }
                );


            return response.json();


        },



        /**
         * POST JSON
         */
        async postJSON(
            url,
            data,
            options = {}
        ) {


            const response =
                await Network.request(
                    url,
                    {

                        method:"POST",

                        headers:
                        {

                            "Content-Type":
                            "application/json",

                            ...(options.headers || {})

                        },


                        body:
                        JSON.stringify(data),

                        ...options

                    }
                );


            return response.json();


        }


    };



    window.addEventListener(
        "online",
        () => {


            NPC.Core.Events?.emit(
                "network.online"
            );


        }
    );



    window.addEventListener(
        "offline",
        () => {


            NPC.Core.Events?.emit(
                "network.offline"
            );


        }
    );



    Object.freeze(Network);



    NPC.Core.Network = Network;



})(window.NPC);
