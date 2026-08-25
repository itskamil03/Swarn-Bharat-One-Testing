const fs = require('fs');
const https = require('https');
const path = require('path');

const images = [
  { url: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop", name: "vision.jpg" }, // Solar
  { url: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop", name: "mission.jpg" }, // Teamwork
  { url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop", name: "values.jpg" } // Glowing globe/tech
];

const dir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, function(response) {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return download(response.headers.location, dest).then(resolve, reject);
      }
      response.pipe(file);
      file.on('finish', function() {
        file.close(resolve);
      });
    }).on('error', function(err) {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  for (const img of images) {
    console.log(`Downloading ${img.name}...`);
    try {
      await download(img.url, path.join(dir, img.name));
    } catch (e) {
      console.error(`Error downloading ${img.name}:`, e);
    }
  }
  console.log('Done!');
}

run();
