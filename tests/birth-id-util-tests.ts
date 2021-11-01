/*
/!* jshint expr:true *!/
import { module, test } from 'qunit';
import {
    parseRodneCislo,
    validateRodneCislo
} from 'expert2/utils/rodne-cislo-util';

module('rodneCisloUtil', function () {
    test('parses rodne cislo - male', function (assert) {
        let result = parseRodneCislo('160304/0010');
        assert.notEqual(result, null);
        assert.true(result instanceof Date);
        assert.equal(result.getDate(), 4);
        assert.equal(result.getMonth(), 2);
        assert.equal(result.getFullYear(), 2016);

        result = parseRodneCislo('540304/0016');
        assert.notEqual(result, null);
        assert.true(result instanceof Date);
        assert.equal(result.getDate(), 4);
        assert.equal(result.getMonth(), 2);
        assert.equal(result.getFullYear(), 1954);
    });

    test('parses rodne cislo - male (3 digits after /)', function (assert) {
        let result = parseRodneCislo('211207/001');
        assert.notEqual(result, null);
        assert.true(result instanceof Date);
        assert.equal(result.getDate(), 7);
        assert.equal(result.getMonth(), 11);
        assert.equal(result.getFullYear(), 1921);

        result = parseRodneCislo('530304/001');
        assert.notEqual(result, null);
        assert.true(result instanceof Date);
        assert.equal(result.getDate(), 4);
        assert.equal(result.getMonth(), 2);
        assert.equal(result.getFullYear(), 1953);
    });

    test('parses rodne cislo - female', function (assert) {
        let result = parseRodneCislo('165305/0014');
        assert.notEqual(result, null);
        assert.true(result instanceof Date);
        assert.equal(result.getDate(), 5);
        assert.equal(result.getMonth(), 2);
        assert.equal(result.getFullYear(), 2016);

        result = parseRodneCislo('545304/0010');
        assert.notEqual(result, null);
        assert.true(result instanceof Date);
        assert.equal(result.getDate(), 4);
        assert.equal(result.getMonth(), 2);
        assert.equal(result.getFullYear(), 1954);
    });

    test('parses rodne cislo - female (3 digits after /)', function (assert) {
        let result = parseRodneCislo('216207/000');
        assert.notEqual(result, null);
        assert.true(result instanceof Date);
        assert.equal(result.getDate(), 7);
        assert.equal(result.getMonth(), 11);
        assert.equal(result.getFullYear(), 1921);

        result = parseRodneCislo('535304/001');
        assert.notEqual(result, null);
        assert.true(result instanceof Date);
        assert.equal(result.getDate(), 4);
        assert.equal(result.getMonth(), 2);
        assert.equal(result.getFullYear(), 1953);
    });

    [
        { rodneCisloString: '', valid: false },
        { rodneCisloString: null, valid: false },
        { rodneCisloString: undefined, valid: false },
        { rodneCisloString: '891017/8772', valid: true },
        { rodneCisloString: '491017/877', valid: true },
        { rodneCisloString: '491017877', valid: false },
        { rodneCisloString: '495417/877', valid: true },
        { rodneCisloString: '495417/877_', valid: false },
        { rodneCisloString: '4954X7/8772', valid: false },
        { rodneCisloString: '600307/0017', valid: false } //nie je delitelne 11
    ].forEach((testDef, index) =>
        test(`validates rodne cislo - test suite #${index}: ${
            testDef.rodneCisloString
        } should be ${testDef.valid ? 'valid' : 'invalid'}`, function (assert) {
            let { rodneCisloString, valid } = testDef;

            let validationResult = validateRodneCislo(rodneCisloString);
            assert.equal(validationResult, valid);
        })
    );
});
*/
