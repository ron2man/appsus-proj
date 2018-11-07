import homePage from './pages/home-page.cmp.js';
import aboutKeepPage from './pages/about-page.cmp.js';
import keepApp from './pages/keep-app.cmp.js';
import noteEdit from './pages/edit-page.cmp.js';




var myRoutes = [
    { path: '/', component: homePage },
    { path: '/about', component: aboutKeepPage },
    { path: '/keep', component: keepApp },
    {path: '/note/edit/:noteId?', component: noteEdit}
]

export default myRoutes;

