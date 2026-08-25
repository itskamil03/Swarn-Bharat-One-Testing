const fs = require('fs');
const https = require('https');
const path = require('path');

const images = [
  { url: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=2400&auto=format&fit=crop", name: "slide-01.jpg" },
  { url: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2400&auto=format&fit=crop", name: "slide-02.jpg" },
  { url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2400&auto=format&fit=crop", name: "slide-03.jpg" },
  { url: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2400&auto=format&fit=crop", name: "slide-04.jpg" },
  { url: "https://images.unsplash.com/photo-1508824105099-3311ac02ed4d?q=80&w=1600&auto=format&fit=crop", name: "project-01.jpg" },
  { url: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1600&auto=format&fit=crop", name: "project-02.jpg" },
  { url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1600&auto=format&fit=crop", name: "project-03.jpg" },
  { url: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=1600&auto=format&fit=crop", name: "project-04.jpg" },
  { url: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1600&auto=format&fit=crop", name: "news-01.jpg" },
  { url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop", name: "news-02.jpg" },
  { url: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1200&auto=format&fit=crop", name: "news-03.jpg" }
];

const dir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, function(response) {
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
