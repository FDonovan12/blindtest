import { PartyBlindtest } from './objectValueBlindtest.js';
import { TagBuilder } from './tagBuilder.js';

export function createClickEventOnButton(idButton, functionUse, mainObject) {
    const button = document.querySelector(idButton);
    if (button) {
        // button.addEventListener('click', functionUse);
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const objectBlindtest = mainObject?.partyBlindtest;
            functionUse.call(objectBlindtest);
        });
    } else {
        console.warn(`Button ${idButton} not find in the page ${window.location.href}`);
    }
}

export function isAudience() {
    const href = window.location.href;
    const boolean = href.includes('audience');
    return boolean;
}

export function setLocalStorage(name, object) {
    localStorage.setItem(name, JSON.stringify(object));
}

export function getLocalStorage(name) {
    return JSON.parse(localStorage.getItem(name));
}

export function addOptionToSelect(select, optionValue, optionText, classCss) {
    const option = document.createElement('option');
    option.className = classCss;
    option.value = optionValue;
    option.text = optionText;
    if (!optionText) {
        // Assurez-vous que l'option par défaut est marquée comme sélectionnée
        option.selected = true;
    }
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

function secondsToTime(seconds) {
    const secondsRest = seconds % 60;
    const minutes = Math.floor(seconds / 60) % 60;
    const hours = Math.floor(seconds / 3600);
    const result = `${hours}h ${minutes}m ${secondsRest}s`;
    return result;
}

export function createResponse(partyBlindtest, divResponse) {
    // const divSection = createTagWithParentClassContent('div', divResponse);
    // const divSection = new TagBuilder('div', divResponse).build();
    // const divSectionName2 = createTagWithParentClassContent('div', divResponse, 'h4', partyBlindtest.getSection().name);
    const divSectionName = new TagBuilder('div', divResponse).setClass('h4').setTextContent(partyBlindtest.getSection().name).build();
    const divSectionDetails = new TagBuilder('div', divResponse).setClass('section-details').build();
    const divSectionDetailsContent = new TagBuilder('div', divSectionDetails).setTextContent(partyBlindtest.getSection().details).build();
    const divCurrentMusicNumberSection = new TagBuilder('div', divSectionDetails)
        .setTextContent(`Musique ${partyBlindtest.currentMusic + 1} / ${partyBlindtest.getSection().musics.length}`)
        .build();
    const divTotalTime = new TagBuilder('div', divResponse)
        .setTextContent(`${secondsToTime(partyBlindtest.getDuration())} : ${partyBlindtest.getDuration()}s`)
        .build();
    const pointInfos = partyBlindtest.getMusic().pointInfos;
    pointInfos?.map((pointInfo) => {
        pointInfo.createHtmlContent(partyBlindtest, divResponse);
        // let classVisible = null;
        // if (isAudience()) {
        //     if (!(pointInfo.participant || pointInfo.isVisible)) {
        //         classVisible = 'invisible';
        //     }
        // }
        // // const classVisible =  && !(pointInfo.participant || pointInfo.isVisible) ? 'invisible' : null;
        // const divPointInfo = createTagWithParentClassContent('div', divResponse, 'response-pointInfos');
        // const divVisiblePointinfo = createTagWithParentClassContent('div', divPointInfo, 'fa-solid fa-eye');

        // divVisiblePointinfo.addEventListener('click', () => {
        //     pointInfo.makeVisible(partyBlindtest);
        // });
        // if (isAudience()) {
        //     const divValueparticipant = createTagWithParentClassContent(
        //         'div',
        //         divPointInfo,
        //         null,
        //         pointInfo?.participant?.name
        //     );
        // } else {
        //     const selectValuePointInfo = createTagWithParentClassContent('select', divPointInfo);
        //     selectValuePointInfo.addEventListener('change', (value) => {
        //         pointInfo.changeParticipant(selectValuePointInfo.value, partyBlindtest);
        //     });
        //     addOptionToSelect(selectValuePointInfo, undefined, undefined);
        //     partyBlindtest.getParticipants().map((participant, index) => {
        //         addOptionToSelect(selectValuePointInfo, participant.name, participant.name);
        //         if (participant.name === pointInfo?.participant?.name) {
        //             selectValuePointInfo.selectedIndex = index + 1;
        //         }
        //     });
        //     // divVisiblePointinfo.addEventListener('click', pointInfo.makeVisible);
        // }
        // const divNamePointInfo = createTagWithParentClassContent('input', divPointInfo, 'inputToEnd', pointInfo.name);
        // divNamePointInfo.value = pointInfo.name;
        // divNamePointInfo.addEventListener('input', (event) => {
        //     pointInfo.changeValue(event.target.value, pointInfo.value, partyBlindtest);
        // });
        // const divValuePointInfo = createTagWithParentClassContent('input', divPointInfo, classVisible, pointInfo.value);
        // divValuePointInfo.value = pointInfo.value;
        // divValuePointInfo.addEventListener('input', (event) => {
        //     pointInfo.changeValue(pointInfo.name, event.target.value, partyBlindtest);
        // });
    });
}
export function addParticipantsScore(partyBlindtest) {
    const divParticipantsScore = document.querySelector('#participants');
    divParticipantsScore.innerHTML = null;
    partyBlindtest.getParticipants().map((participant) => addparticipantScore(partyBlindtest, divParticipantsScore, participant));
}

export function addparticipantScore(partyBlindtest, divParticipantsScore, participant) {
    const divParticipant = createTagWithParentClassContent('div', divParticipantsScore, participant.classCss);
    const divParticipantDelete = createTagWithParentClassContent('i', divParticipant, 'fa-solid fa-trash');
    divParticipantDelete.addEventListener('click', (event) => {
        partyBlindtest.deleteParticipant(participant);
    });
    const divParticipantName = createTagWithParentClassContent('div', divParticipant, null, 'Joueur : ' + participant.name);
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

    // console.log(`getPathnameFromValue : value : ${value}, pathname : ${pathname}`);
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
    // console.log(`getValueFromPathname : value : ${value}, pathname : ${pathname}`);
    return value;
}

export async function researchFromYoutubeLink() {
    const youtubeLink = document.querySelector('#linkYoutubeInput').value;
    const videoId = youtubeLink.split('v=')[1].split('&')[0];
    const password = getPassword();
    const cryptedApiKey = 'U2FsdGVkX1/mCdde5zXD5+UC5ZAWM94LlJF559ukbyxuan9OC80O/HRXvBNvnAtcKue3Tzd8Um24QRjSpqBn3g==';
    const decryptedApiKey = decrypt(cryptedApiKey, password);
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${decryptedApiKey}&part=snippet,contentDetails`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const title = data.items[0].snippet.title;
        const durationString = data.items[0]?.contentDetails?.duration;
        const channelName = data.items[0].snippet.channelTitle;
        resetPointInfo();
        addFormPointInfo('Chanteur', channelName);
        addFormPointInfo('Titre', title);
    } catch (error) {
        console.error('Error fetching video title:', error);
    }
}

function parseYouTubeDurationToSeconds(duration) {
    const regex = /PT(\d+H)?(\d+M)?(\d+S)?/;
    const matches = duration.match(regex);

    const hours = parseInt(matches[1]) || 0;
    const minutes = parseInt(matches[2]) || 0;
    const seconds = parseInt(matches[3]) || 0;
    return (hours * 60 + minutes) * 60 + seconds;
}

function slugify(content) {
    content = content.toLowerCase();
    // content = content.replace(/(^a-z0-9|\s|\(|\)|\W)+/gi, ' ');
    content = content.replace(/[^a-z0-9\s]+/gi, ' '); // TODO very strange try to undertand why this is "work"
    content = content.trim();
    content = content.replace(/ +/gi, '-');
    return content;
    return content.toLowerCase().replace(/\W+/i, ' ').trim().replaceAll(' ', '-');
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

export function addFormPointInfo(contentTitle, contentValue) {
    const blockPointInfos = document.querySelector('#blockOfPointInfos');
    const divPointInfo = createTagWithParentClassContent('div', blockPointInfos);
    const inputTitlePointInfo = createTagWithParentClassContent('input', divPointInfo);
    const inputValuePointInfo = createTagWithParentClassContent('input', divPointInfo);
    inputTitlePointInfo.placeholder = 'Titre Point infos';
    inputTitlePointInfo.type = 'text';
    if (contentTitle) {
        inputTitlePointInfo.value = contentTitle;
    }
    inputValuePointInfo.placeholder = 'Value Point infos';
    inputValuePointInfo.type = 'text';
    if (contentValue) {
        inputValuePointInfo.value = contentValue;
    }
}

function resetPointInfo() {
    const blockPointInfos = document.querySelector('#blockOfPointInfos');
    blockPointInfos.innerHTML = '';
}
