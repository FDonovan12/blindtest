import {
    addResponse,
    addParticipantsScore,
    createTagWithParentClassContent,
    isAudience,
    addOptionToSelect,
    readJsonSynchrone,
} from './utils.js';
import { TagBuilder } from './tagBuilder.js';

let localStorageName = 'PartyBlindtest';

export function changeLocalStorageName(name) {
    localStorageName = name;
}

export function resetLocalStorageName() {
    localStorageName = 'PartyBlindtest';
}

export class MainObject {
    constructor(partyBlindtest) {
        this.partyBlindtest = new PartyBlindtest(partyBlindtest);
        this.fileName = 'current/data.json';
    }
    get(forceImportJson) {
        this.partyBlindtest = new PartyBlindtest(readJsonSynchrone(this.fileName)['blindtest'], forceImportJson);
    }
}

export class PartyBlindtest {
    constructor(partyBlindtest, fromGetFunction) {
        if (!partyBlindtest) {
            return undefined;
        }
        if (typeof partyBlindtest === 'string') {
            partyBlindtest = JSON.parse(partyBlindtest);
        }
        if (partyBlindtest?.blindtest) {
            console.log('partyBlindtest.blindtest :', partyBlindtest.blindtest);
            this.blindtest = new Blindtest(partyBlindtest.blindtest);
        } else {
            console.log('partyBlindtest :', partyBlindtest);
            this.blindtest = new Blindtest(partyBlindtest);
        }
        this.currentMusic = partyBlindtest?.currentMusic || 0;
        this.currentSection = partyBlindtest?.currentSection || 0;
        this.audio = document.querySelector('#music-audio');
        this.localStorageName = localStorageName;
        if (!fromGetFunction) {
            const partyBlindtestFromStorage = PartyBlindtest.get();
            if (this.getName() === partyBlindtestFromStorage.getName()) {
                // this.currentMusic = partyBlindtestFromStorage.currentMusic;
                return partyBlindtestFromStorage;
            }
        }
        this.changeAudio();
    }

    changeLocalStorageName(localStorageName) {
        this.localStorageName = localStorageName;
    }

    getSection() {
        return this.blindtest.sections[this.currentSection];
    }

    getMusic() {
        return this.getSection().musics[this.currentMusic];
    }

    getNumberOfSection() {
        return this.blindtest.sections.length;
    }

    getNumberOfMusic() {
        return this.getSection().musics.length;
    }

    playAndPauseMusic() {
        const buttonPlayPause = document.querySelector('#play');
        const isPlaying = buttonPlayPause.hasAttribute('active');
        if (isPlaying) {
            this.pauseMusic();
        } else {
            this.playMusic();
        }
    }

    playMusic() {
        const buttonPlayPause = document.querySelector('#play');
        this.audio.play();
        buttonPlayPause.setAttribute('active', true);
        buttonPlayPause.textContent = 'pause';
    }

    pauseMusic() {
        const buttonPlayPause = document.querySelector('#play');
        this.audio.pause();
        buttonPlayPause.removeAttribute('active');
        buttonPlayPause.textContent = 'play';
    }

    getParticipants() {
        return this.blindtest.participants;
    }

    getParticipant(participantName) {
        return this.getParticipants().find((participant) => participant.name === participantName);
    }

    addParticpant(participantName) {
        if (!participantName) {
            const input = document.querySelector('#addParticpantInput');
            participantName = input.value;
        }
        if (participantName) {
            const participants = this.getParticipants();
            const classCSS = 'joueur-' + (participants.length + 1);
            const newParticipant = new Participant(participantName, classCSS);
            participants.push(newParticipant);
        }
        this.save();
    }
    deleteParticipant(participantToDelete) {
        const participants = this.getParticipants();
        const index = participants.indexOf(participantToDelete);
        participants.splice(index, 1);
        this.save();
    }

    getName() {
        return this.blindtest?.name;
    }

    save(storage) {
        console.log('save');
        if (!storage) {
            storage = this.localStorageName;
        }
        localStorage.setItem(storage, JSON.stringify(this));
        addResponse(this);
        addParticipantsScore(this);
    }
    static get(storage) {
        if (!storage) {
            storage = localStorageName;
        }
        return new PartyBlindtest(JSON.parse(localStorage.getItem(storage)), true);
    }
    static updateStatus() {
        console.log('updateStatus');
        const partyBlindtest = PartyBlindtest.get();
        addResponse(partyBlindtest);
        addParticipantsScore(partyBlindtest);
    }
    download() {
        const link = createTagWithParentClassContent('a');
        var dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this));
        var dlAnchorElem = document.getElementById('downloadAnchorElem');
        link.setAttribute('href', dataStr);
        // link.setAttribute('download', `${this.getName()}.json`);
        link.setAttribute('download', `data.json`);
        link.click();
    }

    changeAudio() {
        // const buttonPlayPause = document.querySelector('#play');
        if (this.audio) {
            this.pauseMusic();
            // this.audio.pause();
            const pathMusic = this.getMusic().path;
            this.audio.src = pathMusic;
        }
    }

    nextMusic() {
        if (this.currentMusic < this.getNumberOfMusic() - 1) {
            this.currentMusic++;
        } else {
            this.nextSection();
        }
        this.changeAudio();
        this.save();
    }

    nextSection() {
        if (this.currentSection < this.getNumberOfSection() - 1) {
            this.currentSection++;
        } else {
            // TODO modify when the project is finished, this doesn't have to cycle
            this.currentSection = 0;
        }
        this.currentMusic = 0;
        this.changeAudio();
        this.save();
    }

    previousMusic() {
        if (this.currentMusic > 0) {
            this.currentMusic--;
        } else {
            this.previousSection();
        }
        this.changeAudio();
        this.save();
    }

    previousSection() {
        if (this.currentSection > 0) {
            this.currentSection--;
        } else {
            // TODO modify when the project is finished, this doesn't have to cycle
            this.currentSection = this.getNumberOfSection() - 1;
        }
        this.currentMusic = this.getNumberOfMusic() - 1;
        this.changeAudio();
        this.save();
    }

    getScoreOfPlayer(player) {
        let score = 0;
        this.blindtest.sections.forEach((section) => {
            score += section.getScoreOfPlayer(player);
        });
        return score;
    }
    validMusic() {
        console.log('validMusic');
        const youtubeLink = document.querySelector('#linkYoutubeInput').value;
        console.log(youtubeLink);
        const blockPointInfos = document.querySelector('#blockOfPointInfos');
        const allPointInfosInput = blockPointInfos.querySelectorAll('div');
        const divPathMusic = document.querySelector('#pathMusic');
        const divDurationMusic = document.querySelector('#durationMusic');
        const path = `current/music/${divPathMusic.textContent}.mp3`;
        const duration = parseInt(divDurationMusic.textContent);
        const music = this.addMusic(youtubeLink, path, duration);
        allPointInfosInput.forEach((pointInfo) => {
            const inputs = pointInfo.querySelectorAll('input');
            const name = inputs[0].value;
            const value = inputs[1].value;
            music.addPointInfo(name, value);
        });
        this.save();
    }
    addMusic(link, path, duration) {
        const section = this.getSection();
        const music = section.addMusic(link, path, duration);
        return music;
    }
    shuffleMusics() {
        this.blindtest.sections.forEach((section) => {
            section.shuffleMusics();
        });
        this.save();
    }
    getDuration() {
        return this.blindtest.sections
            .map((section) => section.getDuration())
            .reduce((subtotal, duration) => subtotal + duration, 0);
    }
}

export class Blindtest {
    constructor(blindtest) {
        this.name = blindtest.name;
        this.participants = blindtest.participants.map(
            (participant) => new Participant(participant.name, participant.classCss)
        );
        this.sections = blindtest.sections.map((section) => new Section(section));
    }
}
export class Section {
    constructor(section) {
        this.name = section.name;
        this.details = section.details;
        this.musics = section?.musics?.map((musique) => new Music(musique));
    }

    getScoreOfPlayer(player) {
        let score = 0;
        this.musics.map((music) => {
            music.pointInfos.filter((pointInfo) => pointInfo?.participant?.name === player.name).map(() => score++);
        });
        return score;
    }

    addMusic(link, path, duration) {
        const music = new Music({ link: link, path: path, duration: duration });
        this.musics.push(music);
        return music;
    }
    shuffleMusics() {
        let currentIndex = this.musics.length - 1;

        while (currentIndex > 0) {
            let randomIndex = Math.floor(Math.random() * currentIndex);

            [this.musics[currentIndex], this.musics[randomIndex]] = [
                this.musics[randomIndex],
                this.musics[currentIndex],
            ];
            currentIndex--;
        }
    }
    getDuration() {
        return this.musics.map((music) => music.getDuration()).reduce((subtotal, duration) => subtotal + duration, 0);
    }
}
export class Music {
    constructor(music) {
        this.path = music.path;
        this.link = music.link;
        this.duration = music.duration;
        this.pointInfos = music?.pointInfos?.map((pointInfo) => new PointInfo(pointInfo)) || [];
    }
    addPointInfo(name, value) {
        const pointInfo = new PointInfo({ name: name, value: value });
        this.pointInfos.push(pointInfo);
        return this;
    }
    getDuration() {
        if (!this?.duration) {
            return 0;
        }
        if (typeof this.duration === 'number') {
            return this.duration;
        } else if (typeof this.duration === 'string') {
            return parseInt(this.duration);
        } else {
            return 0;
        }
    }
}
export class PointInfo {
    constructor(pointInfo) {
        this.name = pointInfo?.name;
        this.value = pointInfo?.value;
        this.isVisible = pointInfo?.isVisible;
        // this.participant = participant;
        const participant = pointInfo?.participant;
        if (participant) {
            this.participant = new Participant(participant.name, participant?.classCss);
        }
    }

    changeValue(name, value, partyBlindtest, event) {
        const cursorPosition = event.target.selectionStart;
        this.name = name;
        this.value = value;
        partyBlindtest.save();
        event.target.focus();
    }

    isShow() {
        return this.participant === undefined;
    }

    changeParticipant(newParticipantName, partyBlindtest) {
        console.log('changeParticipant : ', newParticipantName);
        console.log(newParticipantName);
        const newParticipant = partyBlindtest.getParticipant(newParticipantName);
        console.log(newParticipant);
        this.participant = newParticipant ? newParticipant : undefined;
        // this.participant = newParticipantName && new Participant(newParticipantName);
        console.log('this.participant : ', this.participant);
        partyBlindtest.save();
    }

    makeVisible(partyBlindtest) {
        this.isVisible = !this.isVisible;
        partyBlindtest.save();
    }

    createHtmlContent(partyBlindtest, divResponse) {
        const divPointInfo = new TagBuilder('div', divResponse)
            .setClass('response-pointInfos ' + this?.participant?.classCss)
            .build();

        // const divPointInfo = createTagWithParentClassContent('div', divResponse, 'response-pointInfos');
        // const divVisiblePointinfo = createTagWithParentClassContent('div', divPointInfo, 'fa-solid fa-eye');
        const divVisiblePointinfo = new TagBuilder('i', divPointInfo).setClass('fa-solid fa-eye').build();

        divVisiblePointinfo.addEventListener('click', () => {
            this.makeVisible(partyBlindtest);
        });
        if (isAudience()) {
            const divValueparticipant = createTagWithParentClassContent(
                'div',
                divPointInfo,
                null,
                this?.participant?.name
            );
        } else {
            const selectValuePointInfo = createTagWithParentClassContent('select', divPointInfo);
            selectValuePointInfo.addEventListener('change', (value) => {
                this.changeParticipant(selectValuePointInfo.value, partyBlindtest);
            });
            addOptionToSelect(selectValuePointInfo, '', undefined);
            partyBlindtest.getParticipants().map((participant, index) => {
                addOptionToSelect(selectValuePointInfo, participant.name, participant.name, participant.classCss);
                if (participant.name === this?.participant?.name) {
                    selectValuePointInfo.selectedIndex = index + 1;
                }
            });
            // divVisiblePointinfo.addEventListener('click', pointInfo.makeVisible);
        }
        const divNamePointInfo = new TagBuilder('div', divPointInfo)
            .setClass('inputToEnd')
            .setTextContent(this.name)
            .build();

        let classVisible = null;
        const hasParticipantOrIsVisible = this?.participant?.name || this.isVisible;
        if (!hasParticipantOrIsVisible) {
            if (isAudience()) {
                classVisible = 'invisible';
            }
        } else {
        }
        const divValuePointInfo = createTagWithParentClassContent('div', divPointInfo, classVisible, this.value);
        // const inputNamePointInfo = createTagWithParentClassContent('input', divPointInfo, 'inputToEnd', this.name);
        // inputNamePointInfo.value = this.name;
        // divValuePointInfo.value = this.value;
        // if (isAudience()) {
        //     inputNamePointInfo.setAttribute('readonly', true);
        //     divValuePointInfo.setAttribute('readonly', true);
        // }
        // divNamePointInfo.addEventListener('input', (event) => {
        //     this.changeValue(event.target.value, this.value, partyBlindtest, event);
        // });
        // divValuePointInfo.addEventListener('input', (event) => {
        //     this.changeValue(this.name, event.target.value, partyBlindtest, event);
        // });
    }
}
export class Participant {
    constructor(name, classCss) {
        this.name = name;
        if (name === 'undefined') {
            this.name = undefined;
        }
        this.classCss = classCss;
    }
}
