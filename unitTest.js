import { PartyBlindtest } from './objectValueBlindtest.js';
import { readJsonSynchrone } from './utils.js';

export default function unitTest() {
    unitTestWithoutBlindtestAttribut();
    unitTestCopy();
    unitTestcopyStringify();
    unitTestSaveAndGet();
    unitTestNextMusicSaveAndGet();
    unitTestNotResetStorageIfSameBlindtest();
}
function unitTestWithoutBlindtestAttribut() {
    const constPartyBlindtest = new PartyBlindtest(readJsonSynchrone('current.json')['blindtest']);
    const withoutBlindtestAttribut = new PartyBlindtest(readJsonSynchrone('current.json'));
    assertEquals(constPartyBlindtest, withoutBlindtestAttribut, 'unitTestWithoutBlindtestAttribut');
}
function unitTestCopy() {
    const constPartyBlindtest = new PartyBlindtest(readJsonSynchrone('current.json')['blindtest']);
    const copy = new PartyBlindtest(constPartyBlindtest);
    assertEquals(constPartyBlindtest, copy, 'unitTestCopy');
}
function unitTestcopyStringify() {
    const constPartyBlindtest = new PartyBlindtest(readJsonSynchrone('current.json')['blindtest']);
    const copyStringify = new PartyBlindtest(JSON.stringify(constPartyBlindtest));
    assertEquals(constPartyBlindtest, copyStringify, 'unitTestcopyStringify');
}
function unitTestSaveAndGet() {
    const constPartyBlindtest = new PartyBlindtest(readJsonSynchrone('current.json')['blindtest']);
    constPartyBlindtest.save('unitTestSaveAndGet');
    const saveAndGet = PartyBlindtest.get('unitTestSaveAndGet');
    assertEquals(constPartyBlindtest, saveAndGet, 'unitTestSaveAndGet');
}
function unitTestNextMusicSaveAndGet() {
    const constPartyBlindtest = new PartyBlindtest(readJsonSynchrone('current.json')['blindtest']);
    // constPartyBlindtest.nextMusic();
    constPartyBlindtest.save('unitTestSaveAndGet');
    const saveAndGet = PartyBlindtest.get('unitTestSaveAndGet');
    assertEquals(constPartyBlindtest, saveAndGet, 'unitTestNextMusicSaveAndGet');
}
function unitTestNotResetStorageIfSameBlindtest() {
    const constPartyBlindtest = new PartyBlindtest(readJsonSynchrone('current.json')['blindtest']);
    constPartyBlindtest.currentMusic = 1;
    // constPartyBlindtest.nextMusic();
    constPartyBlindtest.save('unitTestNotResetStorageIfSameBlindtest');
    const secondPartyBlindtest = new PartyBlindtest(readJsonSynchrone('current.json')['blindtest']);
    console.log(constPartyBlindtest);
    console.log(secondPartyBlindtest);
    // const saveAndGet = PartyBlindtest.get('unitTestNotResetStorageIfSameBlindtest');
    assertEquals(
        constPartyBlindtest,
        secondPartyBlindtest,
        'unitTestNotResetStorageIfSameBlindtest'
    );
}

function assertEquals(param1, param2, errorMessage) {
    // console.warn(errorMessage);
    if (JSON.stringify(param1) !== JSON.stringify(param2)) {
        console.error(errorMessage);
        // throw new Error(errorMessage);
    }
}
