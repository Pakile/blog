import Post from "../models/Post";
import { v4 as uuidv4 } from 'uuid';

const createPost = async (req, res, next) => {
  try {

    const post = new Post({
      title: "sample title",
      caption: "sample caption",
      slug: uuidv4(),
      body: {
        type: "doc",
        content: [],
      },
      photo: "",
      user: req.user._id,
    });

    const postCreated = await post.save();
    return res.json(postCreated)

  } catch (error) {
    next(error)
  }
}

const updatePost = async (req, res, next) => {
  try {
    //find exits post
    const post = await Post.findOne({slug: req.params.slug});

    if (!post) {
      const error = new Error("Post was not found!");
      next(error)
      return;
    }

    const {title, caption, slug, body, tags} = JSON.parse(req.body.document);

    post.title = title || post.title;
    post.caption = caption || post.caption;
    post.slug = slug || post.slug;
    post.body = body || post.body;
    post.tags = tags || post.tags;

    const updatedPost = await post.save();
    return res.json(updatedPost);

  } catch (error) {
    next(error)
  }
}

const getPost = async (req, res, next) => {
  try {
    const post = await Post.findOne({slug: req.params.slug}).populate([
      {
        path: "user",
        select: ["avatar", "name"],
      }
    ]);

    if (!post) {
      const error = new Error("Post was not found");
      return next(error);
    }

    return res.json(post);
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findOneAndDelete({slug: req.params.slug});

    if (!post) {
      const error = new Error("Post was not found");
      return next(error);
    }

    return res.json({
      message: "Post is successfully deleted",
    });
  } catch (error) {
    next(error);
  }
};


export {
  createPost,
  updatePost,
  getPost,
  deletePost,
}
