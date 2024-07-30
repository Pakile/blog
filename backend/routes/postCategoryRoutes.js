import express from "express";
import {adminGuard, authGuard} from "../middleware/authMiddleware";
import {
  createPostCategory,
  deletePostCategory,
  getPostCategory,
  updatePostCategory
} from "../controllers/postCategoryControllers";

const router = express.Router();

router
  .route("/")
  .post(authGuard, adminGuard, createPostCategory)

router
  .route("/:categoryId")
  .get(getPostCategory)
  .put(authGuard, adminGuard, updatePostCategory)
  .delete(authGuard, adminGuard, deletePostCategory)


export default router
