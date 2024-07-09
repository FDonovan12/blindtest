import { PartyBlindtest } from './objectValueBlindtest.js';
import { addResponse, addParticipantsScore } from './utils.js';

let partyBlindtest = null;

window.addEventListener('load', () => {
    updateStatus();
    // addResponse();
});

window.addEventListener('storage', updateStatus);
function updateStatus() {
    console.log('updateStatus');
    partyBlindtest = PartyBlindtest.get();
    console.log(partyBlindtest);
    addResponse(partyBlindtest);
    addParticipantsScore(partyBlindtest);
}
