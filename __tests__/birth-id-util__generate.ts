import { generateBirthId } from "../utils/birth-id-util";
import { rodnecislo } from "rodnecislo";

describe("generate birth id", function () {
  it("male", function (assert) {
    let date = new Date(2021, 2, 11);
    let result = generateBirthId(date, "MALE");
    expect(result).not.toBeNull();

    let parsed = rodnecislo(result.withDelimeter);

    expect(parsed).not.toBeNull();
    expect(parsed.isValid()).toBeTruthy();
    expect(parsed!.isMale()).toBeTruthy();
    expect(parsed!.day()).toEqual(11);
    expect(parsed!.month()).toEqual(2);
    expect(parsed!.year()).toEqual(2021);

    assert();
  });

  it("female", function (assert) {
    let date = new Date(2011, 5, 1);
    let result = generateBirthId(date, "FEMALE");
    expect(result).not.toBeNull();

    let parsed = rodnecislo(result.withDelimeter);

    expect(parsed).not.toBeNull();
    expect(parsed.isValid()).toBeTruthy();
    expect(parsed!.isFemale()).toBeTruthy();
    expect(parsed!.day()).toEqual(1);
    expect(parsed!.month()).toEqual(5);
    expect(parsed!.year()).toEqual(2011);

    assert();
  });

  it("with leading zero", function (assert) {
    let date = new Date(2001, 5, 1);
    let result = generateBirthId(date, "FEMALE");
    expect(result).not.toBeNull();

    let parsed = rodnecislo(result.withDelimeter);

    expect(parsed).not.toBeNull();
    expect(parsed.isValid()).toBeTruthy();
    expect(parsed!.isFemale()).toBeTruthy();
    expect(parsed!.day()).toEqual(1);
    expect(parsed!.month()).toEqual(5);
    expect(parsed!.year()).toEqual(2001);

    assert();
  });

  it("with 3 digit suffix", function (assert) {
    let date = new Date(1950, 5, 1);
    let result = generateBirthId(date, "FEMALE");
    expect(result).not.toBeNull();

    let parsed = rodnecislo(result.withDelimeter);

    expect(parsed).not.toBeNull();
    expect(parsed.isValid()).toBeTruthy();
    expect(parsed!.isFemale()).toBeTruthy();
    expect(parsed!.day()).toEqual(1);
    expect(parsed!.month()).toEqual(5);
    expect(parsed!.year()).toEqual(1950);

    assert();
  });
});
