import dotenv from "dotenv";

dotenv.config();

import app from "./api/index.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://172.16.144.121:${PORT}`);
});
