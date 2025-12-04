import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import ENV from "./config/env.js";

const PORT = ENV.PORT||3000

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});