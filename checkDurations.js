import fs from "fs";
import * as mm from "music-metadata";

const files = [
  "public/sounds/vault/unlock.mp3",
  "public/sounds/vault/doors_close.mp3",
  "public/sounds/vault/access_denied.mp3",
];

async function checkDurations() {
  for (const file of files) {
    if (!fs.existsSync(file)) {
      console.log(`❌ Missing: ${file}`);
      continue;
    }

    try {
      const metadata = await mm.parseFile(file, { duration: true });
      const duration = metadata.format.duration;

      if (duration) {
        console.log(`🎧 ${file}: ${duration.toFixed(2)}s`);
      } else {
        console.log(`⚠️ ${file}: duration not available`);
      }
    } catch (err) {
      console.error(`❌ Failed to parse ${file}:`, err.message);
    }
  }
}

checkDurations();
