export default {
    name: 'controller',
    props: ['unReadEmails']
    , template:
        `
    <!-- CONTROLLER -->
        <section class="controller">
            <ul class="flex space-between fx-align-center">
                <li class="compose"><i class="far fa-plus-square"></i> New</li>
                <li><i class="fas fa-sort"></i> Sort</li>
                <li @click="toggleFilter"><i class="fas fa-filter"></i> Filter</li>
                <li><i class="fas fa-inbox"></i> <span>{{unReadEmails}}</span></li>
            </ul>

            <div class="un-read-filter flex space-between" v-if="this.isShowFilter">
            Show: <span class="bold">All</span> | <span>Read</span> |
             <span>Unread</span> <span @click="toggleFilter">X</span>
            </div>

            <div class="search">
                <input class="search-mail" @input="searchQuery" v-model="searchInput"  type="text" placeholder=" search email">
            </div>
        </section>
    `,
    data() {
        return {
            searchInput: '',
            isShowFilter: false,
            filter: 'all',
        }
    },
    methods: {
        searchQuery() {
            // When input entered - Emit to main app with search query
            this.$emit('onInput', this.searchInput);
        },
        toggleFilter(){
            this.isShowFilter = !this.isShowFilter;
        }
    },
    created() {
    }
}

