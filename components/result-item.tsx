import React, { Dispatch, SetStateAction } from "react";
import styles from "./ResultItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDelayed } from "../hooks/useDelayed";

interface ResultItemProps {
  value: string;
}

export const ResultItem = ({ value }: ResultItemProps) => {
  const [copyNotifierVisible, setCopyNotifierVisible] =
    useDelayed<boolean>(false);

  function copyToClipboard(dataToCopy: string) {
    navigator.clipboard.writeText(dataToCopy).then(
      function () {
        // @ts-ignore
        setCopyNotifierVisible(true);
      },
      function (err) {
        alert(
          "Nepodarilo sa skopírovať do clipboardu :( Pravdepodobne máte nepodporovaný browser "
        );
        console.error(err);
      }
    );
  }

  return (
    <div className={`${styles.wrapper}`}>
      <span>{value}</span>
      <div className={styles.copyButtonWrapper}>
        <button className="button" onClick={() => copyToClipboard(value)}>
          <span className="icon is-small">
            <FontAwesomeIcon icon={["far", "copy"]} />
          </span>
        </button>

        <span
          className={`${styles.notifierLabel} ${
            copyNotifierVisible ? styles.visible : ""
          }`}
        >
          Copied
        </span>
      </div>
    </div>
  );
};
