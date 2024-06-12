const fs = require('fs')
const path = require('path')
const cheerio = require('cheerio')

function randomString(className = '', length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  if (className) {
    return `${result}-${className}`
  }
  return result
}

fs.readFile(path.join(__dirname, 'index.html'), 'utf8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  const $ = cheerio.load(data)
  const classMapping = {}

  $('[class]').each(function () {
    const classes = $(this).attr('class').split(/\s+/)
    const newClasses = classes.map(className => {
      if (!classMapping[className]) {
        classMapping[className] = randomString(className)
      }
      return classMapping[className]
    })
    $(this).attr('class', newClasses.join(' '))
  })

  $('style').each(function () {
    let styleContent = $(this).html()
    Object.keys(classMapping).forEach(originalClass => {
      const regex = new RegExp(`\\.${originalClass}(\\s|\\{|\\.|\\:|\\,)`, 'g')
      styleContent = styleContent.replace(
        regex,
        `.${classMapping[originalClass]}$1`,
      )
    })
    $(this).html(styleContent)
  })

  $('*[style]').each(function () {
    let styleContent = $(this).attr('style')
    Object.keys(classMapping).forEach(originalClass => {
      const regex = new RegExp(`\\.${originalClass}(\\s|\\{|\\.|\\:|\\,)`, 'g')
      styleContent = styleContent.replace(
        regex,
        `.${classMapping[originalClass]}$1`,
      )
    })
    $(this).attr('style', styleContent)
  })

  // change structure of html
  // if found <p><b>...</b></p> then change it to <p class="font_bold">...</p>
  // and create class font_bold in css
  $('p').each(function () {
    const bold = $(this).find('b')
    if (bold.length) {
      const newClassName = randomString()
      $(this).addClass(newClassName)
      bold.replaceWith(function () {
        return $(this).html()
      })
      // create class inside style tag
      $('style').append(`.${newClassName} { font-weight: bold; }`)
    }
  })

  const newHtml = $.html()
  // minify html
  const minify = require('html-minifier').minify
  const minifiedHtml = minify(newHtml, {
    collapseWhitespace: true,
    removeComments: true,
    minifyCSS: true,
    minifyJS: true,
  })

  if (!fs.existsSync(path.join(__dirname, 'results'))) {
    fs.mkdirSync(path.join(__dirname, 'results'))
  }

  fs.writeFile(
    path.join(__dirname, 'results', 'index.html'),
    minifiedHtml,
    'utf8',
    err => {
      if (err) {
        console.error(err)
        return
      }
      console.log('File has been saved with randomized class names.')
    },
  )
})
