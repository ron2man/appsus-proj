import emailService from './../service/emails-service.js'


export default {
    name: 'single-email-preview',
    props: ['email'],
    template: `
            <div class="email" v-bind:class="unreadClass">
                <div class="head flex space-between">
                    <h3><router-link :to="emailIdLink">
                        <span class="time">{{calcPresTime}}</span>
                        <span class="from">{{email.from}}</span></router-link>
                    </h3>
                    <span class="more" @click="showEmailControl"><i class="fas fa-ellipsis-h"></i></span>
                </div>
                <div class="subject">{{email.subject}}</div>
                <div class="preview">{{shortPreview}}</div>
                <template v-if="controlClicked">
                <div class="mail-control flex space-evenly">
                <span @click.prevent="changeIsRead">{{readOrUnread}}</span>
                <span title="delete" @click="deleteEmail"><i class="far fa-trash-alt"></i></span>
                <span title="replay"><i class="fas fa-reply"></i></span>
                <span><i class="fas fa-angle-double-right"></i></span>
                </div>
                </template>
            </div>
    `,
    data() {
        return {
            controlClicked: false,
        }
    },
    computed: {
        emailIdLink(){
            return `/email/${this.email.id}`;
        },
        shortPreview() {
            if (this.email.body.length < 100) return this.email.body;
            else return (`${this.email.body.substring(0, 100)}...`);
        },
        readOrUnread(){
            return (this.email.isRead ? 'Mark as unread' : 'Mark as read')
        },
        calcPresTime() {
            var timeStamp = +this.email.sentAt;

            var sentYear = new Date(timeStamp).getFullYear()
            var thisYear = new Date().getFullYear()

            var sentMonth = new Date(timeStamp).getMonth();
            var thisMonth = new Date().getMonth();

            var sentDay = new Date(timeStamp).getDay();
            var thisDay = new Date().getDay();


            if (sentYear === thisYear && sentMonth === thisMonth && sentDay === thisDay) {
                var hours = new Date(timeStamp).getHours();
                var minutes = new Date(timeStamp).getMinutes();
                return (hours + ':' + minutes)
            } else return (`${sentDay}/${sentMonth}/${sentYear}`)
        },
        unreadClass() {
            if (!this.email.isRead) return 'unread';
        },
    },
    methods: {
        deleteEmail(){
            emailService.deleteEmail(this.email.id);
        },
        showEmailControl(){
            this.controlClicked = !this.controlClicked;
        },
        changeIsRead() {
            this.email.isRead = !this.email.isRead;
            this.$emit('changeRead')
        }
    },
}