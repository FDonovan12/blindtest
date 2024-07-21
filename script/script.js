import { PartyBlindtest } from './objectValueBlindtest.js';
import {
    readJsonSynchrone,
    createClickButtonEvent,
    getValueFromPathname,
    getPathnameFromValue,
    researchFromYoutubeLink,
} from './utils.js';
import unitTest from './unitTest.js';

let partyBlindtest = null;

createClickButtonEvent('#password', start);
start();
window.addEventListener('load', () => {});

window.addEventListener('storage', PartyBlindtest.updateStatus);

function start() {
    unitTest();
    getPathnameFromValue('presenter.html');
    getValueFromPathname();
    partyBlindtest = new PartyBlindtest(readJsonSynchrone('current.json')['blindtest']);
    console.log(partyBlindtest);
    partyBlindtest.save();
    console.log('\nelement :', partyBlindtest);
    console.log(' :', PartyBlindtest.get());
    PartyBlindtest.updateStatus();
    console.log('\nelement :', partyBlindtest);
    console.log(' :', PartyBlindtest.get());
    partyBlindtest.save();
    console.log('\nelement :', partyBlindtest);
    console.log(' :', PartyBlindtest.get());

    try {
        document.querySelector('#openAudience').addEventListener('click', function () {
            window.open('audience.html', 'Audience').focus();
        });
    } catch (error) {}

    try {
        document.querySelector('#readJson').addEventListener('click', function () {
            partyBlindtest = new PartyBlindtest(
                readJsonSynchrone('current.json')['blindtest'],
                true
            );
            partyBlindtest.save();
        });
    } catch (error) {}

    createClickButtonEvent('#play', partyBlindtest.playAndPauseMusic.bind(partyBlindtest));
    createClickButtonEvent('#previous', partyBlindtest.previousMusic.bind(partyBlindtest));
    createClickButtonEvent('#next', partyBlindtest.nextMusic.bind(partyBlindtest));
    // createClickButtonEvent('#next', partyBlindtest.nextMusic, partyBlindtest);
    createClickButtonEvent('#downloadAnchorElem', partyBlindtest.download.bind(partyBlindtest));
    createClickButtonEvent('#addParticpant', partyBlindtest.addParticpant.bind(partyBlindtest));
    createClickButtonEvent('#addLinkYoutube', researchFromYoutubeLink);
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
