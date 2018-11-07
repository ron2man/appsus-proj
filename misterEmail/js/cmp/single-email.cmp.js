export default {
    props: ['email'],
    template: `
            <div class="email" v-bind:class="unreadClass">
                <div class="head flex space-between">
                    <h3>
                        <span class="time">{{calcPresTime}}</span>
                        <span class="from">{{email.from}}</span>
                    </h3>
                    <span class="more" @click="showEmailControl"><i class="fas fa-ellipsis-h"></i></span>
                </div>
                <div class="subject">{{email.subject}}</div>
                <div class="preview">{{shortPreview}}</div>
                <template v-if="controlClicked">
                <div class="mail-control flex space-evenly">
                <span @click="changeIsRead">{{readOrUnread}}</span>
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
        shortPreview() {
            return (`${this.email.body.substring(0, 100)}...`);
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
            this.$emit('delete',this.email.id)
        },
        showEmailControl(){
            this.controlClicked = !this.controlClicked; 
        },
        changeIsRead() {
            this.email.isRead = !this.email.isRead;
        }
    },
    created() {
        console.log(this.email)
    }
}