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

export function createTagWithParentClassContent(name_balise, balise_parent, class_balise, content) {
    const balise = document.createElement(name_balise);
    if (class_balise) {
        balise.className = class_balise;
    }
    if (balise_parent) {
        balise_parent.appendChild(balise);
    }
    if (content != null) {
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
        if (pointInfo?.participant?.name === 'undefined') {
            pointInfo.participant = undefined;
        }
        const classVisible = isAudience() && !pointInfo.participant ? 'invisible' : null;
        const divPointInfo = createTagWithParentClassContent(
            'div',
            divResponse,
            'response-pointInfos'
        );
        const divNamePointInfo = createTagWithParentClassContent(
            'div',
            divPointInfo,
            null,
            pointInfo.name
        );
        const divValuePointInfo = createTagWithParentClassContent(
            'div',
            divPointInfo,
            classVisible,
            pointInfo.value
        );
        if (isAudience()) {
            const divValueparticipant = createTagWithParentClassContent(
                'div',
                divPointInfo,
                null,
                pointInfo?.participant?.name
            );
        } else {
            const selectValuePointInfo = createTagWithParentClassContent('select', divPointInfo);
            selectValuePointInfo.addEventListener('change', (value) => {
                pointInfo.changeParticipant(selectValuePointInfo.value, partyBlindtest);
            });
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

export function addParticipantsScore(partyBlindtest) {
    const divParticipantsScore = document.querySelector('#participants');
    divParticipantsScore.innerHTML = null;
    partyBlindtest
        .getParticipants()
        .map((participant) =>
            addparticipantScore(partyBlindtest, divParticipantsScore, participant)
        );
}

export function addparticipantScore(partyBlindtest, divParticipantsScore, participant) {
    const divParticipant = createTagWithParentClassContent('div', divParticipantsScore);
    const divParticipantName = createTagWithParentClassContent(
        'div',
        divParticipant,
        null,
        'Joueur : ' + participant.name
    );
    const divParticipantScore = createTagWithParentClassContent(
        'div',
        divParticipant,
        null,
        'Point : ' + partyBlindtest.getScoreOfPlayer(participant)
    );
}

export function getPathnameFromValue(value) {
    const href = window.location.href;
    const projectName = 'blindtest';
    let pathname = value;
    if (href.includes('github')) {
        pathname = `${projectName}/${pathname}`;
    }
    console.log(`getPathnameFromValue : value : ${value}, pathname : ${pathname}`);
    return pathname;
}
export function getValueFromPathname() {
    const pathname = window.location.pathname;
    const href = window.location.href;
    const projectName = 'blindtest';
    let value = pathname;
    if (href.includes('github')) {
        value = pathname.replace(`${projectName}/`, '');
    }
    console.log(`getValueFromPathname : value : ${value}, pathname : ${pathname}`);
    return value;
}
