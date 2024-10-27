import express from "express";
import bodyParser from "body-parser";
import booksRoutes from "./routes/booksRoutes.js"

const app = express();

app.use(bodyParser.json());
app.use('/books', booksRoutes);

export default app;

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Books Service running on port ${PORT}`);
});