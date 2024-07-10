import { PartyBlindtest } from './objectValueBlindtest.js';
import {
    readJsonSynchrone,
    createClickButton,
    getValueFromPathname,
    getPathnameFromValue,
} from './utils.js';
import unitTest from './unitTest.js';

let partyBlindtest = null;

function start() {
    unitTest();
    getPathnameFromValue('presenter.html');
    getValueFromPathname();
    partyBlindtest = new PartyBlindtest(readJsonSynchrone('current.json')['blindtest']);
    console.log(partyBlindtest);
    partyBlindtest.save();
    PartyBlindtest.updateStatus();

    try {
        document.querySelector('#openAudience').addEventListener('click', function () {
            window.open('audience.html', 'Audience').focus();
        });
    } catch (error) {}
    createClickButton('#play', partyBlindtest.playAndPauseMusic.bind(partyBlindtest));
    createClickButton('#previous', partyBlindtest.previousMusic.bind(partyBlindtest));
    createClickButton('#next', partyBlindtest.nextMusic.bind(partyBlindtest));
    createClickButton('#downloadAnchorElem', partyBlindtest.download.bind(partyBlindtest));
    window.addEventListener('keydown', (key) => {
        console.log('key :', key);
        switch (key.code) {
            case 'Space':
                key.preventDefault();
                partyBlindtest.playAndPauseMusic();
                break;
            case 'ArrowRight':
                key.preventDefault();
                partyBlindtest.nextMusic();
                break;
            case 'ArrowLeft':
                key.preventDefault();
                partyBlindtest.previousMusic();
                break;

            default:
                break;
        }
    });
}
start();
window.addEventListener('load', () => {});

window.addEventListener('storage', PartyBlindtest.updateStatus);
