// named export
export const commentComponent = {
    props: ["id"],
    template: `
        <div id="comment-section">
            <input v-model="comment" type="text" name="comment" placeholder="comment"/>
            <input v-model="username" type="text" name="username" placeholder="username"/>
        </div>

        <button class="button-no-4" @click="sendComment">send comment</button>

        <div class="comments">
            <section class="each-comment" v-for="comment in comments" v-if="comments">
                <p><b>{{comment.username}}</b> {{comment.comment}}</p>
                <p><i>{{(new Date(comment.created_at)).toDateString()}}</i></p>
            </section>
        </div>
    `,

    data() {
        return {
            comments: [],

            comment: "",
            username: "",
        };
    },
    mounted() {
        console.log("comment component mounted", this.id);

        fetch("/comments/" + this.id)
            .then((res) => {
                console.log(res.status, res.ok);

                return res.json();
            })
            .then((data) => {
                console.log("data from GET /comments request:", data);

                this.comments = data;
            });
    },
    methods: {
        sendComment() {
            console.log("going to send a new comment …");

            /*             console.log("comment", this.input.id);
            console.log("comment", this.input.comment);
            console.log("username", this.input.username);
            console.log("username", this.input.image_id);
            console.log("username", this.input.created_at); */

            const newComment = {};

            newComment.comment = this.comment;
            newComment.username = this.username;
            newComment.image_id = this.id;

            console.log(newComment);

            fetch("/comment", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(newComment),
            })
                .then((res) => {
                    console.log(res.status, res.ok);
                    return res.json();
                })
                .catch((error) => {
                    console.log(error);
                })
                .then((data) => {
                    console.log("new comment", data);

                    // make new comment visible without reloading
                    // add the comment to this.comments
                    this.comments.unshift(data);

                    this.username = "";
                    this.comment = "";
                });
        },
    },
};
