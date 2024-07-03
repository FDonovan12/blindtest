window.addEventListener('load', () => {
    openAudience();
    // const music = 'Alvaro Soler - Sofia.mp3';
    const music = 'https://www.youtube.com/watch?v=dWz2BWGxqMI';
    audio = new Audio(music);
    // readJson('current.json').then((data) => {
    //     console.log(data);
    // });
    blindtest = readJsonSynchrone('current.json');
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
    audio = new Audio(musique['lien']);
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
    // localStorage.setItem('music_audio', new Audio(music['lien']));
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
