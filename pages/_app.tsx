import "../styles/globals.scss";
import type { AppProps } from "next/app";
import "../utils/font-awesome";
import Head from "next/head";
import React, { useState } from "react";
import styles from "../styles/App.module.scss";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type RouteEnum = "GENERATE" | "VALIDATE";

function MyApp({ Component, pageProps }: AppProps) {
  const [selectedRoute, setSelectedRoute] = useState<RouteEnum>("GENERATE");
  const router = useRouter();

  function changeRoute(newRoute: RouteEnum) {
    setSelectedRoute(newRoute);
    if (newRoute === "VALIDATE") {
      router.push("/validate");
    } else {
      router.push("/");
    }
  }

  return (
    <>
      <Head>
        <title>Generátor rodného čísla</title>
      </Head>
      <div className={styles.mainContainer}>
        <div className={styles.headerGroup}>
          <h1 className={"title"}>
            {selectedRoute === "GENERATE" && (
              <>
                <span className={styles.titleEmphasis}>Generátor</span> rodného
                čísla
              </>
            )}
            {selectedRoute === "VALIDATE" && (
              <>
                <span className={styles.titleEmphasis}>Validátor</span> rodného
                čísla
              </>
            )}
          </h1>
          {selectedRoute === "GENERATE" && (
            <button
              className={"button is-primary"}
              onClick={() => changeRoute("VALIDATE")}
            >
              <FontAwesomeIcon icon={["fas", "exchange-alt"]} />
              <span>Validovať</span>
            </button>
          )}

          {selectedRoute === "VALIDATE" && (
            <button
              className={"button is-primary"}
              onClick={() => changeRoute("GENERATE")}
            >
              <FontAwesomeIcon icon={["fas", "exchange-alt"]} />
              <span>Generovať</span>
            </button>
          )}
        </div>
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
