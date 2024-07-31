import {model, Schema} from "mongoose";

const CommentSchema = new Schema(
  {
    user: {type: Schema.Types.ObjectId, ref: "User", required: true},
    desc: {type: String, required: true},
    post: {type: Schema.Types.ObjectId, ref: "Post", required: true},
    check: {type: Boolean, default: false},

  },
  {
    timestamps: true
  }
)


const Comment = model("Comment", CommentSchema);

export default Comment;
