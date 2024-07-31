import {Router} from "express";
import {authGuard} from "../middleware/authMiddleware";
import {createComment, deleteComment, updateComment} from "../controllers/commentControllers";

const router = Router();

router
  .route("/create")
  .post(authGuard, createComment)

router
  .route("/:commentId")
  .put(authGuard, updateComment)
  .delete(authGuard, deleteComment)

export default router
