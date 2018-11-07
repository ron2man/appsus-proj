import homePage from './pages/home-page.cmp.js';
import aboutKeepPage from './pages/about-page.cmp.js';
import keepApp from './pages/keep-app.cmp.js';




var myRoutes = [
    { path: '/', component: homePage },
    { path: '/about', component: aboutKeepPage },
    { path: '/keep', component: keepApp },
]

export default myRoutes;

