import emailContainer from './../cmp/email-container.cmp.js'
import emailEditor from './../cmp/email-editor.cmp.js'


var emailDetails = {
    template:`
    <section class="email-editor">
    <h1>Read Email</h1>
    <p>From: Sender Name</p>
    <p>Subject: Subject:</p>
    <p>Date:</p>
    </section>
    `
}

var myRoutes = [
    { path: '/', component: emailContainer },
    { path: '/new', component: emailEditor },
    { path: '/email/:theEmailId', component: emailDetails },
]

export default myRoutes;
