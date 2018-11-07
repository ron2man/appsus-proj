import singleEmail from './single-email.cmp.js'

export default {
    template: `
    <!-- EMAILS -->
        <section class="emails">
        <single-email v-for="email in emails" :email="email"></single-email>
        </section>
    `,
    data() {
        return {
            emails: [
                {
                    from: 'sender1',
                    subject: 'this is a subject 1',
                    body: 'this is the message x 3',
                    isRead: false,
                    sentAt: 1541596432631,
                },
                {
                    from: 'sender2',
                    subject: 'this is a subject 2',
                    body: 'this is the message x 3',
                    isRead: true,
                    sentAt: 1541796432631
                },
                {
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
        }
    },
    components: {
        singleEmail,
    }
}