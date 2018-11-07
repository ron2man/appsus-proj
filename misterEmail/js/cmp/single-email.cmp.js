export default {
    props: ['email'],
    template: `
            <div class="email" v-bind:class="unreadClass" v-on:click="changeStatus">
                <div class="head flex space-between">
                    <h3>
                        <span class="time">{{calcPresTime}}</span>
                        <span class="from">Yossi Yossi</span>
                    </h3>
                    <!-- <span class="delete"><i class="fas fa-trash-alt"></i></span> -->
                    <span class="delete"><i class="fas fa-ellipsis-h"></i></span>
                </div>
                <div class="subject">RE: Dear user - welcome to the app</div>
                <div class="preview">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis excepturi odio eum?</div>
            </div>
    `,
    data() {
        return {
            // isUnread:true,
        }
    },
    computed: {
        calcPresTime() {
            var timeStamp = +this.email.sentAt;
            var sentDate = new Date(timeStamp).getDate();
            var today = new Date().getDate();
            if (sentDate === today) {
                var hours = new Date(timeStamp).getHours();
                var minutes = new Date(timeStamp).getMinutes();
                return (hours + ':' + minutes)
            } else return sentDate;
        },
        unreadClass() {
            if (!this.email.isRead) return 'unread';
        },
    },
    methods: {
        changeStatus() {
            this.email.isRead = !this.email.isRead;
        }
    },
    created() {
        console.log(this.email)
    }
}