import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoute.js";

const app = express();
const PORT = process.env.PORT || 3000;

//Lets connect database
await connectDB()

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("Server is running fine..."));
app.use('/api/users', userRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
