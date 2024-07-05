export class PartyBlindtest {
    constructor(partyBlindtest) {
        if (typeof partyBlindtest === 'string') {
            partyBlindtest = JSON.parse(partyBlindtest);
        }
        try {
            this.blindtest = new Blindtest(partyBlindtest['blindtest']);
            // console.log('no error :');
        } catch (error) {
            // console.log('error :');
            this.blindtest = new Blindtest(partyBlindtest);
        }
        this.currentMusic = 0;
        this.currentSection = 0;
        this.changeAudio();
    }

    getSection() {
        return this.blindtest.sections[this.currentSection];
    }

    getMusique() {
        return this.getSection().musiques[this.currentMusic];
    }

    getParticipants() {
        return this.blindtest.participants;
    }

    save() {
        localStorage.setItem('partyBlindtest', JSON.stringify(this));
    }
    static get() {
        return new PartyBlindtest(JSON.parse(localStorage.getItem('partyBlindtest')));
    }

    changeAudio() {
        if (this.audio) {
            this.audio.pause();
        }
        this.audio = new Audio(this.getMusique().link);
    }

    nextMusic() {
        if (this.currentMusic < this.getSection().musiques.length - 1) {
            this.currentMusic++;
            this.changeAudio();
        } else {
            this.nextSection();
        }
    }

    nextSection() {
        this.currentMusic = 0;
        this.changeAudio();
        if (this.currentSection < this.blindtest.sections.length - 1) {
            this.currentSection++;
        } else {
            this.currentSection = 0;
        }
    }
}

export class Blindtest {
    constructor(blindtest) {
        this.name = blindtest['name'];
        this.participants = blindtest['participants'].map(
            (participant) => new Participant(participant['name'])
        );
        this.sections = blindtest['sections'].map(
            (section) => new Section(section['name'], section['musiques'])
        );
    }
}
export class Section {
    constructor(name, musiques) {
        this.name = name;
        this.musiques = musiques.map(
            (musique) => new Musique(musique['link'], musique['pointInfos'])
        );
    }
}
export class Musique {
    constructor(link, pointInfos) {
        this.link = link;
        this.pointInfos = pointInfos.map(
            (pointInfo) => new PointInfo(pointInfo['name'], pointInfo['value'])
        );
    }
}
export class PointInfo {
    constructor(name, value, particpant) {
        this.name = name;
        this.value = value;
        this.particpant = particpant;
    }
    isShow() {
        return this.particpant === undefined;
    }
}
export class Participant {
    constructor(name) {
        this.name = name;
    }
}
