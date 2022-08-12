import dotenv from "dotenv";
import { app } from "./express";

dotenv.config();
const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
