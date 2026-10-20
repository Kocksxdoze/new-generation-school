import { S3Client } from "@aws-sdk/client-s3";
import { env } from "./env.js";

let s3Client = null;

if (env.s3.endpoint && env.s3.accessKeyId && env.s3.secretAccessKey) {
  s3Client = new S3Client({
    endpoint: env.s3.endpoint,
    region: env.s3.region,
    credentials: {
      accessKeyId: env.s3.accessKeyId,
      secretAccessKey: env.s3.secretAccessKey,
    },
    forcePathStyle: true,
  });
  console.log(`[S3] Initialized S3 storage client for bucket: "${env.s3.bucket}"`);
}

export { s3Client };
