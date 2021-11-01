export type GenderType = "MALE" | "FEMALE";
export type BirthIdGeneratorResult = { withDelimeter: string; pure: string };
/**
 * takes birth ID as a input (must contain /) and parses it to a date of birth (proper Date object)
 * if parsing fails, returns null
 * @returns {Date}
 */
const BIRTH_ID_ALLOWED = /[0-9]{9,10}/;
export function parseBirthId(birthId: string): Date | null {
  if (!birthId) {
    return null;
  }

  if (birthId.indexOf("/") === -1) {
    return null;
  }
  let birthIdWithoutDelimeter = birthId.replace("/", "");
  if (!BIRTH_ID_ALLOWED.test(birthIdWithoutDelimeter)) {
    return null;
  }

  var birthIdParts = birthId.split("/");
  let firstPart = birthIdParts[0];

  if (firstPart.length !== 6) {
    return null;
  }

  let yearPrefixString = firstPart.substring(0, 2);
  let monthString = firstPart.substring(2, 4);
  let dayString = firstPart.substring(4, 6);

  if (monthString.substring(0, 1) === "5") {
    monthString = monthString.substring(1, 2);
  }

  if (monthString.substring(0, 1) === "6") {
    monthString = `1${monthString.substring(1, 2)}`;
  }

  let year = parseInt(yearPrefixString, 10);
  let month = parseInt(monthString, 10) - 1; //months are indexed from 0
  let day = parseInt(dayString, 10);

  //since 1954, last part of birth id has 4 digits
  if (year < 54 && birthIdParts[1].length === 4) {
    year += 2000;
  } else {
    year += 1900;
  }

  //modulo 11

  if (
    birthIdWithoutDelimeter.length === 10 &&
    Number(birthIdWithoutDelimeter) % 11 !== 0
  ) {
    return null;
  }

  try {
    return new Date(year, month, day);
  } catch (e) {
    return null;
  }
}

export function generateBirthId(
  birthDate: Date,
  gender: GenderType
): BirthIdGeneratorResult {
  let year = birthDate.getFullYear() % 100; //we need only last 2 digits
  let month = birthDate.getMonth() + 1;
  if (gender === "FEMALE") {
    month += 50;
  }
  let day = birthDate.getDate();

  let firstPart = [year, paddingLeft(month), paddingLeft(day)].join("");

  let suffixLength = 4;
  if (birthDate.getFullYear() <= 1954) {
    suffixLength = 3;
  }
  let tempBirthId = paddingRight(Number(firstPart), suffixLength);
  let birthId = String(nextNumberDivided11(Number(tempBirthId)));
  return {
    pure: birthId,
    withDelimeter: addDelimeter(birthId),
  };
}

function addDelimeter(birthId: string): string {
  let firstPart = birthId.substring(0, 6);
  let secondPart = birthId.substring(6);
  return `${firstPart}/${secondPart}`;
}

function nextNumberDivided11(value: number) {
  return Math.ceil(value / 11) * 11;
}

function paddingLeft(digit: number): string {
  return String(digit).padStart(2, "0");
}

function paddingRight(value: number, paddingCount: number): string {
  return String(value).padEnd(String(value).length + paddingCount, "0");
}