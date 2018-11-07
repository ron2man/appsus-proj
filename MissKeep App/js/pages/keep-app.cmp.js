import {noteService} from '../service/note.service.js';
import keepList from '../cmps/keep-list.cmp.js';
import keepFilter from '../cmps/keep-filter.cmp.js';

export default {
    name: 'keep-app',
    template: `
        <section class="flex column">
            <div class="keep-head-container flex space-between">
                <h1>Keep remember</h1>
                <img class="img-header" src="img/logo.png">
            </div>

            <section>
                <button class="btn-add">Add New Note</button>
            </section>
            <keep-filter></keep-filter>
            <keep-list :notes="notesToShow"></keep-list>
          
            <section class="keep-footer">
                <h6>cofferigths 2018</h6>
            </section>
        </section>
    `,

    data() {
        return {
            notes: null,
            filter: null
        }
    },

    created() {
        noteService.query()
        .then(res => {
            this.notes = res
        })
    },


    
    computed:{
        notesToShow(){
                if (!this.filter) return this.notes

                return this.filter.icludes()
            console.log(this.notes);
            return this.notes
        }
    },
    
    components: {
        keepList,
        keepFilter

    },

}
