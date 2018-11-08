import emailService from './../service/emails-service.js'

import controllerComp from './app-controller.cmp.js';
import emailList from './email-list.cmp.js';


export default {
    template: `
    <section>
    <controller-comp :unReadEmails="unReadEmails" @onInput="setSearchQuery" @setFilter="setFilter" @setSort="setSort"></controller-comp>
    <email-list @unReadCount="updateUnRead" :emails="emailsToShow"></email-list>    
    </section>
    `,
    data() {
        return {
            emails:[],
            unReadEmails: 0,
            searchQuery: '',
            filter: { all: true, read: false, unread: false },
            sortBy: 'date',

        }
    },
    methods: {
        setSearchQuery(query) {
            this.searchQuery = query;
        },
        setFilter(filter) {
            this.filter = filter;
        },
        setSort(sort) {
            console.log('emit is here - ', sort)
            this.sortBy = sort;
        },
        updateUnRead(unreadEmails) {
            this.unReadEmails = unreadEmails;
        },

    },
    computed: {
        emailsToShow() {
            // Filter By Search Query
            return this.emails.filter(email =>
                email.subject.toUpperCase().includes(this.searchQuery.toUpperCase())
                || email.body.toUpperCase().includes(this.searchQuery.toUpperCase())
                || email.from.toUpperCase().includes(this.searchQuery.toUpperCase())).filter(email =>
                    (this.filter.all && email) || (this.filter.read && email.isRead) || (this.filter.unread && !email.isRead))
                .sort((this.sortBy === 'date' ? sortEmailsByDate : sortEmailsBySubject))

            function sortEmailsBySubject(emailA, emailB) {
                var subjectA = emailA.subject.toUpperCase();
                var subjectB = emailB.subject.toUpperCase();
                if (subjectA < subjectB) return -1;
                if (subjectA > subjectB) return 1;
                return 0;
            }

            function sortEmailsByDate(emailA, emailB) {
                if (emailA.sentAt > emailB.sentAt) return -1;
                if (emailA.sentAt < emailB.sentAt) return 1;
                return 0;
            }
        }
    },
    components:{
        controllerComp,
        emailList,
    },
    created(){
        this.emails = emailService.query();
    }
}