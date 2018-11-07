export default {
    name: 'keep-filter',

    template: `
            <form>
                <input class="filter-input" v-model="title" @blur="sendFilter" placeholder="Search for note"/>
            </form>
    
    `,
    data(){
        return {
            title:''
        }
    },
    
    methods:{
        sendFilter(){
            this.$emit('getFilter', this.title)
        }
    }
}