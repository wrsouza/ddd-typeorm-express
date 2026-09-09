import { database } from "./config";
import seeds from "./seeds";
import server from "./server";

database
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized successfully!");

    seeds().then(() => console.log("seeds completed"));
    // ── Start ────────────────────────────────────────────────────────────────────
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
