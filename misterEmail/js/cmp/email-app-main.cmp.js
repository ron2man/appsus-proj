import emailService from './../service/emails-service.js'

import headerComp from './app-header.cmp.js';
import controllerComp from './app-controller.cmp.js';
import emailList from './email-list.cmp.js';
import footerComp from './app-footer.cmp.js';

export default {
    template: `
<div  class="main-container">
        <header-comp></header-comp>
        <controller-comp :unReadEmails="unReadEmails" @onInput="setSearchQuery"></controller-comp>
        <email-list @unReadCount="updateUnRead" :emails="emailsToShow"></email-list>
        <footer-comp></footer-comp>
    </div>
`, data() {
        return {
            unReadEmails: 0,
            emails:[],
            searchQuery: '',
        }
    },
    components: {
        headerComp,
        controllerComp,
        emailList,
        footerComp
    },
    methods: {
        setSearchQuery(query){
            this.searchQuery = query;
            // console.log(query);
        },
        updateUnRead(unreadEmails) {
            this.unReadEmails = unreadEmails;
        }
    },
    computed: {
        emailsToShow(){
            // Filter By Search Query
            return this.emails.filter(email => 
                email.subject.toUpperCase().includes(this.searchQuery.toUpperCase())
             || email.body.toUpperCase().includes(this.searchQuery.toUpperCase())
             || email.from.toUpperCase().includes(this.searchQuery.toUpperCase()));
        } 
    },
    created(){
        console.log('%c Email APP Main CMP Created','color:black;background-color:gold;font-size:1.2em');
        this.emails = emailService.query();
    }

}