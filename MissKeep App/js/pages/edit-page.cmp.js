import { noteService } from '../service/note.service.js';


export default {
    name: 'edit-keep',
    template: `
     <section class="note-edit">
        <h1>{{(note.id)? 'Edit Note': 'Add Note'}}</h1>
        <form @submit.prevent="saveNote" class="edit-note flex column">
            <input type="text" v-model="note.title" placeholder="Change title">
            <textarea rows="4" v-model="note.description" placeholder="Change description"></textarea>
            <button type="submit"> {{(note.id)? 'Save': 'Add'}}</button>
        </form>
    </section>
    `,

    data() {
        return {
            note: {
                title: '',
                description: '',
                date: "8/11/2018"
            }
        }
    },

    created() {
        let noteId = this.$route.params.noteId
        // console.log('hi', noteId);
        if (noteId) {
            noteService.getById(noteId)
                .then(note => {
                    this.note = note
                })
        }

    },
    methods: {
        saveNote() {
            // console.log(this.note);
            noteService.saveNote(this.note)
            .then(() => {
                console.log('Saved!');
                this.$router.push('/keep');
            })
        }
    }

}