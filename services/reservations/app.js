import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/reservationsRoutes.js"

const app = express();

app.use(bodyParser.json());
app.use('/reservations', userRoutes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Reservation Service running on port ${PORT}`);
});