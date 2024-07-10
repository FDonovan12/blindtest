import { addResponse, addParticipantsScore, createTagWithParentClassContent } from './utils.js';

let localStorageName = 'PartyBlindtest';

export function changeLocalStorageName(name) {
    localStorageName = name;
}

export function resetLocalStorageName() {
    localStorageName = 'PartyBlindtest';
}

export class PartyBlindtest {
    constructor(partyBlindtest, FromGetFunction) {
        if (!partyBlindtest) {
            return undefined;
        }
        if (typeof partyBlindtest === 'string') {
            partyBlindtest = JSON.parse(partyBlindtest);
        }
        if (partyBlindtest?.blindtest) {
            this.blindtest = new Blindtest(partyBlindtest.blindtest);
        } else {
            this.blindtest = new Blindtest(partyBlindtest);
        }
        this.currentMusic = partyBlindtest?.currentMusic || 0;
        this.currentSection = partyBlindtest?.currentSection || 0;
        this.audio = document.querySelector('#music-audio');
        this.localStorageName = localStorageName;
        if (!FromGetFunction) {
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
        buttonPlayPause.toggleAttribute('active');
        if (this.audio.paused) {
            this.playMusic();
            buttonPlayPause.textContent = 'pause';
        } else {
            this.pauseMusic();
            buttonPlayPause.textContent = 'play';
        }
    }

    //prettier-ignore
    playMusic() { this.audio.play(); }

    pauseMusic() {
        this.audio.pause();
    }

    getParticipants() {
        return this.blindtest.participants;
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
        if (this.audio) {
            this.audio.pause();
            const linkMusic = this.getMusic().link;
            this.audio.src = linkMusic;
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
}

export class Blindtest {
    constructor(blindtest) {
        this.name = blindtest.name;
        this.participants = blindtest.participants.map(
            (participant) => new Participant(participant.name)
        );
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
            music.pointInfos
                .filter((pointInfo) => pointInfo?.participant?.name === player.name)
                .map(() => score++);
        });
        return score;
    }
}
export class Music {
    constructor(music) {
        this.link = music.link;
        this.pointInfos = music.pointInfos.map((pointInfo) => new PointInfo(pointInfo));
    }
}
export class PointInfo {
    constructor(pointInfo) {
        this.name = pointInfo.name;
        this.value = pointInfo.value;
        // this.participant = participant;
        const participant = pointInfo.participant;
        if (participant) {
            this.participant = new Participant(participant.name);
        }
    }
    isShow() {
        return this.participant === undefined;
    }
    changeParticipant(newParticipantName, partyBlindtest) {
        this.participant = new Participant(newParticipantName);
        partyBlindtest.save();
    }
}
export class Participant {
    constructor(name) {
        this.name = name;
    }
}
