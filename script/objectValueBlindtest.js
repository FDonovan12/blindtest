import { addResponse, addParticipantsScore, createTagWithParentClassContent } from './utils.js';

let localStorageName = 'PartyBlindtest';

export function changeLocalStorageName(name) {
    localStorageName = name;
}

export function resetLocalStorageName() {
    localStorageName = 'PartyBlindtest';
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
            this.changeAudio();
            if (this.getName() === partyBlindtestFromStorage.getName()) {
                // this.currentMusic = partyBlindtestFromStorage.currentMusic;
                return partyBlindtestFromStorage;
            }
        }
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
        if (!isPlaying) {
            this.playMusic();
        } else {
            this.pauseMusic();
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
    addParticpant(participantName) {
        if (!participantName) {
            const input = document.querySelector('#addParticpantInput');
            participantName = input.value;
        }
        if (participantName) {
            const newParticipant = new Participant(participantName);
            const participants = this.getParticipants();
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
        const partyBlindtest = PartyBlindtest.get();
        addResponse(partyBlindtest);
        addParticipantsScore(partyBlindtest);
    }
    download() {
        const link = createTagWithParentClassContent('a');
        var dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this));
        var dlAnchorElem = document.getElementById('downloadAnchorElem');
        link.setAttribute('href', dataStr);
        link.setAttribute('download', `${this.getName()}.json`);
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
        this.blindtest.sections.map((section) => {
            score += section.getScoreOfPlayer(player);
        });
        return score;
    }
    validMusic() {
        const youtubeLink = document.querySelector('#linkYoutubeInput').value;
        const blockPointInfos = document.querySelector('#blockOfPointInfos');
        const allPointInfosInput = blockPointInfos.querySelectorAll('div');
        const music = this.addMusic(youtubeLink);
        allPointInfosInput.forEach((pointInfo) => {
            const inputs = pointInfo.querySelectorAll('input');
            const name = inputs[0].value;
            const value = inputs[1].value;
            music.addPointInfo(name, value);
        });
    }
    addMusic(link) {
        const section = this.getSection();
        const music = section.addMusic(link);
        return music;
    }
}

export class Blindtest {
    constructor(blindtest) {
        this.name = blindtest.name;
        this.participants = blindtest.participants.map((participant) => new Participant(participant.name));
        this.sections = blindtest.sections.map((section) => new Section(section));
    }
}
export class Section {
    constructor(section) {
        this.name = section.name;
        this.details = section.details;
        this.musics = section.musics.map((musique) => new Music(musique));
    }

    getScoreOfPlayer(player) {
        let score = 0;
        this.musics.map((music) => {
            music.pointInfos.filter((pointInfo) => pointInfo?.participant?.name === player.name).map(() => score++);
        });
        return score;
    }

    addMusic(link) {
        const music = new Music({ link: link });
        this.musics.push(music);
        return music;
    }
}
export class Music {
    constructor(music) {
        this.path = music.path;
        this.link = music.link;
        this.pointInfos = music?.pointInfos?.map((pointInfo) => new PointInfo(pointInfo)) || [];
    }
    addPointInfo(name, value) {
        const pointInfo = new PointInfo({ name: name, value: value });
        this.pointInfos.push(pointInfo);
        return this;
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
            this.participant = new Participant(participant.name);
        }
    }
    changeValue(name, value, partyBlindtest) {
        this.name = name;
        this.value = value;
        // partyBlindtest.save();
    }
    isShow() {
        return this.participant === undefined;
    }
    changeParticipant(newParticipantName, partyBlindtest) {
        this.participant = new Participant(newParticipantName);
        partyBlindtest.save();
    }
    makeVisible(partyBlindtest) {
        this.isVisible = !this.isVisible;
        partyBlindtest.save();
    }
}
export class Participant {
    constructor(name) {
        this.name = name;
    }
}
