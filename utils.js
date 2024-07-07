import { PartyBlindtest } from './objectValueBlindtest.js';

export function createClickButton(idButton, functionUse) {
    const button = document.querySelector(idButton);
    if (button) {
        button.addEventListener('click', functionUse);
    } else {
        console.warn(`Button ${idButton} not find in the page ${window.location.href}`);
    }
}

export function isAudience() {
    const href = window.location.href;
    return href.includes('audience');
}

export function setLocalStorage(name, object) {
    localStorage.setItem(name, JSON.stringify(object));
}

export function getLocalStorage(name) {
    return JSON.parse(localStorage.getItem(name));
}

export function addOptionToSelect(select, optionValue, OptionText) {
    const option = document.createElement('option');
    option.value = optionValue;
    option.text = OptionText;
    select.add(option);
}

export function baliseClass(name_balise, balise_parent, class_balise, content) {
    const balise = document.createElement(name_balise);
    if (class_balise) {
        balise.className = class_balise;
    }
    if (balise_parent) {
        balise_parent.appendChild(balise);
    }
    if (content) {
        balise.textContent = content;
    }
    return balise;
}

export function readJsonSynchrone(file) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', file, false);

    try {
        xhr.send();
        if (xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            return data;
        } else {
            console.error('Erreur de lecture du fichier JSON: ' + xhr.statusText);
        }
    } catch (e) {
        console.error("Une erreur s'est produite:", e);
    }
}

export function addResponse(partyBlindtest) {
    const divResponse = document.querySelector('#response');
    divResponse.innerHTML = null;
    createResponse(partyBlindtest, divResponse);
}

export function createResponse(partyBlindtest, divResponse) {
    const pointInfos = partyBlindtest.getMusic().pointInfos;
    pointInfos.map((pointInfo) => {
        const classVisible = isAudience() & !pointInfo.participant ? 'invisible' : null;
        const divPointInfo = baliseClass('div', divResponse, 'response-pointInfos');
        const divNamePointInfo = baliseClass('div', divPointInfo, null, pointInfo.name);
        const divValuePointInfo = baliseClass('div', divPointInfo, classVisible, pointInfo.value);
        if (isAudience()) {
            const divValueparticipant = baliseClass(
                'div',
                divPointInfo,
                null,
                pointInfo?.participant?.name
            );
        } else {
            const selectValuePointInfo = baliseClass('select', divPointInfo);
            addOptionToSelect(selectValuePointInfo, undefined, undefined);
            partyBlindtest.getParticipants().map((participant, index) => {
                addOptionToSelect(selectValuePointInfo, participant.name, participant.name);
                if (participant.name === pointInfo?.participant?.name) {
                    selectValuePointInfo.selectedIndex = index + 1;
                }
            });
        }
    });
}
