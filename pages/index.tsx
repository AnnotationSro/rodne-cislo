import type { NextPage } from "next";

import styles from "../styles/Home.module.scss";
import React, { FormEvent, useRef, useState } from "react";
import { IMaskInput } from "react-imask";
import parse from "date-fns/parse";
import {
  BirthIdGeneratorResult,
  GenderType,
  generateBirthId,
  generateRandomDate,
} from "../utils/birth-id-util";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ResultItem } from "../components/result-item";

interface BirthIdGeneratorResultWrapper {
  checked: boolean;
  bi: BirthIdGeneratorResult;
}

const Home: NextPage = () => {
  const [birthDate, setBirthDate] = useState<Date | null>();
  const [date, setDate] = useState<string>();
  const [selectedGender, setGelectedGender] = useState<GenderType>("MALE");
  const [selectedBirth, setSelectedBirth] = useState<string>("AGE");

  const [count, setCount] = useState(1);
  const ageInputElement = useRef<HTMLInputElement>(null);
  const [result, setResult] = useState<BirthIdGeneratorResultWrapper[]>();
  const dateInputElement = useRef<HTMLElement>(null);

  function onGenderChange(changeEvent: React.ChangeEvent<HTMLInputElement>) {
    setGelectedGender(changeEvent.target.value as GenderType);
  }

  function onFormSubmit(event: FormEvent) {
    event.preventDefault();
    if (!birthDate && selectedBirth === "BIRTH_DATE") {
      alert("Nezabudni vyplniť dátum narodenia");
      return;
    }
    if (!ageInputElement.current!.value && selectedBirth === "AGE") {
      alert("Nezabudni vyplniť vek");
      return;
    }
    if (count < 0 || count === null || String(count).length === 0) {
      setCount(1);
    }

    let birthIds: BirthIdGeneratorResultWrapper[] = [];
    for (let i = 0; i < count; i++) {
      let birth;
      if (selectedBirth === "BIRTH_DATE") {
        birth = birthDate!;
      } else {
        birth = generateRandomDate(Number(ageInputElement.current!.value));
        console.log(birth);
      }
      let newItem = generateBirthId(birth, selectedGender);
      if (exists(newItem, birthIds)) {
        i--;
      } else {
        birthIds.push({
          bi: newItem,
          checked: false,
        } as BirthIdGeneratorResultWrapper);
      }
    }
    setResult(birthIds);
  }

  function exists(
    newBirthId: BirthIdGeneratorResult,
    all: BirthIdGeneratorResultWrapper[]
  ) {
    return all.map((bi) => bi.bi.pure).includes(newBirthId.pure);
  }

  function toggleCheckItem(r: BirthIdGeneratorResultWrapper) {
    let copy = JSON.parse(
      JSON.stringify(result)
    ) as BirthIdGeneratorResultWrapper[];

    let copiedR = copy.find((c) => c.bi.pure === r.bi.pure)!;
    copiedR.checked = !copiedR.checked;

    setResult(copy);
  }

  // @ts-ignore
  return (
    <div className={`${styles.container}`}>
      <form
        className={`box ${styles.mainWrapper}`}
        onSubmit={(e) => onFormSubmit(e)}
      >
        <div className={`field ${styles.birthDateAgeWrapper}`}>
          <div>
            <label
              className={`radio ${
                selectedBirth === "AGE" ? styles.selected : ""
              }`}
              onClick={() => {
                setSelectedBirth("AGE");
                setTimeout(() => {
                  ageInputElement.current!.focus();
                }, 0);
              }}
            >
              <div>
                <input
                  type="radio"
                  name="birth-date-radio"
                  id="radio-age"
                  value="AGE"
                  checked={selectedBirth === "AGE"}
                  onChange={(changeEvent) =>
                    setSelectedBirth(changeEvent.target.value)
                  }
                />
                <span className={styles.title}>Vek</span>
              </div>
              <div className={`control`}>
                <input
                  ref={ageInputElement}
                  className="input"
                  type="number"
                  min="0"
                  defaultValue={"42"}
                  disabled={selectedBirth !== "AGE"}
                />
              </div>
            </label>
          </div>
          <div>
            <label
              className={`radio ${
                selectedBirth === "BIRTH_DATE" ? styles.selected : ""
              }`}
              onClick={() => {
                setSelectedBirth("BIRTH_DATE");
                setTimeout(() => {
                  dateInputElement.current!.focus();
                }, 0);
              }}
            >
              <div>
                <input
                  type="radio"
                  name="birth-date-radio"
                  id="radio-birth-date"
                  value="BIRTH_DATE"
                  checked={selectedBirth === "BIRTH_DATE"}
                  onChange={(changeEvent) =>
                    setSelectedBirth(changeEvent.target.value)
                  }
                />
                <span className={styles.title}> Dátum narodenia</span>
              </div>
              <div
                className={`control has-icons-right ${styles.dateInputWrapper}`}
              >
                <IMaskInput
                  className={"input"}
                  mask={Date}
                  radix="."
                  value={date}
                  disabled={selectedBirth !== "BIRTH_DATE"}
                  lazy={false}
                  unmask={true} // true|false|'typed'
                  inputRef={(el: HTMLElement) => {
                    // @ts-ignore
                    dateInputElement.current = el;
                  }} // access to nested input
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
            </label>
          </div>
        </div>

        <div className="field">
          <label className="label">Pohlavie</label>
          <div className={`control ${styles.radioList}`}>
            <div>
              <label
                className={`radio ${
                  selectedGender === "MALE" ? styles.selected : ""
                }`}
              >
                <input
                  type="radio"
                  name="gender-radio"
                  id="radio-male"
                  value="MALE"
                  checked={selectedGender === "MALE"}
                  onChange={(changeEvent) => onGenderChange(changeEvent)}
                />
                <span className={styles.title}>Muž</span>
                <FontAwesomeIcon icon="mars" />
              </label>
            </div>
            <div>
              <label
                className={`radio ${
                  selectedGender === "FEMALE" ? styles.selected : ""
                }`}
              >
                <input
                  type="radio"
                  name="gender-radio"
                  id="radio-female"
                  value="FEMALE"
                  checked={selectedGender === "FEMALE"}
                  onChange={(changeEvent) => onGenderChange(changeEvent)}
                />
                <span className={styles.title}>Žena</span>
                <FontAwesomeIcon icon="venus" />
              </label>
            </div>
          </div>
        </div>

        <div className="field">
          <label className="label">Počet</label>
          <div className={`control`}>
            <input
              className={`input ${styles.countInput}`}
              type="number"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              min={1}
            />
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

      {result && (
        <div className={`panel ${styles.resultsPanel}`}>
          <div className="panel-heading">Výsledok</div>

          <div className={`box ${styles.results}`}>
            <table className="table is-hoverable is-fullwidth">
              <thead>
                <tr>
                  <th></th>
                  <th>S lomítkom</th>
                  <th>Bez lomítka</th>
                </tr>
              </thead>
              <tbody>
                {result.map((r) => {
                  return (
                    <tr
                      key={r.bi.pure}
                      className={r.checked ? styles.checked : ""}
                    >
                      <td>
                        <button
                          className="button"
                          onClick={() => toggleCheckItem(r)}
                        >
                          <span className="icon is-small">
                            <FontAwesomeIcon icon={["far", "check-square"]} />
                          </span>
                        </button>
                      </td>
                      <td>
                        <ResultItem value={r.bi.withDelimeter} />
                      </td>

                      <td>
                        <ResultItem value={r.bi.pure} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
