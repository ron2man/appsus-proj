import { storageService } from './storage.service.js'
import { utilService } from './util.service.js'

const Notes_KEY = 'books';

var gNotes;

var basiceNotes = [
    {
        title: 'buy shoes',
        description: 'been there after met joshua in the park.. the green model',
        location: '216 ben jehuda, shoes land',
        created: '11/11/2018',
        id: utilService.makeId()

    },
    {
        title: 'Order Tickets',
        description: 'My yearly vecation',
        location: 'fly fast.com',
        created: '11/11/2018',
        id: utilService.makeId()

    },
]

function createNote(noteObject){
    const newNote = {
        title: noteObject.title,
        description: noteObject.description,
        location: noteObject.location,
        // from moment js 
        created: '11/11/2018',
        id: utilService.makeId()
    }
    sNotes.push(newNote)
}


// this function retun promise of notes array  
function query() {
    gNotes = storageService.load(Notes_KEY);
    if (!gNotes) {
        gNotes = createNotes();
        storageService.store(Notes_KEY, gNotes)
    }
    return Promise.resolve(gNotes)
}

// init by query function
function createNotes() {
    return basiceNotes;
}


// function addNote(noteToAdd) {
//     gNotes.push(noteToAdd);
//     storageService.store(Notes_KEY, gNotes)
// }

function getNoteById(noteId) {
    var theNote = gNotes.find(note => note.id === noteId);
    return Promise.resolve(theNote)
}

// function getNextNotekId(noteId) {
//     const currNoteIdx = gNotes.findIndex(note =>noteId === note.id) 

//     const nextNote = gNotes[currNoteIdx + 1] ? gNotes[currNoteIdx + 1] : gNotes[0]
//     return Promise.resolve(nextNote)
// }


// function getPrevNoteId(noteId){
//     const currBookIdx = gNotes.findIndex(book =>noteId === book.id) 

// const prevBook = gNotes[currBookIdx - 1] ? gNotes[currBookIdx - 1] : gNotes[gNotes.length-1]
// return Promise.resolve(prevBook)
// }

export const noteService = {
    query,
    getNoteById,
    // addNote,
    // getNextNotekId,
    // getPrevNoteId
}