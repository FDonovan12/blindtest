class Blindtest {
    constructor(blindtest) {
        this.name = blindtest['name'];
        this.participants = blindtest['participants'].map(
            (participant) => new Participant(participant['name'])
        );
        this.rubriques = blindtest['rubriques'].map(
            (rubrique) => new Rubrique(rubrique['name'], rubrique['musiques'])
        );
    }
}
class Rubrique {
    constructor(name, musiques) {
        this.name = name;
        this.musiques = musiques.map(
            (musique) => new Musique(musique['link'], musique['pointInfos'])
        );
    }
}
class Musique {
    constructor(link, pointInfos) {
        this.link = link;
        this.pointInfos = pointInfos.map(
            (pointInfo) => new PointInfo(pointInfo['name'], pointInfo['value'])
        );
    }
}
class PointInfo {
    constructor(name, value, particpant) {
        this.name = name;
        this.value = value;
        this.particpant = particpant || null;
    }
}
class Participant {
    constructor(name) {
        this.name = name;
    }
}
class ResponseInfos {
    constructor(pointInfo) {
        this.pointInfo = pointInfo;
        this.isShow = isShow;
    }
}

window.addEventListener('load', () => {
    openAudience();
    const music = 'https://www.youtube.com/watch?v=dWz2BWGxqMI';
    audio = new Audio(music);
    blindtest = readJsonSynchrone('current.json')['blindtest'];
    const test = new Blindtest(blindtest);
    const test2 = new Blindtest(JSON.parse(JSON.stringify(test)));
    console.log('PointInfo :', test.rubriques[0]);
    console.log('test1 :', test);
    console.log('test2 :', test2);
    console.log('test1 :', JSON.stringify(test));
    console.log('blin2 :', JSON.stringify(blindtest));
    console.log('blindtest12 :', blindtest);
    console.log('blindtest :', JSON.parse(localStorage.getItem('blindtest')));
    getTruc();
    document.getElementById('pause').addEventListener('click', function () {
        audio.pause();
    });
    document.getElementById('play').addEventListener('click', function () {
        audio.play();
    });
    document.getElementById('suivant').addEventListener('click', function () {
        changeMusique();
    });
});

currentMusic = 0;
currentRubrique = 0;
blindtest = null;

function getTruc() {
    console.log('element :');
    const participant = JSON.parse(localStorage.getItem('participants'));
    document.querySelector('#participants').textContent = participant;
    const rubrique = JSON.parse(localStorage.getItem('rubrique'));
    document.querySelector('#rubrique').textContent = rubrique['name'];
    const musique = JSON.parse(localStorage.getItem('musique'));
    audio = new Audio(musique['link']);
    document.querySelector('#musique').textContent = musique['titre'];
}

function changeMusique() {
    currentMusic += 1;
    audio.pause();
    const blindtest = getLocalStorage('blindtest');
    const rubrique = blindtest['rubriques'][currentRubrique];
    const music = rubrique['musiques'][currentMusic];
    setLocalStorage('musique', music);
    getTruc();
    // localStorage.setItem('music_audio', new Audio(music['link']));
    // localStorage.setItem('response', new Audio(music['titre']));
}

function setLocalStorage(name, object) {
    localStorage.setItem(name, JSON.stringify(object));
}

function getLocalStorage(name) {
    return JSON.parse(localStorage.getItem(name));
}

function setLocal(data) {
    const blindtest = data['blindtest'];
    const participants = blindtest['participants'];
    const rubrique = blindtest['rubriques'][0];
    const musique = rubrique['musiques'][currentMusic];
    console.log(data);
    localStorage.setItem('blindtest', JSON.stringify(blindtest));
    localStorage.setItem('participants', JSON.stringify(participants));
    localStorage.setItem('rubrique', JSON.stringify(rubrique));
    localStorage.setItem('musique', JSON.stringify(musique));
}

async function readJson() {
    const response = await fetch('current.json');
    const data = await response.json();
    console.log('data :', data);
    blindtest = data;
    localStorage.setItem('blindtest', data);
    return data;
}

function readJsonSynchrone(file) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', file, false);

    try {
        xhr.send();
        if (xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            setLocal(data);
            return data;
        } else {
            console.error(
                'Erreur de lecture du fichier JSON: ' + xhr.statusText
            );
        }
    } catch (e) {
        console.error("Une erreur s'est produite:", e);
    }
}

function readBlind() {
    console.log('blindtest :', localStorage.getItem('blindtest'));
    console.log('blindtest :', localStorage.getItem('blindtest')['blindtest']);
}

function openAudience() {
    try {
        document
            .getElementById('openAudience')
            .addEventListener('click', function () {
                window.open('audience.html', 'Audience').focus();
            });
    } catch (error) {}
}
