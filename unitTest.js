import {
    PartyBlindtest,
    changeLocalStorageName,
    resetLocalStorageName,
} from './objectValueBlindtest.js';
import { readJsonSynchrone, getLinkValue } from './utils.js';

const testFileName = 'current.json';

export default function unitTest() {
    unitTestWithoutBlindtestAttribut();
    unitTestCopy();
    unitTestcopyStringify();
    unitTestSaveAndGet();
    unitTestNextMusicSaveAndGet();
    unitTestNotResetStorageIfSameBlindtest();
}
function unitTestWithoutBlindtestAttribut() {
    const nameUnitTest = 'unitTestWithoutBlindtestAttribut';
    const fileName = getLinkValue(testFileName);
    console.log('fileName :', fileName);
    const constPartyBlindtest = new PartyBlindtest(readJsonSynchrone(fileName)['blindtest']);
    const withoutBlindtestAttribut = new PartyBlindtest(
        readJsonSynchrone(getLinkValue(testFileName))
    );
    assertEquals(constPartyBlindtest, withoutBlindtestAttribut, nameUnitTest);
}
function unitTestCopy() {
    const nameUnitTest = 'unitTestCopy';
    const constPartyBlindtest = new PartyBlindtest(readJsonSynchrone('current.json')['blindtest']);
    const copy = new PartyBlindtest(constPartyBlindtest);
    assertEquals(constPartyBlindtest, copy, nameUnitTest);
}
function unitTestcopyStringify() {
    const nameUnitTest = 'unitTestcopyStringify';
    const constPartyBlindtest = new PartyBlindtest(readJsonSynchrone('current.json')['blindtest']);
    const copyStringify = new PartyBlindtest(JSON.stringify(constPartyBlindtest));
    assertEquals(constPartyBlindtest, copyStringify, nameUnitTest);
}
function unitTestSaveAndGet() {
    const nameUnitTest = 'unitTestSaveAndGet';
    changeLocalStorageName(nameUnitTest);
    const constPartyBlindtest = new PartyBlindtest(readJsonSynchrone('current.json')['blindtest']);
    constPartyBlindtest.save(nameUnitTest);
    const saveAndGet = PartyBlindtest.get(nameUnitTest);
    assertEquals(constPartyBlindtest, saveAndGet, nameUnitTest);
    resetLocalStorageName();
}
function unitTestNextMusicSaveAndGet() {
    const nameUnitTest = 'unitTestNextMusicSaveAndGet';
    changeLocalStorageName(nameUnitTest);
    const constPartyBlindtest = new PartyBlindtest(readJsonSynchrone('current.json')['blindtest']);
    constPartyBlindtest.save(nameUnitTest);
    const saveAndGet = PartyBlindtest.get(nameUnitTest);
    assertEquals(constPartyBlindtest, saveAndGet, nameUnitTest);
    resetLocalStorageName();
}
function unitTestNotResetStorageIfSameBlindtest() {
    const nameUnitTest = 'unitTestNotResetStorageIfSameBlindtest';
    changeLocalStorageName(nameUnitTest);
    const constPartyBlindtest = new PartyBlindtest(readJsonSynchrone('current.json')['blindtest']);
    constPartyBlindtest.currentMusic = 1;
    constPartyBlindtest.save();
    const secondPartyBlindtest = new PartyBlindtest(readJsonSynchrone('current.json')['blindtest']);
    assertEquals(constPartyBlindtest, secondPartyBlindtest, nameUnitTest);
    resetLocalStorageName();
}

function assertEquals(param1, param2, errorMessage) {
    // console.warn(errorMessage);
    if (JSON.stringify(param1) !== JSON.stringify(param2)) {
        console.error(errorMessage);
        // throw new Error(errorMessage);
    }
}
