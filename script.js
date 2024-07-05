import { PartyBlindtest } from './objectValueBlindtest.js';

let partyBlindtest = null;

window.addEventListener('load', () => {
    partyBlindtest = new PartyBlindtest(readJsonSynchrone('current.json')['blindtest']);

    try {
        document.getElementById('openAudience').addEventListener('click', function () {
            window.open('audience.html', 'Audience').focus();
        });
    } catch (error) {}
    document.querySelector('#pause').addEventListener('click', function () {
        partyBlindtest.audio.pause();
    });
    document.querySelector('#play').addEventListener('click', function () {
        partyBlindtest.audio.play();
    });
    document.querySelector('#suivant').addEventListener('click', function () {
        partyBlindtest.nextMusic();
    });
});

function setLocalStorage(name, object) {
    localStorage.setItem(name, JSON.stringify(object));
}

function getLocalStorage(name) {
    return JSON.parse(localStorage.getItem(name));
}

function readJsonSynchrone(file) {
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
