import { noteService } from '../service/note.service.js';


export default {
    name: 'edit-keep',
    template: `
     <section class="note-edit">
        <h1>{{(note.id)? 'Edit Note': 'Add Note'}}</h1>
        <form @submit.prevent="saveNote" class="edit-note flex column">
            <input type="text" v-model="note.title" placeholder="Change title">
            <textarea rows="4" cols="50" name="comment" form="usrform">
Enter text here...</textarea>
            <!-- <input type="text" v-model="note.description" placeholder="Change description"> -->
            <button type="submit"> {{(note.id)? 'Save': 'Add'}}</button>
        </form>
    </section>
    `,

    data() {
        return {
            note: { titel: '' },
            note: {description : '' },
            date:"8/11/2018"
        }
    },

    created() {
        let noteId = this.$route.params.noteId
        console.log('hi', noteId);
        if (carId) {
            noteService.getById(carId)
                .then(note => {
                    this.note = note
                })
        }

    },
    computed() {
        return {
            note: '',
            title: '',
        }
    }
}