import type { NextPage } from "next";

import styles from "../styles/Home.module.scss";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { IMaskInput } from "react-imask";
import parse from "date-fns/parse";
import {
  BirthIdGeneratorResult,
  GenderType,
  generateBirthId,
} from "../utils/birth-id-util";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDelayed } from "../hooks/useDelayed";

const Home: NextPage = () => {
  const [birthDate, setBirthDate] = useState<Date | null>();
  const [date, setDate] = useState<string>();
  const [selectedGender, setGelectedGender] = useState<GenderType>("MALE");
  const [birthId, setBirthId] = useState<BirthIdGeneratorResult>();
  const [dateFormatted, setDateFormatted] = useState<string>();
  const [selectedGenderGenerated, setSelectedGenderGenerated] =
    useState<string>();

  const [copyNotifier1, setCopyNotifier1] = useDelayed<boolean>(false);
  const [copyNotifier2, setCopyNotifier2] = useDelayed<boolean>(false);

  function onGenderChange(changeEvent: React.ChangeEvent<HTMLInputElement>) {
    setGelectedGender(changeEvent.target.value as GenderType);
  }

  function onFormSubmit(event: FormEvent) {
    event.preventDefault();
    if (!birthDate) {
      alert("Nezabudni vyplniť dátum narodenia");
      return;
    }
    setDateFormatted(
      `${birthDate.getDate()}.${
        birthDate.getMonth() + 1
      }.${birthDate.getFullYear()}`
    );
    setSelectedGenderGenerated(selectedGender);
    setBirthId(generateBirthId(birthDate!, selectedGender));
  }

  function copyToClipboard(
    dataToCopy: string,
    setter: boolean | Dispatch<SetStateAction<boolean | undefined>> | undefined
  ) {
    navigator.clipboard.writeText(dataToCopy).then(
      function () {
        // @ts-ignore
        setter(true);
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
    <div className={`${styles.container}`}>
      <h1 className={"title"}>Generátor rodného čísla</h1>
      <form
        className={`box ${styles.mainWrapper}`}
        onSubmit={(e) => onFormSubmit(e)}
      >
        <div className="field">
          <label className="label">Dátum narodenia</label>

          <div
            className={`control  has-icons-right ${styles.dateInputWrapper}`}
          >
            <IMaskInput
              className={"input"}
              mask={Date}
              radix="."
              value={date}
              lazy={false}
              unmask={true} // true|false|'typed'
              // inputRef={el => this.input = el}  // access to nested input
              // DO NOT USE onChange TO HANDLE CHANGES!
              // USE onAccept INSTEAD
              onAccept={
                // depending on prop above first argument is
                // `value` if `unmask=false`,
                // `unmaskedValue` if `unmask=true`,
                // `typedValue` if `unmask='typed'`
                (value: any, mask: any) => {
                  if (value.length === "dd.MM.yyyy".length) {
                    let date = parse(value, "dd.MM.yyyy", new Date());
                    setBirthDate(date);
                  } else {
                    setBirthDate(null);
                  }

                  setDate(value);
                }
              }
            />

            <span className="icon is-small is-right">
              <FontAwesomeIcon icon={["far", "calendar-alt"]} />
            </span>
          </div>
        </div>

        <div className="field">
          <label className="label">Name</label>
          <div className={`control ${styles.radioList}`}>
            <label className="radio">
              <input
                type="radio"
                name="gender-radio"
                id="radio-male"
                value="MALE"
                checked={selectedGender === "MALE"}
                onChange={(changeEvent) => onGenderChange(changeEvent)}
              />
              Muž
              <FontAwesomeIcon icon="mars" />
            </label>

            <label className="radio">
              <input
                type="radio"
                name="gender-radio"
                id="radio-female"
                value="FEMALE"
                checked={selectedGender === "FEMALE"}
                onChange={(changeEvent) => onGenderChange(changeEvent)}
              />
              Žena
              <FontAwesomeIcon icon="venus" />
            </label>
          </div>
        </div>

        <div className={`field ${styles.confirmButtonGroup}`}>
          <div className="control">
            <button className="button is-link" type="submit">
              <FontAwesomeIcon icon={["fas", "cogs"]} />{" "}
              <span>Generuj rodné číslo</span>
            </button>
          </div>
        </div>
      </form>

      {birthId && (
        <div className={`panel ${styles.resultsPanel}`}>
          <div className="panel-heading">
            Výsledok: &nbsp;
            <i>
              {dateFormatted} &nbsp;
              {selectedGenderGenerated === "MALE" && (
                <FontAwesomeIcon icon="mars" />
              )}
              {selectedGenderGenerated === "FEMALE" && (
                <FontAwesomeIcon icon="venus" />
              )}
            </i>
          </div>

          <div className={`box ${styles.results}`}>
            <div>
              <label className="label">S lomítkom</label>
              <div className="control">{birthId.withDelimeter}</div>
            </div>

            <div className={styles.copyButtonWrapper}>
              <button
                className="button"
                onClick={() =>
                  copyToClipboard(birthId.withDelimeter, setCopyNotifier1)
                }
              >
                <span className="icon is-small">
                  <FontAwesomeIcon icon={["far", "copy"]} />
                </span>
              </button>
              {copyNotifier1 && (
                <span className={styles.notifierLabel}>Copied</span>
              )}
            </div>

            <div>
              <label className="label">Bez lomítka</label>
              <div className="control">{birthId.pure}</div>
            </div>

            <div className={styles.copyButtonWrapper}>
              <button
                className="button"
                onClick={() => copyToClipboard(birthId.pure, setCopyNotifier2)}
              >
                <span className="icon is-small">
                  <FontAwesomeIcon icon={["far", "copy"]} />
                </span>
              </button>
              {copyNotifier2 && (
                <span className={styles.notifierLabel}>Copied</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
