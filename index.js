const utils = require('./project_modules/utils')

let input = 141
let data = require('./data/localdata.json').values;

data = data.sort((a, b) => { return a.h_in > b.h_in ? 1 : a.h_in === b.h_in ? 0 : -1 })
let result = utils.recusrsiveFindFocus(data, input, 0, data.length - 1)
while( !result && data.length > 1) {
  data = data.slice(0, data.length - 1)
  result = utils.recusrsiveFindFocus(data, input, 0, data.length - 1)
}
const inches = data.map((d) => d.h_in)
let couples = utils.findCouples(data, input)
console.log(couples)
