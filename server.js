import { app } from "./src/app.js";
import { env } from "./src/config/env.js";
import { autoInitDatabase } from "./src/database/autoInit.js";

async function start() {
  await autoInitDatabase();
  app.listen(env.port, () => {
    console.log(`NGS backend running on http://localhost:${env.port}`);
  });
}

start().catch((err) => {
  console.error("Fatal startup error:", err);
  process.exit(1);
});
