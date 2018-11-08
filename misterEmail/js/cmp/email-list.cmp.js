import singleEmail from './single-email.cmp.js'

export default {
    name: 'email-list',
    props:['emails'],
    template: `
    <!-- EMAILS -->
        <section class="emails">
        <single-email v-for="email in emails" :key="email.id" :email="email" @delete="sendDeleteMailRequest"></single-email>
        </section>
    `,
    data() {
        return {         
        }
    },
    methods: {
        getTimestamp() {
            return new Date() + 30000;
        },
        sendDeleteMailRequest(emailId){
            this.$emit('deleteMail',emailId);
        },
    },
    computed:{       
    },
    created(){
    },
    components: {
        singleEmail,
    }
}