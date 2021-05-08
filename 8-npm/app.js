const validator = require('validator')

// console.log(validator.isEmail('abc@email.com'))
// console.log(validator.isMobilePhone('082325451', 'id-ID'))
// console.log(validator.isNumeric('082325451'))


const chalk = require('chalk')
const log = console.log

// log(chalk.cyanBright('Hello') + ' World ' + chalk.red('!'))
// log(chalk.blue.italic.bgYellowBright(' Italic '))

log(chalk`Lorem {bold.black.bgWhite  ipsum dolor } sit amet.`)