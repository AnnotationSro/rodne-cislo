import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { FormEvent, SyntheticEvent, useRef, useState } from "react";
import { IMaskInput } from "react-imask";
import parse from "date-fns/parse";
import {
  BirthIdGeneratorResult,
  GenderType,
  generateBirthId,
} from "../utils/birth-id-util";

const FORMAT = "dd.MM.yyyy";

const Home: NextPage = () => {
  const [birthDate, setBirthDate] = useState<Date | null>();
  const [date, setDate] = useState<string>();
  const [selectedGender, setGelectedGender] = useState<GenderType>("MALE");
  const [birthId, setBirthId] = useState<BirthIdGeneratorResult>();

  function onGenderChange(changeEvent: React.ChangeEvent<HTMLInputElement>) {
    setGelectedGender(changeEvent.target.value as GenderType);
  }

  function onFormSubmit(event: FormEvent) {
    setBirthId(generateBirthId(birthDate!, selectedGender));
    event.preventDefault();
  }

  return (
    <div className={styles.container}>
      <form onSubmit={(e) => onFormSubmit(e)}>
        <div className={`${styles.formRow} ${styles.dateGroup}`}>
          <label>Dátum narodenia</label>
          <IMaskInput
            mask={Date}
            radix="."
            value={date}
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
        </div>
        <div className={`${styles.formRow} ${styles.radioButtonGroup}`}>
          <div>
            <input
              type="radio"
              name="gender-radio"
              id="radio-male"
              value="MALE"
              checked={selectedGender === "MALE"}
              onChange={(changeEvent) => onGenderChange(changeEvent)}
            />
            <label htmlFor="radio-male">Muž</label>
          </div>
          <div>
            <input
              type="radio"
              name="gender-radio"
              id="radio-female"
              value="FEMALE"
              checked={selectedGender === "FEMALE"}
              onChange={(changeEvent) => onGenderChange(changeEvent)}
            />
            <label htmlFor="radio-female">Žena</label>
          </div>
        </div>
        <button type="submit">Generuj rodné číslo</button>
        <br />
        <div>{birthId?.withDelimeter}</div>
        <div>{birthId?.pure}</div>
      </form>
    </div>
  );
};

export default Home;
