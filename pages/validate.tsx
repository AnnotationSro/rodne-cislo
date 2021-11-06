import type { NextPage } from "next";

import styles from "../styles/Validate.module.scss";
import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { validateBirthId } from "../utils/birth-id-util";

const Validate: NextPage = () => {
  const inputElem = useRef<HTMLInputElement>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  function validate(event: FormEvent, rc: string) {
    event.preventDefault();
    setIsValid(validateBirthId(rc));
  }

  return (
    <form
      className={`box ${styles.container}`}
      onSubmit={(event) => validate(event, inputElem.current!.value)}
    >
      <div className="field">
        <label className="label">Rodné číslo</label>
        <div className={`control`}>
          <input
            ref={inputElem}
            className={`input ${styles.birthIdInput}`}
            type="text"
          />
        </div>
      </div>

      <div className={`field`}>
        <div className="control">
          <button className="button is-link" type="submit">
            <FontAwesomeIcon icon={["fas", "cogs"]} />
            <span>Validuj</span>
          </button>
        </div>
      </div>

      <div className={`field ${styles.resultPanel}`}>
        {isValid === true && (
          <div className={`${styles.result} ${styles.resultValid}`}>
            Valídne 🥳
          </div>
        )}
        {isValid === false && (
          <div className={`${styles.result} ${styles.resultInvalid}`}>
            Nevalídne 😧
          </div>
        )}
      </div>
    </form>
  );
};

export default Validate;
