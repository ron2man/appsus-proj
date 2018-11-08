export default {
    template: `
    <section class="opts-container flex space-between">
        <div @click="setNoteType('img')"><i class="fas fa-image"></i></div>
        <div @click="setNoteType('todo')"><i class="far fa-list-alt"></i></div>
        <div @click="setNoteType('txt')"><i class="far fa-sticky-note"></i></div>
    </section>
    `,
    methods:{
        setNoteType(type){
            this.$emit('setNoteType', type)
        }
    }
}