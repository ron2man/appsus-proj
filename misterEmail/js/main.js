'use strict'
import emailApp from './cmp/main-cmp-email-app.cmp.js';




var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!'
    },
    components:{
        emailApp,
        // test,
        // emailController,
    }
  })