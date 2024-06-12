const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

const resultDirName = `result-${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`
const imageDir = path.join(__dirname, 'images')
const resultDir = path.join(__dirname, 'results')

const outputDirectory = path.join(resultDir, resultDirName)

if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory)
}
if (!fs.existsSync(path.join(outputDirectory, 'images'))) {
  fs.mkdirSync(path.join(outputDirectory, 'images'))
}

async function compressAndConvertToWebP() {
  if (!fs.existsSync(imageDir)) {
    console.error(`Directory ${imageDir} does not exist.`)
    return
  }

  // Get a list of files in the directory
  const files = fs.readdirSync(imageDir)

  // Iterate over each file
  for (const file of files) {
    // Check if the file is an image (you can adjust this check based on your requirements)
    if (
      file.endsWith('.jpg') ||
      file.endsWith('.jpeg') ||
      file.endsWith('.png')
    ) {
      try {
        const filePath = path.join(imageDir, file)
        // Compress the image and convert to WebP format using sharp
        await sharp(filePath)
          .webp({ quality: 50 }) // Adjust the quality as needed
          .toFile(
            path.join(
              outputDirectory,
              'images',
              `${file.replace(/\.[^/.]+$/, '')}.webp`,
            ),
          )
      } catch (err) {
        console.error(`Error compressing and converting to WebP: ${file}`, err)
      }
    }
  }
}

module.exports = compressAndConvertToWebP
