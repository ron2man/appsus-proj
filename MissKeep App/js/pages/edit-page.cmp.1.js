import { noteService } from '../service/note.service.js';


const note = {
    props: ['data'],
    template: `
    <section class="note-edit">
        <section class="opts-container flex space-between">
            <div @click="editNote('image')"><i class="fas fa-image"></i></div>
            <div @click="editNote('todo')"><i class="far fa-list-alt"></i></div>
            <div @click="editNote('note')"><i class="far fa-sticky-note"></i></div>
        </section>

       <h1>{{(note.id)? 'Edit Note': 'Add Note'}}</h1>
       <form @submit.prevent="saveNote" class="edit-note flex column">
           <input type="text" v-model="note.title" placeholder="Change title">

           <textarea rows="4" v-model="note.description" placeholder="Change description"></textarea>
           <button type="submit"> {{(note.id)? 'Save': 'Add'}}</button>
           <span class="bcg-note">Choose your note color</span>
           <input type="color" id="bcg-note" name="body" value="#ffe4c4" @change="colorChoose($event.target.value)">

            <button type="submit" v-model="txt" @blur="reportVal"></button>
       </form>
   </section>

    `,
    data() {
        return {
            input: {
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
    methods: {
        reportVal() {
            this.$emit('setInput', this.input)
        }
    }
}








const todo = {
    props: ['data'],
    template: `
        <div class="row">
            <label>
                {{data.label}}
                <select v-model="selectedOpt" @blur="reportVal">
                    <option v-for="opt in data.opts">{{opt}}</option>
                </select>
            </label>
        </div>
    `,
    data() {
        return {
            selectedOpt: '',
        }
    },
    methods: {
        reportVal() {
            this.$emit('setInput', this.selectedOpt)
        }
    }
}






export default {
    template: `
    <section class="survey">
        <h1>Survey</h1>
        <form @submit.prevent="save">
            <component 
                        :is="typeFromRoute" 
                        :data="cmps.type[typeFromRoute].data" 
                        @setInput="setInput($event, idx)">
            </component>
            <button type="submit">Save</button>
        </form>

    </section> 
    `,
    data() {
        return {
            cmps: [
                {
                    type: 'imgNote',
                    data: {
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
                },

                {
                    type: 'todo',
                    data: {
                        task: '',
                        dueDate: '',
                    }
                }

            ],
            answers: []
        }
    },
    methods: {
        setInput(ev, inputIdx) {
            this.answers[inputIdx] = ev;
            console.log('Survey Got ev', ev);
        },
        save() {
            console.log('Survey Answers', this.answers);
        }
    },
    created() {

    },
    computed: {
        cmpType() {
            return this.$route.params.editNoteType
        }
    },
    watch: {

    },
    components: {
        textBox,
        selectBox,
        rangeBox
    }
}

export default {
    template: `
     <section class="note-edit">
         <section class="opts-container flex space-between">
             <div @click="editNote('image')"><i class="fas fa-image"></i></div>
             <div @click="editNote('todo')"><i class="far fa-list-alt"></i></div>
             <div @click="editNote('note')"><i class="far fa-sticky-note"></i></div>
         </section>

        <h1>{{(note.id)? 'Edit Note': 'Add Note'}}</h1>
        <form @submit.prevent="saveNote" class="edit-note flex column">
            <input type="text" v-model="note.title" placeholder="Change title">
            <textarea rows="4" v-model="note.description" placeholder="Change description"></textarea>
            <button type="submit"> {{(note.id)? 'Save': 'Add'}}</button>
            <span class="bcg-note">Choose your note color</span>
            <input type="color" id="bcg-note" name="body" value="#ffe4c4" @change="colorChoose($event.target.value)">
        </form>
    </section>
    `,

    data() {
        return {
            note: {
                title: '',
                description: '',
                date: "8/11/2018",
                styleObject: {
                    background: `orange`,
                    fontSize: '14px',
                    'border-radius': '20px'
                }
            }
        }
    },

    created() {


        let noteId = this.$route.params.noteId
        // console.log('hi', noteId);
        if (noteId) {
            noteService.getNoteById(noteId)
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
        },
        colorChoose(color) {
            console.log('color changed', color);
            this.note.styleObject.background = color

        }

    }

}