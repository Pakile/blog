import PostCategories from "../models/PostCategories";
import Post from "../models/Post";

const createPostCategory = async (req, res, next) => {
  try {
    const {title} = req.body;

    const category = await PostCategories.findOne({title});

    if (category) {
      const error = new Error("Category is already created!");
      return next(error);
    }

    const newCategory = new PostCategories({title});

    const categorySaved = await newCategory.save();

    return res.status(201).json(categorySaved)

  } catch (error) {
    next(error);
  }
}

const getPostCategory = async (req, res, next) => {
  try {

    // find category by id
    const postCategory = await PostCategories.findById(req.params.categoryId);

    if (!postCategory) {
      const error = new Error("Category was not found!");
      return next(error);
    }

    return res.json(postCategory);

  } catch (error) {
    next(error);
  }
}

const updatePostCategory = async (req, res, next) => {
  try {
    const {title} = req.body;

    const postCategory = await PostCategories.findByIdAndUpdate(req.params.categoryId,
      {
        title,
      }, {
        new: true
      });

    if (!postCategory) {
      const error = new Error("Category was not found!");
      return next(error)
    }

    return res.json(postCategory)

  } catch (error) {
    next(error);
  }
}

const deletePostCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;

    await Post.updateMany(
      {categories: {$in: [categoryId]}},
      {$pull: {categories: categoryId}}
    );

    await PostCategories.deleteOne({_id: categoryId});

    res.send({
      message: "Post category is successfully deleted!",
    });

  } catch (error) {
    next(error);
  }
}

export {
  createPostCategory,
  getPostCategory,
  updatePostCategory,
  deletePostCategory
}
