import singleEmail from './single-email.cmp.js'

export default {
    props:['emails'],
    template: `
    <!-- EMAILS -->
        <section class="emails">
        <single-email v-for="email in emails" :key="email.id" :email="email" @changeRead="countUnreadeEmails" @delete="sendDeleteMailRequest"></single-email>
        </section>
    `,
    data() {
        return {
            unReadEmails: 0,
            

        }
    },
    methods: {
        getTimestamp() {
            return new Date() + 30000;
        },
        sendDeleteMailRequest(emailId){
            // console.log('delete');
            // var idx = this.emails.findIndex(email=> email.id === emailId);
            // this.emails.splice(idx,1);
            console.log(emailId)
            this.$emit('deleteMail',emailId);
        },
        countUnreadeEmails(){
            this.unReadEmails = this.emails.filter(email=> email.isRead === false);
            // this.unReadEmails = this.emails.filter(email=> !email.isRead)
            this.$emit('unReadCount',this.unReadEmails.length)
            // console.log(this.unReadEmails.length)
        }

    },
    computed:{
        
    },
    created(){
        this.countUnreadeEmails();
    },
    components: {
        singleEmail,
    }
}