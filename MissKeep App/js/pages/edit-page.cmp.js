import { noteService } from '../service/note.service.js';
import optsNewNote from '../cmps/opts-new-note.cmp.js';

const txtNote = {
    type: 'txt',
    title: '',
    description: '',
    location: '',
    date: "8/11/2018",
    styleObject: {
        background: `orange`,
        fontSize: '14px',
        'border-radius': '20px'
    },
}
const imgNote = {
    type: 'img',
    title: '',
    description: '',
    location: '',
    date: "8/11/2018",
    styleObject: {
        background: `orange`,
        fontSize: '14px',
        'border-radius': '20px'
    },
    imgUrl: ''
}
const todoNote = {
    description: '',
    date: "8/11/2018"

}
export default {
    name: 'edit-keep',
    template: `
     <section class="note-edit flex column align-center" v-if="note">
        <h1>{{(!isNewNote)? 'Edit Note': 'Add Note'}}</h1>
         <opts-new-note 
            v-if="isNewNote"
            @setNoteType="setNoteType"></opts-new-note>
        
        <form 
            @submit.prevent="saveNote" 
            class="edit-note flex column">

            <input class="title-edit" type="text" v-model="note.title" placeholder="Choose title">
            <textarea class="text-edit" rows="4" v-model="note.description" placeholder="Add description"></textarea>
            <input class="title-edit" type="text" v-model="note.location" placeholder="Insert location">
            <span class="bcg-note">Choose your note color</span>
            <input
            v-if="note.type === 'img'" v-model="note.imgSrc" 
            />
            <input type="color" id="bcg-note" name="body" value="#ffe4c4" @change="colorChoose($event.target.value)">
            <button class="btn-add" type="submit"> {{(!isNewNote)? 'Save': 'Add'}}</button>
        </form>
    </section>
    `,

    data() {
        return {
            note: null,
            chosenType: 'txt'
        }
    },

    created() {
        let noteId = this.$route.params.noteId
        console.log('hi', noteId);
        if (noteId) {
            noteService.getNoteById(noteId)
                .then(note => {
                    this.note = note
                })
        }
        else this.note = {...txtNote};

    },

    methods: {
        saveNote() {
            noteService.saveNote(this.note)
                .then(() => {
                    // console.log('Saved!');
                    this.$router.push('/keep');
                })
        },
        colorChoose(color) {
            console.log('color changed', color);
            this.note.styleObject.background = color

        },
        setNoteType(type) {
            // console.log('type was resetted ', type)
            if (type === 'img') this.note = {...imgNote};
            else if (type === 'todo') this.note = {...todoNote};
            else if (type === 'txt') this.note = {...txtNote};
        }

    },
    computed: {
        isNewNote() {
            return !this.$route.params.noteId;
        }
    },
    components: {
        optsNewNote
    }

}