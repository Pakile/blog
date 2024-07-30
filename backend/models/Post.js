import {model, Schema} from "mongoose";

const PostSchema = new Schema(
  {
    title: {type: String, required: true},
    caption: {type: String, required: true},
    slug: {type: String, required: true, unique: true},
    body: {type: Object, required: true},
    photo: {type: String, required: false},
    user: {type: Schema.Types.ObjectId, ref: "User"},
    tags: {type: [String]},
  },
  {timestamps: true}
);

const Post = model("Post", PostSchema);
export default Post;
