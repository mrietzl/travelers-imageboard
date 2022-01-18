// named import for the commentComment
import { commentComponent } from "./commentComponent.js";

// named export
export const modalComponent = {
    props: ["id"],
    template: `
        <div class="modal" v-if="url">

            <section class="modal-image">
                <button class="button-no-3" @click="handleClick"><img class="icon-arrow-left" src="/images/imageboard_icon-arrow-lightblue-left.svg" alt="icon-arrow-left">back</button>
                <img class="preview-img"  :src="url" alt="image" >
                <p><b>{{title}}</b></p>
                <p>{{description}}</p>
                <p id="add-info">A travel experience from {{username}}, {{created_at}}</p>
                <comment-component :id="id"></comment-component>
            </section>
            
        </div>
        `,

    // for option 2:
    /*     template: `
                <div class="modal">
                    <p>I am the overlay</p>
                    <p>Selected Image ID: {{id}}</p>
                    <img :src="image.url" alt="image" >
                    <p>{{image.username}}</p>
                    <p>{{image.title}}</p>
                    <p>{{image.description}}</p>
                    <p>{{image.created_at}}</p>
                    <button @click="handleClick">Close X</button>
                </div>
            `, */

    data() {
        return {
            // option 1:
            url: "",
            username: "",
            title: "",
            description: "",
            created_at: "",

            // when you use option 2 inside the fetch request …
            // … here only needs to be defined an empty object for the 'image':
            // image: null,
        };
    },
    mounted() {
        console.log("modal component mounted", this.id);

        fetch("/clickedimage/" + this.id)
            .then((res) => {
                console.log(res.status, res.ok);

                return res.json();
            })
            .then((data) => {
                console.log("data from GET /clickedimage request:", data);

                //option 1:
                this.url = data.url;
                this.username = data.username;
                this.title = data.title;
                this.description = data.description;
                this.created_at = new Date(data.created_at).toDateString();
                // use this link to set the date as you want:
                // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date

                // option 2:
                // this.image = data;
            });
    },
    methods: {
        handleClick() {
            console.log("going to close modal...");
            // using events to communicate from child (modal) to parent (vue instance)
            this.$emit("close", true);
        },
    },
    components: {
        "comment-component": commentComponent,
    },
};
