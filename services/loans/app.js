import express from "express";
import bodyParser from "body-parser";
import loanRoutes from "./routes/loansRoutes.js"

const app = express();

app.use(bodyParser.json());
app.use('/loans', loanRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Loans Service running on port ${PORT}`);
});