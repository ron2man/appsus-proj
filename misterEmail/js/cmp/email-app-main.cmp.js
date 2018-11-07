import emailService from './../service/emails-service.js'

import headerComp from './app-header.cmp.js';
import controllerComp from './app-controller.cmp.js';
import emailList from './email-list.cmp.js';
import footerComp from './app-footer.cmp.js';

export default {
    template: `
<div  class="main-container">
        <header-comp></header-comp>
        <controller-comp :unReadEmails="unReadEmails" @onInput="setSearchQuery" @setFilter="setFilter"></controller-comp>
        <email-list @unReadCount="updateUnRead" :emails="emailsToShow"></email-list>
        <footer-comp></footer-comp>
    </div>
`, data() {
        return {
            unReadEmails: 0,
            
            emails:[],
            searchQuery: '',
            filter: {all:true,read:false,unread:false}
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
        },
        setFilter(filter){
            this.filter = filter;
            console.log(filter)
        },
        countUnreadeEmails(){
            this.unReadEmails = this.emails.filter(email=> email.isRead === false);
            // this.unReadEmails = this.emails.filter(email=> !email.isRead)
            
            // console.log(this.unReadEmails.length)
        }
    },
    computed: {
        emailsToShow(){
            // Filter By Search Query
            return this.emails.filter(email => 
                email.subject.toUpperCase().includes(this.searchQuery.toUpperCase())
             || email.body.toUpperCase().includes(this.searchQuery.toUpperCase())
             || email.from.toUpperCase().includes(this.searchQuery.toUpperCase())).filter(email =>
                (this.filter.all && email) || (this.filter.read && email.isRead) || (this.filter.unread && !email.isRead) 
                );
        } 
    },
    created(){
        console.log('%c Email APP Main CMP Created','color:black;background-color:gold;font-size:1.2em');
        this.emails = emailService.query();
    }

}