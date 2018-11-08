import { storageService } from './storage.service.js'
import { utilService } from './util.service.js'

const Notes_KEY = 'notes';

var gNotes;
query();

var basiceNotes = [
    {
        type: 'todo',
        title: 'Todo List',
        description: [
            {
                id: utilService.makeId(),
                task: 'garbage',

            },
            {
                id: utilService.makeId(),
                task: 'shoping',
            },
            {
                id: utilService.makeId(),
                task: 'sleep',
            },
            {
                id: utilService.makeId(),
                task: 'drink beer',

            },
        ]
    },

    {
        type: 'note',
        title: 'buy shoes',
        description: 'been there after met joshua in the park.. the green model',
        location: '216 ben jehuda, shoes land',
        created: '11/11/2018',
        id: utilService.makeId(),
        styleObject: {
            background: '#5f9ea0',
            fontSize: '20px',
            'border-radius': '15px',
            imgSrc: null
        }

    },
    {
        type: 'note',
        title: 'Order Tickets',
        description: 'My yearly vecation',
        location: 'fly fast.com',
        created: '11/11/2018',
        id: utilService.makeId(),
        styleObject: {
            background: '#d28f5f',
            fontSize: '20px',
            'border-radius': '10px',
            imgSrc: null

        }

    },
]



function saveNote(note) {
    return storageService.load(Notes_KEY)
        .then(notes => {
            
             if (note.id || note.type === 'todo') {
                var noteIdx = notes.findIndex(currNote => currNote.id === note.id)
                notes.splice(noteIdx, 1, note);
            } else {
                // Add
                note.id = utilService.makeId();
                note.created = 'moment.js'
                notes.push(note);
            }
            // gNotes = notes;
            return storageService.store(Notes_KEY, notes);
        });
}

function deletNote(notes){

    return storageService.store(Notes_KEY, notes);

}

// this function retun promise of notes array  
function query() {
    return storageService.load(Notes_KEY)
        .then(res => {
            console.log(res);
            gNotes = res;
            if (!gNotes) {
                gNotes = createNotes();
                storageService.store(Notes_KEY, gNotes)
            }
            return Promise.resolve(gNotes)
        })

    // if (!gNotes) {
    //     gNotes = createNotes();
    //     storageService.store(Notes_KEY, gNotes)
    // }
    // return Promise.resolve(gNotes)
}

// init by query function
function createNotes() {
    return basiceNotes;
}



function getNoteById(noteId) {
    return storageService.load(Notes_KEY)
        .then(notes => {
            return notes.find(note => note.id === noteId)
        })
}


export const noteService = {
    query,
    getNoteById,
    saveNote,
    deletNote
}