import emailService from './../service/emails-service.js'

export default {
    name:'email-editor',
    template: `
<section class="email-editor">
<div class="header flex space-between">
<h1>New Email</h1>
<span>Back</span>
</div>
<form @submit.prevent="emailSend">
<input required type="text" v-model="email.from" placeholder=" To:">
<input required type="text" v-model="email.subject" placeholder=" Subject:">
<textarea v-model="email.body" rows="4" cols="50" placeholder="Type your Email message" name="comment">
</textarea>
<div class="buttons flex space-evenly">
<button @click.prevent="clearTextBody">Clear</button> |
<button type="submit">Send</button>
</div>
</form>
</section>
`,
    data() {
        return {
            email: {
                from: '',
                body: '',
                subject: '',
            }
        }
    },
    methods: {
        emailSend() {
            console.log('im inside')
            var email = {
                from: this.email.from,
                body: this.email.body,
                subject: this.email.subject,
                sentAt: new Date().getTime(),
            }
            // this.$emit('emailSent', email)
            emailService.save(email);
            this.$router.push('/');
        },
        clearTextBody() {
            this.email = {
                from: '',
                body: '',
                subject: '',
            }
        }
    }

}