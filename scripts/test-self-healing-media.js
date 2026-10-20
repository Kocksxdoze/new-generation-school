import { app } from "../src/app.js";
import { prisma } from "../src/config/db.js";
import fs from "node:fs/promises";
import path from "node:path";
import http from "node:http";

async function run() {
  const server = http.createServer(app);
  await new Promise(r => server.listen(4005, r));
  console.log("Test server running on port 4005");

  const testSubdir = "test-restore";
  const testFilename = `test-${Date.now()}.webp`;
  const testUrl = `/uploads/${testSubdir}/${testFilename}`;
  const diskPath = path.join(process.cwd(), "uploads", testSubdir, testFilename);

  // 1. Create a 1x1 test webp base64
  const dummyWebpBase64 = "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==";
  const dataUri = `data:image/webp;base64,${dummyWebpBase64}`;

  // 2. Insert into DB (simulating an image saved before restart)
  const media = await prisma.media.create({
    data: {
      filename: testFilename,
      url: testUrl,
      mimeType: "image/webp",
      size: 32,
      width: 1,
      height: 1,
      alt: "Test restore",
      data: dataUri,
    },
  });
  console.log("Created media record in DB:", media.id, testUrl);

  // Make sure the file DOES NOT exist on disk (simulate restart)
  await fs.rm(diskPath, { force: true }).catch(() => {});
  const existsBefore = await fs.access(diskPath).then(() => true).catch(() => false);
  console.log("File exists on disk before request:", existsBefore);

  // 3. Make HTTP GET request
  const response = await new Promise((resolve, reject) => {
    http.get(`http://localhost:4005${testUrl}`, res => {
      const chunks = [];
      res.on("data", c => chunks.push(c));
      res.on("end", () => resolve({
        statusCode: res.statusCode,
        contentType: res.headers["content-type"],
        body: Buffer.concat(chunks),
      }));
    }).on("error", reject);
  });

  console.log("HTTP Status:", response.statusCode);
  console.log("Content-Type:", response.contentType);
  console.log("Received bytes:", response.body.length);

  // 4. Verify disk restore
  await new Promise(r => setTimeout(r, 500));
  const existsAfter = await fs.access(diskPath).then(() => true).catch(() => false);
  console.log("File restored to disk after request:", existsAfter);

  // Cleanup
  await prisma.media.delete({ where: { id: media.id } });
  await fs.rm(path.join(process.cwd(), "uploads", testSubdir), { recursive: true, force: true }).catch(() => {});
  server.close();

  if (response.statusCode === 200 && response.contentType === "image/webp" && existsAfter) {
    console.log(">>> SELF-HEALING MEDIA TEST: PASSED 100%! <<<");
    process.exit(0);
  } else {
    console.error(">>> SELF-HEALING MEDIA TEST: FAILED! <<<");
    process.exit(1);
  }
}

run().catch(err => {
  console.error("Test error:", err);
  process.exit(1);
});
