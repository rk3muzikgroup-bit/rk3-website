import type { NextApiRequest, NextApiResponse } from "next";
// import AWS SDK + credentials...

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Validate auth, check user quota
  // Validate file type + size
  // Create S3 key: `users/{userId}/uploads/{timestamp}_{filename}`
  // Generate presigned PUT URL with short expiry
  // Save metadata record to DB (so we know what user stored)
  res.status(200).json({ uploadUrl: "https://s3-presigned-url", key: "users/..." });
}
