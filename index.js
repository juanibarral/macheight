const utils = require('./project_modules/utils')
const https = require('https');

const args = process.argv.slice(2)
if (args.length === 0) {
  console.log('You must enter an input')
} else {
  let input = parseInt(args[0])
  if (isNaN(input)) {
    console.error('Input must be a number')
  } else {
    // Fetching data
    const url = 'https://mach-eight.uc.r.appspot.com/';
    https.get(url, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk
      });
      res.on('end', () => {
        try {
          let raw = JSON.parse(body)
          let data = raw.values
          data = utils.quickSort(data, 0, data.length -1)
          let result = utils.recusrsiveFindFocus(data, input, 0, data.length - 1)
          while( !result && data.length > 1) {
            data = data.slice(0, data.length - 1)
            result = utils.recusrsiveFindFocus(data, input, 0, data.length - 1)
          }
          const inches = data.map((d) => d.h_in)
          let couples = utils.findCouples(data, input)
          // Formating data
          couples.forEach((couple) => {
            console.log(`- ${couple[0]}\t\t${couple[1]}`)
          })
        } catch (err) {
          console.error(err.message)
        }
      })
    }).on('error', (error) => {
      console.error(error.message)
    })
  }
}


