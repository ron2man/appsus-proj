export default {
    name: 'keep-list',
    props:['notes'],
    template: `
        <section v-if="notes" class="notes-list-container flex">
                <div  class="item-container flex column" v-for="currNote in notes">
                    <h3>{{currNote.title}}</h3>
                    <ul>
                        <li>{{currNote.description}}</li>
                        <li>{{currNote.location}}</li>
                        <li>{{currNote.created}}</li>
                    </ul>
                </div>
        </section>
`,
}