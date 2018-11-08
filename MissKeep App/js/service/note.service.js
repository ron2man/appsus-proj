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
            background: 'red',
            fontSize: '13px',
            'border-radius': '20px',
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
            background: 'green',
            fontSize: '20px',
            'border-radius': '10px',
            imgSrc: null

        }

    },
]

// function deleteTask(noteId, taskId){
//     return storageService.load(Notes_KEY)
//         .then(notes=>{
            
//             // if (taskId){
//             //    var tasks =  notes.find(note=>note.type==='todo')
//             //    var taskIdx = tasks.description.findIndex(task=> task.id === taskId)
//             //    console.log(notes[0].description);
//             //     notes[0].description.splice(taskIdx,1)
//             //    return storageService.store(Notes_KEY, gNotes);

//                console.log(taskIdx);
            

            
//                 // tasks.findIndex(task=>{
                    
//                 //     taskId===task.id })
                
//                 // console.log(note);
                
//             }



//         })
// }


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

// function getNextNotekId(noteId) {
//     const currNoteIdx = gNotes.findIndex(note =>noteId === note.id) 

//     const nextNote = gNotes[currNoteIdx + 1] ? gNotes[currNoteIdx + 1] : gNotes[0]
//     return Promise.resolve(nextNote)
// }


// function getPrevNoteId(noteId){
//     const currBookIdx = gNotes.findIndex(book =>noteId === book.id) 

// const prevNote = gNotes[currBookIdx - 1] ? gNotes[currBookIdx - 1] : gNotes[gNotes.length-1]
// return Promise.resolve(prevNote)
// }

export const noteService = {
    query,
    getNoteById,
    saveNote,
    // deleteTask,
 
    // getNextNotekId,
    // getPrevNoteId
}