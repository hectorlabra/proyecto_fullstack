import express from "express";
import { config } from "./config/envs";
import router from "./routes/index";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(router);

const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
