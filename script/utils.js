export function createClickButtonEvent(idButton, functionUse, objectBlindtest) {
    const button = document.querySelector(idButton);
    if (button) {
        // button.addEventListener('click', functionUse);
        button.addEventListener('click', (event) => {
            event.preventDefault();
            functionUse();
        });
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

export function addOptionToSelect(select, optionValue, optionText) {
    const option = document.createElement('option');
    option.value = optionValue;
    option.text = optionText;
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
        const divPointInfo = createTagWithParentClassContent('div', divResponse, 'response-pointInfos');
        const divNamePointInfo = createTagWithParentClassContent('div', divPointInfo, null, pointInfo.name);
        const divValuePointInfo = createTagWithParentClassContent('div', divPointInfo, classVisible, pointInfo.value);
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
        .map((participant) => addparticipantScore(partyBlindtest, divParticipantsScore, participant));
}

export function addparticipantScore(partyBlindtest, divParticipantsScore, participant) {
    const divParticipant = createTagWithParentClassContent('div', divParticipantsScore);
    const divParticipantDelete = createTagWithParentClassContent('i', divParticipant, 'fa-solid fa-trash');
    divParticipantDelete.addEventListener('click', (event) => {
        partyBlindtest.deleteParticipant(participant);
    });
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

    // let pathname = value;
    // if (href.includes('github')) {
    //     pathname = `/${projectName}${pathname}`;
    // }
    let pathname = href.includes('github') ? `/${projectName}${value}` : value;

    console.log(`getPathnameFromValue : value : ${value}, pathname : ${pathname}`);
    return pathname;
}
export function getValueFromPathname() {
    const pathname = window.location.pathname;
    const href = window.location.href;
    const projectName = 'blindtest';
    let value = pathname;
    if (href.includes('github')) {
        value = pathname.replace(`/${projectName}`, '');
    }
    console.log(`getValueFromPathname : value : ${value}, pathname : ${pathname}`);
    return value;
}

export async function researchFromYoutubeLink() {
    const youtubeLink = document.querySelector('#linkYoutubeInput').value;
    const videoId = youtubeLink.split('v=')[1].split('&')[0];
    console.log('youtubeLink :', youtubeLink);
    console.log('videoId :', videoId);
    // const password = getPassword();
    const password = 'GJrss12dfoe';
    const cryptedApiKey = 'U2FsdGVkX1/mCdde5zXD5+UC5ZAWM94LlJF559ukbyxuan9OC80O/HRXvBNvnAtcKue3Tzd8Um24QRjSpqBn3g==';
    const decryptedApiKey = decrypt(cryptedApiKey, password);
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${decryptedApiKey}&part=snippet`;

    try {
        const response = await fetch(apiUrl);
        console.log('response :', response);
        const data = await response.json();
        console.log('data :', data);
        const title = data.items[0].snippet.title;
        const channelName = data.items[0].snippet.channelTitle;
        console.log('title :', title);
        console.log('channel :', channelName);
        // document.getElementById('videoTitle').innerText = title;
    } catch (error) {
        console.error('Error fetching video title:', error);
        // document.getElementById('videoTitle').innerText = 'Error fetching video title';
    }
}

function encrypt(message, password) {
    return CryptoJS.AES.encrypt(message, password).toString();
}

function decrypt(encryptedMessage, password) {
    const bytes = CryptoJS.AES.decrypt(encryptedMessage, password);
    return bytes.toString(CryptoJS.enc.Utf8);
}

function getPassword() {
    const password = document.querySelector('#passwordInput').value;
    return password;
}

export function passwordIsGood() {
    const password = getPassword();
}
