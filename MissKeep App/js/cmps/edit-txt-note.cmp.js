export default {
    props: ['noteToEdit'],
    template: `
    <form 
        @submit.prevent="saveNote" 
        class="edit-note flex column">

        <input type="text" v-model="note.title" placeholder="Change title">
        <textarea rows="4" v-model="note.description" placeholder="Change description"></textarea>
        <span class="bcg-note">Choose your note color</span>
        <input type="txt" placeholder="Enter Image Url"
        v-if="note.type === 'img'" src="note.imgSrc" 
        />
        <input type="color"
         id="bcg-note" 
         name="body"
          v-model="note.styleObject.background" />
        <button type="submit"> {{(!isNewNote)? 'Save': 'Add'}}</button>
    </form>
    `,

    data() {
        return {
            note: {
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
                imgSrc: ''
            }
        }
    },
    created() {
        if (this.noteToEdit) this.note = { ...this.noteToEdit };
    },
    methods: {
        saveNote() {
            if (!this.note.imgSrc) {
                delete this.note.imgSrc;
                this.note.type = 'txt';
            }

        }

    }


}