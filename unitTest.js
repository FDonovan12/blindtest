import { PartyBlindtest } from './objectValueBlindtest.js';
import { readJsonSynchrone, getLinkValue } from './utils.js';

const testFileName = 'current.json';

export default function unitTest() {
    unitTestWithoutBlindtestAttribut();
    unitTestCopy();
    unitTestcopyStringify();
    unitTestSaveAndGet();
    unitTestNextMusicSaveAndGet();
}
function unitTestWithoutBlindtestAttribut() {
    const constPartyBlindtest = new PartyBlindtest(
        readJsonSynchrone(getLinkValue(testFileName))['blindtest']
    );
    const withoutBlindtestAttribut = new PartyBlindtest(
        readJsonSynchrone(getLinkValue(testFileName))
    );
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
    constPartyBlindtest.nextMusic();
    constPartyBlindtest.save('unitTestSaveAndGet');
    const saveAndGet = PartyBlindtest.get('unitTestSaveAndGet');
    assertEquals(constPartyBlindtest, saveAndGet, 'unitTestNextMusicSaveAndGet');
}

function assertEquals(param1, param2, errorMessage) {
    // console.warn(errorMessage);
    if (JSON.stringify(param1) !== JSON.stringify(param2)) {
        console.error(errorMessage);
        // throw new Error(errorMessage);
    }
}
