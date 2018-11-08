import emailService from './../service/emails-service.js'

import headerComp from './app-header.cmp.js';
import controllerComp from './app-controller.cmp.js';
import emailList from './email-list.cmp.js';
import footerComp from './app-footer.cmp.js';

export default {
    template: `
<div  class="main-container">
        <header-comp></header-comp>
        <controller-comp :unReadEmails="unReadEmails" @onInput="setSearchQuery" @setFilter="setFilter" @setSort="setSort"></controller-comp>
        <email-list @unReadCount="updateUnRead" :emails="emailsToShow"></email-list>
        <footer-comp></footer-comp>
    </div>
`, data() {
        return {
            unReadEmails: 0,

            emails: [],
            searchQuery: '',
            filter: { all: true, read: false, unread: false },
            sortBy: 'date',
        }
    },
    components: {
        headerComp,
        controllerComp,
        emailList,
        footerComp
    },
    methods: {
        setSearchQuery(query) {
            this.searchQuery = query;
        },
        updateUnRead(unreadEmails) {
            this.unReadEmails = unreadEmails;
        },
        setFilter(filter) {
            this.filter = filter;
        },
        setSort(sort) {
            console.log('emit is here - ', sort)
            this.sortBy = sort;
        },
        countUnreadeEmails() {
            this.unReadEmails = this.emails.filter(email => email.isRead === false);
            // this.unReadEmails = this.emails.filter(email=> !email.isRead)            
        }
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
    created() {
        console.log('%c Email APP Main CMP Created', 'color:black;background-color:gold;font-size:1.2em');
        this.emails = emailService.query();
    }

}