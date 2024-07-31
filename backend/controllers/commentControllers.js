import Comment from "../models/Comment";
import Post from "../models/Post";

const createComment = async (req, res, next) => {
  try {
    const {desc, slug} = req.body;

    const post = await Post.findOne({slug})

    if (!post) {
      const error = new Error("Post was not found!");
      return next(error);
    }

    const newComment = new Comment({
      user: req.user._id,
      desc,
      post: post._id,
    })

    const commentSaved = await newComment.save();
    return res.json(commentSaved);

  } catch (error) {
    next(error)
  }
}

const updateComment = async (req, res, next) => {
  try {
    const {desc, check} = req.body;

    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      const error = new Error("Comment was not found!");
      return next(error);
    }

    comment.desc = desc || comment.desc;
    comment.check = check || comment.check;

    const commentUpdated = await comment.save();

    return res.json(commentUpdated);
  } catch (error) {
    next(error)
  }
}

const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.commentId)
    if (!comment) {
      const error = new Error("Comment was not found!")
      return next(error)
    }

    await Comment.deleteMany({post: comment._id});

    return res.json({message: "Comment is deleted successfully"})
  } catch (error) {
    next(error)
  }
}


export {
  createComment,
  updateComment,
  deleteComment,
}
