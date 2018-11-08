import emailContainer from './../cmp/email-container.cmp.js'
import emailEditor from './../cmp/email-editor.cmp.js'
import emailDetails from './../cmp/email-details.cmp.js'




var myRoutes = [
    { path: '/', component: emailContainer },
    { path: '/new', component: emailEditor },
    { path: '/email/:theEmailId', component: emailDetails },
]

export default myRoutes;
