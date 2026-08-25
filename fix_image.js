const fs = require('fs');
const https = require('https');
const path = require('path');

const url = "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=1600&auto=format&fit=crop";
const dest = path.join(__dirname, 'public', 'images', 'project-01.jpg');

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

download(url, dest).then(() => {
    console.log("Downloaded replacement image");
}).catch(console.error);
