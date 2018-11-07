export default {
    name:'controller',
    template:
    `
    <!-- CONTROLLER -->
        <section class="controller">
            <ul class="flex space-between fx-align-center">
                <li class="compose"><i class="far fa-plus-square"></i> New</li>
                <li><i class="fas fa-sort"></i> Sort</li>
                <li><i class="fas fa-filter"></i> Filter</li>
                <li><i class="far fa-bell"></i> <span>0</span></li>
            </ul>
            <div class="search">
                <input class="search-mail" type="text" placeholder=" search email">
            </div>
        </section>
    `,
    data(){
        return{

        }
    }
}

