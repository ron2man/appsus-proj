export default {
    name: 'keep-filter',

    template: `
            <form action="">
             <input v-model="message" v-model="filter.title" placeholder="Search for note">


            </form>
    
    `,
    data(){
        return {
            title:''
        }
    }
}