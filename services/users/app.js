import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/usersRoutes.js"

const app = express();

app.use(bodyParser.json());
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`Users Service running on port ${PORT}`);
});