import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db"
import {errorResponserHandler, invalidPathHandler} from "./middleware/errorHandler";

// Routers
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";
import postCategoryRoutes from "./routes/postCategoryRoutes";

dotenv.config();

connectDB()

const app = express()
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Server is running...")
})

app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/categories", postCategoryRoutes);


app.use(invalidPathHandler);
app.use(errorResponserHandler);

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
