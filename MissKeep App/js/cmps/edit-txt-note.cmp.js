export default {
    props: ['noteToEdit'],
    template: `
    <form 
        @submit.prevent="saveNote" 
        class="edit-note flex column">

        <input class="title-edit" type="text" v-model="note.title" placeholder="Change title">
        <textarea class="text-edit" rows="4" v-model="note.description" placeholder="Change description"></textarea>
        <input class="title-edit" type="text" v-model="note.title" placeholder="Change location">       
        <span class="bcg-note">Insert url to upload image</span>
        <input class="title-edit" type="txt" placeholder="Enter Image Url"
        v-if="note.type === 'img'" src="note.imgSrc"/>
        <span class="bcg-note">Choose your note color</span>
        <input type="color"
         id="bcg-note" 
         name="body"
          v-model="note.styleObject.background" />
        <button class="btn-add" type="submit"> {{(!isNewNote)? 'Save': 'Add'}}</button>
        <button class="btn-back">Go back</button>
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
        console.log('noteToEdit:', noteToEdit);
        
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