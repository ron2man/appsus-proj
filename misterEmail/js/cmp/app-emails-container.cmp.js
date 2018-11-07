import singleEmail from './single-email.cmp.js'

export default {
    template: `
    <!-- EMAILS -->
        <section class="emails">
        <single-email v-for="email in emails" :key="email.id" :email="email" @delete="deleteMail"></single-email>
        </section>
    `,
    data() {
        return {
            emails: [
                {
                    id: 'ndalkngalkn',
                    from: 'sender1',
                    subject: 'this is a subject 1',
                    body: 'this is the message x 3',
                    isRead: false,
                    sentAt: 1541596432631,
                },
                {
                    id: 'ndaegq3rc',
                    from: 'sender2',
                    subject: 'this is a subject 2',
                    body: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic illo nulla ratione doloribus, minima, facilis blanditiis libero aperiam unde itaque, dolorum beatae facere architecto. Eius ab placeat sapiente quibusdam dolorum.gegeewgewgewgweg ewgwwgesdsdssd sddsfdsffsd',                     
                    isRead: true,
                    sentAt: 1541796432631
                },
                {
                    id: 'ndaegqt3q3',
                    from: 'sender3',
                    subject: 'this is a subject 3',
                    body: 'this is the message x 3',
                    isRead: false,
                    sentAt: 1541596432681
                },
                {
                    id: 'cdaegqt3q3',
                    from: 'sender3',
                    subject: 'this is a subject 3',
                    body: 'this is the message x 3',
                    isRead: false,
                    sentAt: 1541596432681
                },
                {
                    id: 'abaegqt3q3',
                    from: 'sender3',
                    subject: 'this is a subject 3',
                    body: 'this is the message x 3',
                    isRead: false,
                    sentAt: 1541596432681
                },
            ]

        }
    },
    methods: {
        getTimestamp() {
            return new Date() + 30000;
        },
        deleteMail(emailId){
            console.log('delete');
            var idx = this.emails.findIndex(email=> email.id === emailId);
            this.emails.splice(idx,1);
        }

    },
    computed:{
        readStatus(){
            console.log('readStatus')
            var unReads = this.emails.filter(email=> !email.isRead)
            this.$emit('unreadComputed',unReads.length)
        }
    },
    created(){
        // this.readStatus();
    },
    components: {
        singleEmail,
    }
}