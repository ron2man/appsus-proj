export default {
    name: 'controller',
    props: ['unReadEmails']
    , template:
        `
    <!-- CONTROLLER -->
        <section class="controller">
            <ul class="flex space-between fx-align-center">
            
                <li class="compose"><router-link to="/new"><i class="far fa-plus-square"></i> New</router-link></li>
                <li @click="toggleSort"><i class="fas fa-sort"></i> Sort</li>
                <li @click="toggleFilter"><i class="fas fa-filter"></i> Filter</li>
                <li><i class="fas fa-inbox"></i> <span>{{unReadEmails}}</span></li>
            </ul>
            
            <div class="sub-controller flex space-between" v-if="this.isShowSort">
            Sort By: <span @click="setSort('date')" :class="[sortBy==='date'  ? 'bold' : '']">Date</span> | 
            <span @click="setSort('subject')" :class="[sortBy==='subject'  ? 'bold' : '']">Subject</span>
            <span @click="toggleSort">X</span>
            </div>
            
            <div class="sub-controller flex space-between" v-if="this.isShowFilter">
            Show: <span @click="setFilter('all')" :class="[filter.all  ? 'bold' : '']">All</span> | 
            <span @click="setFilter('read')" v-bind:class="[filter.read  ? 'bold' : '']">Read</span> |
             <span @click="setFilter('unread')" v-bind:class="[filter.unread  ? 'bold' : '']">Unread</span> <span @click="toggleFilter">X</span>
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
            isShowSort: false,
            filter: {
                all: true,
                read: false,
                unread: false
            },
            sortBy: 'date',
        }
    },
    methods: {
        searchQuery() {
            // When input entered - Emit to main app with search query
            this.$emit('onInput', this.searchInput);
        },
        toggleFilter() {
            this.isShowFilter = !this.isShowFilter;
            if(this.isShowSort) this.isShowSort = false;
        },
        toggleSort() {
            this.isShowSort = !this.isShowSort;
            if(this.isShowFilter) this.isShowFilter = false;
        },
        setFilter(filter) {
            if (filter === 'all') this.filter = { all: true, read: false, unread: false }
            else if (filter === 'read') this.filter = { all: false, read: true, unread: false }
            else if (filter === 'unread') this.filter = { all: false, read: false, unread: true }
            this.$emit('setFilter', this.filter);
        },
        setSort(sort) {
            this.sortBy = sort;
            this.$emit('setSort', this.sortBy);
        }
    },
    created() {
    }
}

