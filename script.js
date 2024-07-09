import { PartyBlindtest } from './objectValueBlindtest.js';
import {
    readJsonSynchrone,
    addResponse,
    createClickButton,
    addParticipantsScore,
} from './utils.js';
import unitTest from './unitTest.js';

let partyBlindtest = null;

window.addEventListener('load', () => {
    unitTest();
    partyBlindtest = new PartyBlindtest(readJsonSynchrone('current.json')['blindtest']);
    console.log(partyBlindtest);
    partyBlindtest.save();
    try {
        document.querySelector('#openAudience').addEventListener('click', function () {
            window.open('audience.html', 'Audience').focus();
        });
    } catch (error) {}
    // createClickButton('#openAudience', window.open('audience.html', 'Audience').focus());
    createClickButton('#play', partyBlindtest.playAndPauseMusic.bind(partyBlindtest));
    createClickButton('#previous', partyBlindtest.previousMusic.bind(partyBlindtest));
    createClickButton('#next', partyBlindtest.nextMusic.bind(partyBlindtest));
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
    addResponse(partyBlindtest);
    addParticipantsScore(partyBlindtest);
    const player = partyBlindtest.getParticipants()[1];
});
