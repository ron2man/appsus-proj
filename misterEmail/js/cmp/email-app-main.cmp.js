import appRoutes from './../service/app-routes.js'

import headerComp from './app-header.cmp.js';
import footerComp from './app-footer.cmp.js';


// TODO - ENTER ROUTER LINKS AND VIEW
// TODO - BUILD ADD NEW EMAIL CMP


Vue.use(VueRouter);
const appRouter = new VueRouter({routes: appRoutes})

export default {
    template: `
    <div  class="main-container">
        <header-comp></header-comp>
        <router-view></router-view>
        <footer-comp></footer-comp>
    </div>
`, data() {
        return {
            emails: [],
        }
    },
    router: appRouter,
    components: {
        headerComp,
        footerComp
    },
    methods: {
        reciveEmail(email){
            console.log('email:',email);
            console.log('got new email - todo: send to DB, add id, add isRead=false')
        },
        deleteMail(emailId){
            console.log('delete');
            var idx = this.emails.findIndex(email=> email.id === emailId);
            this.emails.splice(idx,1);
            console.log('got delete req - todo: send to DB, and update emails')
        },
    },
    computed: { 

    },
    created() {
        console.log('%c  ', 'font-size: 176px; background: url(https://ih1.redbubble.net/image.15114079.5257/st%2Csmall%2C215x235-pad%2C210x230%2Cf8f8f8.lite-1u2.jpg) no-repeat;');
        console.log('%c App Created Succusfully -> It\'s all good, man', 'color:black;background-color:gold;font-size:1.2em');
    }

}