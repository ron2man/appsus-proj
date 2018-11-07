import headerComp from './app-header.cmp.js';
import controllerComp from './app-controller.cmp.js';
import emailsComp from './app-emails-container.cmp.js';
import footerComp from './app-footer.cmp.js';

export default {
    template: `
<div  class="main-container">
        <header-comp></header-comp>
        <controller-comp></controller-comp>
        <emails-comp @unReadCount="updateUnRead"></emails-comp>
        <footer-comp></footer-comp>
    </div>
`,data(){
    return{
        unReadEmails: 0,
    }
},
components: {
    headerComp,
    controllerComp,
    emailsComp,
    footerComp
},
methods:{
    updateUnRead(unreadEmails){
        console.log(unreadEmails);
    }
}

}