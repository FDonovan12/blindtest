import { PartyBlindtest } from './objectValueBlindtest.js';
import { readJsonSynchrone, addResponse, createClickButton } from './utils.js';
import unitTest from './unitTest.js';

let partyBlindtest = null;

window.addEventListener('load', () => {
    unitTest();
    partyBlindtest = new PartyBlindtest(readJsonSynchrone('current.json')['blindtest']);
    partyBlindtest.save();
    try {
        document.querySelector('#openAudience').addEventListener('click', function () {
            window.open('audience.html', 'Audience').focus();
        });
    } catch (error) {}
    // createClickButton('#openAudience', window.open('audience.html', 'Audience').focus());
    createClickButton('#pause', partyBlindtest.pauseMusic.bind(partyBlindtest));
    createClickButton('#play', partyBlindtest.playMusic.bind(partyBlindtest));
    createClickButton('#previous', partyBlindtest.previousMusic.bind(partyBlindtest));
    createClickButton('#next', partyBlindtest.nextMusic.bind(partyBlindtest));
    addResponse(partyBlindtest);
    console.log(partyBlindtest.getSection());
    const player = partyBlindtest.getParticipants()[1];
    console.log(player);
    console.log(partyBlindtest.getSection().computeScoreOfPlayer(player));
});
