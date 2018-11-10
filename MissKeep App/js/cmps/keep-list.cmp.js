import { noteService } from "../service/note.service.js";
import { storageService } from "../service/storage.service.js";

export default {
    name: 'keep-list',
    props: ['notes'],
    template: `
        <section v-if="notes" class="notes-list-container flex wrap justify-content-center" >
                <!-- <div class="items-continer" v-for="currNote in notes"> -->
                    
                    <div v-for="currNote in notes" v-if="currNote.type!=='todo'" class="item-container flex column align-itmes-end" :style="currNote.styleObject">
                        <ul class="item-opts flex space-around">
                            <i @click="confirmNoteDelete(currNote.id)" class="fas fa-trash-alt"></i>
                            <li @click="editNote(currNote.id)"><i class="fas fa-edit"></i></li>
                            <li> <i class="fas fa-thumbtack"></i></li>
                        </ul>
                        <h3 class="item-title align-self-center">{{currNote.title}}</h3>
                        <ul class="note-item-desc align-self-start">
                            <li>{{currNote.description}}</li>
                            <li>{{currNote.location}}</li>
                            <li>{{currNote.created}}</li>
                        </ul>
                        <img class="item-img" v-if="currNote.imgSrc" :src="currNote.imgSrc">
                    </div>   
                    <!-- <div v-else>  -->
                        <section v-else class="item-container flex column">
                            <!-- <ul class="item-opts flex flex-end"> -->
                                <!-- <li @click="editNote(currNote.id)"><i class="fas fa-edit"></i></li> -->
                            <!-- </ul> -->
                            <h3 class="item-title">{{currNote.title}}</h3>               
                            <ul class="todo-item-desc">
                                <li 
                                v-for="(currDescription,idx) in currNote.description">
                                {{currDescription.task}} 
                               <span class="todo-trash" @click="confirmTodoDelete(currNote ,idx)">
                               <i class="fas fa-trash-alt"></i>
                               </span> 
                                </li>
                            </ul>
                        </section>
                    <!-- </div> -->
                <!-- </div> -->
        </section>
`,

    methods: {
        editNote(currNoteId) {
            console.log('currNote:', currNoteId);
            this.$router.push(`/note/edit/${currNoteId}`)
        },

        removeTaskToTrash(note, taskIdx) {
            note.description.splice(taskIdx, 1)
            noteService.saveNote(note)
        },
        removeNoteToTrash(noteId) {
            // notes.splice(noteId)
            console.log(noteId);
            console.log(this.notes);
            var noteIdx = this.notes.findIndex(note => note.id === noteId)
            this.notes.splice(noteIdx, 1)
            console.log(this.notes);


            noteService.deletNote(this.notes)
            // console.log(note);
        },
        confirmTodoDelete(note, taskIdx) {
            swal({
                title: "Are you sure?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        swal("Your todo task has been deleted!", {
                            icon: "success",
                        });
                        this.removeTaskToTrash(note, taskIdx)
                    } else {
                        swal("Ok, but don't forget to make this task!");
                    }
                });
        },
        confirmNoteDelete(noteId) {
            swal({
                title: "Are you sure?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        swal("Your note has been deleted!", {
                            icon: "success",
                        });
                        this.removeNoteToTrash(noteId)
                    } else {
                        swal("Your note is still saved!");
                    }
                });
        }
    },

}
