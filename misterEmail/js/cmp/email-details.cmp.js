import emailService from './../service/emails-service.js'

export default {
    name:'email-details',
    template:`
    <section class="email-editor">
    
    <div class="header flex space-between">
    <h1>Read Email</h1>
    <span><router-link to="/">Back</router-link></span>
    </div>
    <div class="email-details">
    <h3>From: {{email.from}}</h3>
    <h3>Subject: {{email.subject}}</h3>
    <p class="time">{{showEmailtime}}</p>   
    <p>{{email.body}}</p>   
    </div>
    
    
    </section>
    `,
    data(){
        return{
            email: {},
        }
    },
    created() {
        this.loadEmailData();
    },
    methods:{
        loadEmailData() {
            const emailId = this.$route.params.theEmailId;
            emailService.getEmailById(emailId)
            .then(email => this.email = email)
            
            emailService.updateIsRead(emailId)
            
        },
    },
    computed:{
        showEmailtime(){
            var gmtIdx = new Date(this.email.sentAt).toString().indexOf('GMT');
            var time = new Date(this.email.sentAt).toString().substring(0,gmtIdx);
            if (time) return time;
        }
    }
}