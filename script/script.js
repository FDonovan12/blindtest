import { PartyBlindtest } from './objectValueBlindtest.js';
import {
    readJsonSynchrone,
    createClickButton,
    getValueFromPathname,
    getPathnameFromValue,
} from './utils.js';
import unitTest from './unitTest.js';

let partyBlindtest = null;

start();
window.addEventListener('load', () => {});

window.addEventListener('storage', PartyBlindtest.updateStatus);

function start() {
    unitTest();
    getPathnameFromValue('presenter.html');
    getValueFromPathname();
    partyBlindtest = new PartyBlindtest(readJsonSynchrone('current.json')['blindtest']);
    console.log(partyBlindtest);
    partyBlindtest.save();
    console.log('\nelement :', partyBlindtest);
    console.log(' :', PartyBlindtest.get());
    PartyBlindtest.updateStatus();
    console.log('\nelement :', partyBlindtest);
    console.log(' :', PartyBlindtest.get());
    partyBlindtest.save();
    console.log('\nelement :', partyBlindtest);
    console.log(' :', PartyBlindtest.get());

    try {
        document.querySelector('#openAudience').addEventListener('click', function () {
            window.open('audience.html', 'Audience').focus();
        });
    } catch (error) {}
    createClickButton('#play', partyBlindtest.playAndPauseMusic.bind(partyBlindtest));
    createClickButton('#previous', partyBlindtest.previousMusic.bind(partyBlindtest));
    createClickButton('#next', partyBlindtest.nextMusic.bind(partyBlindtest));
    createClickButton('#downloadAnchorElem', partyBlindtest.download.bind(partyBlindtest));
    window.addEventListener('keydown', (key) => {
        console.log('key :', key);
        switch (key.code) {
            case 'Space':
                key.preventDefault();
                partyBlindtest.playAndPauseMusic();
                break;
            case 'ArrowRight':
                key.preventDefault();
                partyBlindtest.nextMusic();
                break;
            case 'ArrowLeft':
                key.preventDefault();
                partyBlindtest.previousMusic();
                break;

            default:
                break;
        }
    });
}

class Book {
    constructor(title, auteur, publicationYear) {
        this.title = title;
        this.auteur = auteur;
        this.publicationYear = publicationYear;
    }

    toString() {
        return `title : ${this.title} | auteur : ${this.auteur} | publicationYear : ${this.publicationYear} `;
    }
    print() {
        console.log(this.toString());
    }
}

class Biblioteque {
    constructor(name, adress, books) {
        this.name = name;
        this.adress = adress;
        this.books = books;
    }

    toString() {
        let string = `name : ${this.name} | adress : ${this.adress} \n books :`;
        this.books.map((book) => (string += `\n\t ${book}`));
        return string;
    }
    print() {
        console.log(this.toString());
    }
    addBook(book) {
        this.books.push(book);
    }
    addBooks(books) {
        books.map((book) => this.addBook(book));
    }

    deletBooks(books) {
        this.books = this.books.filter((book) => !books.includes(book));
    }
    deletBooksFromTitle(bookstitle) {
        this.books = this.books.filter((book) => !bookstitle.includes(book.title));
    }

    deletAndAddbooks(books) {
        const bookToAdd = books.filter((book) => !this.books.includes(book));
        const bookToDelete = books.filter((book) => this.books.includes(book));

        this.addBooks(bookToAdd);
        this.deletBooks(bookToDelete);
    }
}

const book1 = new Book('title1', 'auteur1', 'publicationYear1');
const book2 = new Book('title2', 'auteur2', 'publicationYear2');
const book3 = new Book('title3', 'auteur3', 'publicationYear3');
book1.toString();

const biblioteque1 = new Biblioteque('name1', 'adress1', [book1, book2]);
biblioteque1.print();
biblioteque1.addBooks([book3]);
// biblioteque1.print();
// biblioteque1.deletBooks([book1, book3]);
// biblioteque1.print();
// biblioteque1.deletBooks([book2, book3]);
biblioteque1.deletBooksFromTitle(['title2', 'title3']);
// biblioteque1.deletAndAddbooks([book2, book3]);
biblioteque1.print();
