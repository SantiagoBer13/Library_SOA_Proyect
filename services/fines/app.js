import express from "express";
import bodyParser from "body-parser";
import fineRoutes from "./routes/finesRoutes.js"

const app = express();

app.use(bodyParser.json());
app.use('/fines', fineRoutes);

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Fines Service running on port ${PORT}`);
});