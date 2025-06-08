const fs = require('fs');
const path = require('path');

function imageToBase64() {
    try {
        // Adjust the path to point to your logo file
        const logoPath = path.join(__dirname, '..', '..', 'frontend', 'src', 'assets', 'snapsolveLogo.png');
        const image = fs.readFileSync(logoPath);
        return Buffer.from(image).toString('base64');
    } catch (error) {
        console.error('Error converting image to base64:', error);
        return null;
    }
}

// Run this to get your base64 string
console.log(imageToBase64());

module.exports = { imageToBase64 };