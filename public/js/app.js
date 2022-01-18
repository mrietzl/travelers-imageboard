import * as Vue from "./vue.js";

// named import
import { modalComponent } from "./modalComponent.js";
import { commentComponent } from "./commentComponent.js";

Vue.createApp({
    // date needs to be a function that returns a object
    data() {
        return {
            images: [],
            // title, description and username are two-way binded
            // to the according input fields due to v-model
            input: {
                username: "",
                description: "",
                title: "",
                file: null,
            },
            selectedImageId: location.pathname.slice(1),
            hasMore: false,
            error: false,
            success: false,
        };
    },
    // lifecycle methods
    // mounted: our template has been rendered once:
    // perfect place to do fetch requests to ask the server for data
    mounted() {
        console.log("mounted");

        // if method is not given, it is a GET request by default
        fetch("/images")
            .then((res) => {
                console.log(res.status, res.ok);

                return res.json();
            })
            .then((data) => {
                console.log("data from GET /images request:", data);

                this.images = data;

                // check if we need to show the load more button

                /* console.log(
                    this.images[this.images.length - 1].id,
                    data[0].lowestid
                ); */

                // by comparing lowestid with the id of last image the user sees on screen
                if (this.images[this.images.length - 1].id > data[0].lowestid) {
                    this.hasMore = true;
                }
            });

        // browser url changed, e.g. because the user
        // navigated back and forth with the browser history buttons
        window.addEventListener("popstate", () => {
            this.selectedImageId = location.pathname.slice(1);
        });
    },
    methods: {
        handleSubmit() {
            //stop browser from "normal" POST request
            // with vanilla JS e.preventDefault()
            // vue does it automatically for us with @submit.prevent=""
            console.log("username", this.input.username);
            console.log("title", this.input.title);
            console.log("description", this.input.description);
            console.log("file", this.input.file);

            // we need to work with FormData,
            // because we want to POST a file:
            // Content-type: multipart/form-data
            const formData = new FormData();
            formData.append("username", this.input.username);
            formData.append("title", this.input.title);
            formData.append("description", this.input.description);
            formData.append("file", this.input.file);

            fetch("/images", { method: "POST", body: formData })
                .then((res) => {
                    console.log(res.status, res.ok);
                    return res.json();
                })
                .then((data) => {
                    console.log("new image", data);

                    if (
                        data.username === "" ||
                        data.title === "" ||
                        data.file === null
                    ) {
                        this.error = true;
                    } else {
                        // make new image visible without reloading
                        // add the image to this.images
                        this.images.unshift(data);
                        this.error = false;
                        this.success = true;

                        // empty the input fields again after uploading the picture & text
                        this.input.username = "";
                        this.input.title = "";
                        this.input.description = "";
                        document.querySelector("input[type=file]").value = "";
                    }
                })
                .catch((err) => {
                    console.log(
                        "something went wrong while uploading the image:",
                        err
                    );
                    this.error = true;
                });
        },
        handleChange(e) {
            this.input.file = e.target.files[0];
        },

        // method for the 'load more' button
        loadMore() {
            console.log("going to load the next 6 images...");

            // id of the last image the user currently sees on screen
            let lastId = this.images[this.images.length - 1].id;

            console.log("lastId", lastId);

            fetch(`/images/more?after=${lastId}`)
                .then((res) => {
                    return res.json();
                })
                .then((nextImages) => {
                    // make nextImage visible for user
                    console.log(
                        nextImages,
                        "lastId no.2 is ",
                        lastId,
                        nextImages[0].lowestid
                    );

                    // use a for-condition here
                    for (let i = 0; i < nextImages.length; i++) {
                        this.images.push(nextImages[i]);
                    }

                    lastId = this.images[this.images.length - 1].id;

                    // check if we need to hide the load more button

                    /* console.log("lastId is ", lastId, nextImages[0].lowestid); */

                    // by comparing lowestid with the id of last image the user sees on screen
                    if (lastId === nextImages[0].lowestid) {
                        this.hasMore = false;
                    }
                });
        },

        // we can add any methods,
        // e.g. to use them as event handlers in our vue template

        // methods for part 3 & 5:
        handleClick(id) {
            console.log("clicked image", id);

            // add image id to browser url (part 5):
            history.pushState({}, "", "/" + id);

            // (part 3):
            this.selectedImageId = id;
        },
        handleClose(invalid) {
            // remove image id from browser url (part 5):
            if (!invalid) {
                // navigate to URL WITH adding an entry to the browser history
                history.pushState({}, "", "/");
            } else {
                // navigate to URL WITHOUT adding an entry to the browser history
                history.replaceState({}, "", "/");
            }

            // (part 3):
            this.selectedImageId = null;
        },
    },
    components: {
        "modal-component": modalComponent,
        "comment-component": commentComponent,
    },
}).mount("#root");
