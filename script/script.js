import { PartyBlindtest, MainObject } from './objectValueBlindtest.js';
import {
    createClickEventOnButton,
    getValueFromPathname,
    getPathnameFromValue,
    researchFromYoutubeLink,
    addFormPointInfo,
    isAudience,
} from './utils.js';
import unitTest from './unitTest.js';

function testTheme(numberOne, numberTwo) {
    const result = numberOne;
    let sum = 0;
    for (let i = 0; i < numberTwo; i++) {
        sum += result;
    }
    console.log('sum :', sum);
    return sum;
}
// console.log(fileName);
const mainObject = new MainObject();
console.log(mainObject);
// let partyBlindtest = null;

createClickEventOnButton('#password', start);
start();
window.addEventListener('load', () => {});
window.addEventListener('storage', PartyBlindtest.updateStatus);
function start() {
    // unitTest();
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

    createClickEventOnButton('#play', mainObject.partyBlindtest.playAndPauseMusic, mainObject);
    createClickEventOnButton('#previous', mainObject.partyBlindtest.previousMusic, mainObject);
    createClickEventOnButton('#next', mainObject.partyBlindtest.nextMusic, mainObject);
    createClickEventOnButton('#downloadAnchorElem', mainObject.partyBlindtest.download, mainObject);
    createClickEventOnButton('#addParticpant', mainObject.partyBlindtest.addParticpant, mainObject);
    createClickEventOnButton('#addLinkYoutube', researchFromYoutubeLink);
    // createClickEventOnButton('#addPointInfo', addFormPointInfo);
    window.addFormPointInfo = addFormPointInfo;
    createClickEventOnButton('#validMusic', mainObject.partyBlindtest.validMusic, mainObject);
    createClickEventOnButton('#shuffleMusics', mainObject.partyBlindtest.shuffleMusics, mainObject);
    try {
        document.querySelector('#music-audio').addEventListener('ended', () => {
            setTimeout(() => {
                mainObject.partyBlindtest.nextMusic();
                mainObject.partyBlindtest.playAndPauseMusic();
            }, 1000);
        });
    } catch (error) {}
    window.addEventListener('keydown', (key) => {
        if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
            return;
        }
        console.log('key :', key);
        switch (key.code) {
            case 'Space':
                key.preventDefault();
                mainObject.partyBlindtest.playAndPauseMusic();
                break;
            case 'ArrowRight':
                key.preventDefault();
                mainObject.partyBlindtest.nextMusic();
                break;
            case 'ArrowLeft':
                key.preventDefault();
                mainObject.partyBlindtest.previousMusic();
                break;

            default:
                break;
        }
    });
}

// Sélectionner les éléments du DOM
const audioElement = document.getElementById('music-audio');
const canvas = document.getElementById('audioVisualizer');
const ctx = canvas.getContext('2d');

// Redimensionner le canvas pour couvrir toute la fenêtre
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Créer un contexte audio
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const audioSource = audioContext.createMediaElementSource(audioElement);

// Créer un analyseur de fréquence
const analyser = audioContext.createAnalyser();
audioSource.connect(analyser);
analyser.connect(audioContext.destination);

// Configurer l'analyseur
analyser.fftSize = 256; // Taille de la transformée de Fourier (détermine la résolution)
const bufferLength = analyser.frequencyBinCount; // Nombre de valeurs de fréquence
let dataArray = new Uint8Array(bufferLength); // Tableau pour stocker les données de fréquence

const channel = new BroadcastChannel('audio-channel');

// Fonction de visualisation
function draw(dataArray) {
    // Définir l'animation
    console.log('draw');

    // Effacer le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Obtenir les données de fréquence
    // analyser.getByteFrequencyData(dataArray);
    // channel.postMessage(dataArray);

    // Dessiner les barres de visualisation
    const barWidth = (canvas.width / bufferLength) * 2.5;
    let barHeight;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];

        // Couleurs de la barre
        const r = barHeight + 25 * (i / bufferLength);
        const g = 250 * (i / bufferLength);
        const b = 50;

        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);

        x += barWidth;
    }
}
channel.onmessage = function (event) {
    if (isAudience()) {
        const receivedData = new Uint8Array(event.data); // Recevoir les données de fréquence
        dataArray.set(receivedData); // Mettre à jour le tableau local
        draw(receivedData); // Dessiner la visualisation avec les nouvelles données
        console.log('event.data : ', event.data);
        console.log('receivedData : ', receivedData);
        console.log('dataArray : ', dataArray);
        console.log('onmessage');
    }
};

function updateData() {
    analyser.getByteFrequencyData(dataArray);
    channel.postMessage(dataArray); // Envoyer les données aux autres fenêtres
    draw(dataArray); // Dessiner dans la fenêtre maître
    // requestAnimationFrame(updateData); // Appeler la mise à jour uniquement dans la fenêtre maître
    console.log('updateData');
}
audioElement.onplay = function () {
    // La première fenêtre à démarrer l'audio devient la fenêtre maître
    if (!isAudience()) {
        audioContext.resume().then(() => {
            function loop() {
                console.log('loop');
                if (audioElement.paused) return; // Arrêter la boucle si la musique est en pause
                // analyser.getByteFrequencyData(dataArray);
                // channel.postMessage(dataArray); // Envoyer les données aux autres fenêtres
                requestAnimationFrame(loop); // Continuer la boucle
                updateData();
            }
            loop(); // Démarrer la boucle
        });
    }
};

function bubbleSort(tab) {
    for (let i = 0; i < tab.length; i++) {
        for (let j = 0; j < tab.length - i - 1; j++) {
            if (tab[j] > tab[j + 1]) {
                echanger(tab, j, j + 1);
            }
        }
    }
    return tab;
}

function selectionSort(tab) {
    for (let i = 0; i < tab.length; i++) {
        let minIndex = i;
        let minValue = tab[minIndex];
        for (let j = i; j < tab.length; j++) {
            if (tab[j] < minValue) {
                minValue = tab[j];
                minIndex = j;
            }
        }
        echanger(tab, i, minIndex);
    }
    return tab;
}

function quickSort(tab) {
    return quickSortRec(tab, 0, tab.length - 1);
}

function quickSortRec(tab, minIndex, maxIndex) {
    if (minIndex < maxIndex) {
        let pivot = Math.trunc((minIndex + maxIndex) / 2);
        pivot = partition(tab, minIndex, maxIndex, pivot);
        quickSortRec(tab, minIndex, pivot - 1);
        quickSortRec(tab, pivot + 1, maxIndex);
    }
    return tab;
}

function printTab(tab) {
    tab.forEach((element) => {
        console.log(element);
    });
}

function mergeQuickSort(left, pivot, right) {
    const result = [];
    left.forEach((element) => {
        result.push(element);
    });
    result.push(pivot);
    right.forEach((element) => {
        result.push(element);
    });
}

function partition(tab, minIndex, maxIndex, pivot) {
    echanger(tab, pivot, maxIndex);
    let j = minIndex;
    for (let i = minIndex; i < maxIndex; i++) {
        if (tab[i] < tab[maxIndex]) {
            echanger(tab, i, j);
            j++;
        }
    }
    echanger(tab, maxIndex, j);
    return j;
}

function echanger(tab, i, j) {
    const temp = tab[j];
    tab[j] = tab[i];
    tab[i] = temp;
}

function firstPrimeNumber(numberOfPrimeNumber, usetab) {
    const tab = [];
    let count = 2;
    while (numberOfPrimeNumber > 0) {
        if (usetab) {
            if (isPrime(count, tab)) {
                tab.push(count);
                numberOfPrimeNumber--;
            }
        } else {
            if (isPrime(count)) {
                tab.push(count);
                numberOfPrimeNumber--;
            }
        }
        count++;
    }
    return tab;
}

function isPrime(number, precedentPrimeNumber) {
    // let isPrimeValue = true
    if (precedentPrimeNumber) {
        for (let i = 0; i < precedentPrimeNumber.length; i++) {
            const primeNumber = precedentPrimeNumber[i];
            if (number % primeNumber === 0) {
                return false;
            }
            if (primeNumber > Math.sqrt(number)) {
                return true;
            }
        }
    } else {
        for (let i = 2; i <= Math.sqrt(number); i++) {
            if (number % i === 0) {
                return false;
            }
        }
    }
    return number !== 1 && number !== -1;
}

function isPalindrome(string) {
    let isPalindromeBoolean = true;
    for (let i = 0; i < Math.floor(string.length) / 2; i++) {
        isPalindromeBoolean = isPalindromeBoolean && string[i] === string[string.length - 1 - i];
    }
    return isPalindromeBoolean;
}

function cesar(message, shift, isCrypted) {
    message = message.toLowerCase();
    let factor = 1;
    if (isCrypted) {
        factor = -1;
    }
    return message
        .split('')
        .map((char) => intTochar((((charToInt(char) + factor * shift) % 26) + 26) % 26))
        .join('');
}

function vigenere(message, key, isCrypted) {
    message = message.toLowerCase();
    while (key.length < message.length) {
        key += key;
    }
    let factor = 1;
    if (isCrypted) {
        factor = -1;
    }
    return message
        .split('')
        .map((char, i) => intTochar((((charToInt(char) + factor * charToInt(key[i])) % 26) + 26) % 26))
        .join('');
}

function ascii(char) {
    return char.charCodeAt(0);
}

function charToInt(char) {
    return ascii(char) - ascii('a');
}

function intTochar(int) {
    return String.fromCharCode(int + ascii('a'));
}

// const array = [5, 3, 1, 4, 7, 5, 1, 6, 4, 9, 1, 8];
// console.log('selectionSort');
// console.log(array);
// console.log(selectionSort(array));
// const array2 = [5, 3, 1, 4, 7, 5, 1, 6, 4, 9, 1, 8];
// console.log('bubbleSort');
// console.log(array2);
// console.log(bubbleSort(array2));
// const array3 = [5, 3, 1, 4, 7, 5, 1, 6, 4, 9, 1, 8];
// console.log('quickSort');
// console.log(array3);
// console.log(quickSort(array3));
// console.log('firstPrimeNumber');
// console.log(firstPrimeNumber(100));
// console.log('isPalindrome');
// console.log(isPalindrome('kaybk'));
// console.log(isPalindrome('kayak'));
// console.log(isPalindrome('kabk'));
// console.log(isPalindrome('kayao'));
// console.log('cesar');
// console.log(cesar('kayak', 0));
// console.log(cesar(cesar('kayak', 0), 0, true));
// // console.log(cesar('kayak', 1));
// console.log(cesar(cesar('kayak', 1), 1, true));
// // console.log(cesar('kayak', 25));
// console.log(cesar(cesar('kayak', 250), 250, true));
// console.log('vigenere');
// // console.log(vigenere('kayak', 'a'));
// console.log(vigenere(vigenere('kayak', 'a'), 'a', true));
// // console.log(vigenere('kayak', 'b'));
// console.log(vigenere(vigenere('kayak', 'b'), 'b', true));
// // console.log(vigenere('kayak', 'abcde'));
// console.log(vigenere(vigenere('kayak', 'abcde'), 'abcde', true));

function testPrimeTimeExecution() {
    const number = 100000;
    const nbInstance = 100;
    let sumTimeFalse = 0;
    let sumTimeTrue = 0;
    for (let i = 0; i < nbInstance; i++) {
        var startTime = performance.now();
        firstPrimeNumber(number, false);

        var endTime = performance.now();
        sumTimeFalse += endTime - startTime;
    }
    for (let i = 0; i < nbInstance; i++) {
        var startTime = performance.now();
        firstPrimeNumber(number, true);

        var endTime = performance.now();

        sumTimeTrue += endTime - startTime;
    }
    console.log(`Call to sumTimeFalse ${sumTimeFalse} milliseconds`);
    console.log(`Call to sumTimeTrue ${sumTimeTrue} milliseconds`);
}

function testSortTimeExecution() {
    const nbInstance = 1000;
    const sizeArray = 1000;
    let sumTimeQuick = 0;
    let sumTimeBubble = 0;
    let sumTimeSelection = 0;
    for (let i = 0; i < nbInstance; i++) {
        // const array = [5, 3, 1, 4, 7, 5, 1, 6, 4, 9, 1, 8];
        const array = Array.from({ length: sizeArray }, () => Math.floor(Math.random() * sizeArray));
        let copyArray = array.slice();
        var startTime = performance.now();
        selectionSort(copyArray);
        var endTime = performance.now();
        sumTimeSelection += endTime - startTime;

        copyArray = array.slice();
        startTime = performance.now();
        bubbleSort(copyArray);
        endTime = performance.now();
        sumTimeBubble += endTime - startTime;

        copyArray = array.slice();
        startTime = performance.now();
        quickSort(copyArray);
        endTime = performance.now();
        sumTimeQuick += endTime - startTime;
    }

    console.log(`Call to bubbleSort ${sumTimeBubble} milliseconds`);
    console.log(`Call to selectionSort ${sumTimeSelection} milliseconds`);
    console.log(`Call to quickSort ${sumTimeQuick} milliseconds`);
}
// testPrimeTimeExecution();
// testSortTimeExecution();
