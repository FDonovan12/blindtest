import { PartyBlindtest, MainObject } from './objectValueBlindtest.js';
import { createClickEventOnButton, getValueFromPathname, getPathnameFromValue, researchFromYoutubeLink, addFormPointInfo } from './utils.js';
import unitTest from './unitTest.js';

let mainObject = new MainObject();
// let partyBlindtest = null;

createClickEventOnButton('#password', start);
start();
window.addEventListener('load', () => {});

window.addEventListener('storage', PartyBlindtest.updateStatus);
function start() {
    getPathnameFromValue('presenter.html');
    getValueFromPathname();
    mainObject.get();
    mainObject.partyBlindtest.save();
    PartyBlindtest.updateStatus();
    mainObject.partyBlindtest.save();

    try {
        document.querySelector('#openAudience').addEventListener('click', function () {
            window.open('audience.html', 'Audience').focus();
        });
    } catch (error) {}

    try {
        document.querySelector('#readJson').addEventListener('click', function () {
            mainObject.get(true);
            mainObject.partyBlindtest.save();
        });
    } catch (error) {}

    createClickEventOnButton('#downloadAnchorElem', mainObject.partyBlindtest.download, mainObject);
    createClickEventOnButton('#addParticpant', mainObject.partyBlindtest.addParticpant, mainObject);
    createClickEventOnButton('#addLinkYoutube', researchFromYoutubeLink);
    createClickEventOnButton('#addPointInfo', addFormPointInfo);
    createClickEventOnButton('#validMusic', mainObject.partyBlindtest.validMusic, mainObject);
}
