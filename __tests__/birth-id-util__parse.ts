import { parseBirthId } from "../utils/birth-id-util";

describe("parse birth id", function () {
  it("do not parse invalid birth id", function (assert) {
    let result = parseBirthId("000/11");
    expect(result).toBeNull();
    assert();
  });

  it("male", function (assert) {
    let result = parseBirthId("160304/0010");
    expect(result).not.toBeNull();
    expect(result).toBeInstanceOf(Date);
    expect(result!.getDate()).toEqual(4);
    expect(result!.getMonth()).toEqual(2);
    expect(result!.getFullYear()).toEqual(2016);

    result = parseBirthId("540304/0016");
    expect(result).not.toBeNull();
    expect(result).toBeInstanceOf(Date);
    expect(result!.getDate()).toEqual(4);
    expect(result!.getMonth()).toEqual(2);
    expect(result!.getFullYear()).toEqual(1954);
    assert();
  });

  it("male (3 digits after /)", function (assert) {
    let result = parseBirthId("211207/001");
    expect(result).not.toBeNull();
    expect(result).toBeInstanceOf(Date);
    expect(result!.getDate()).toEqual(7);
    expect(result!.getMonth()).toEqual(11);
    expect(result!.getFullYear()).toEqual(1921);

    result = parseBirthId("530304/001");
    expect(result).not.toBeNull();
    expect(result).toBeInstanceOf(Date);
    expect(result!.getDate()).toEqual(4);
    expect(result!.getMonth()).toEqual(2);
    expect(result!.getFullYear()).toEqual(1953);
    assert();
  });

  it("female", function (assert) {
    let result = parseBirthId("165305/0014");
    expect(result).not.toBeNull();
    expect(result).toBeInstanceOf(Date);
    expect(result!.getDate()).toEqual(5);
    expect(result!.getMonth()).toEqual(2);
    expect(result!.getFullYear()).toEqual(2016);

    result = parseBirthId("545304/0010");
    expect(result).not.toBeNull();
    expect(result).toBeInstanceOf(Date);
    expect(result!.getDate()).toEqual(4);
    expect(result!.getMonth()).toEqual(2);
    expect(result!.getFullYear()).toEqual(1954);
    assert();
  });

  it("female (3 digits after /)", function (assert) {
    let result = parseBirthId("216207/000");
    expect(result).not.toBeNull();
    expect(result).toBeInstanceOf(Date);
    expect(result!.getDate()).toEqual(7);
    expect(result!.getMonth()).toEqual(11);
    expect(result!.getFullYear()).toEqual(1921);

    result = parseBirthId("535304/001");
    expect(result).not.toBeNull();
    expect(result).toBeInstanceOf(Date);
    expect(result!.getDate()).toEqual(4);
    expect(result!.getMonth()).toEqual(2);
    expect(result!.getFullYear()).toEqual(1953);
    assert();
  });
});
