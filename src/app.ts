import fs from 'fs'

let outputMessage = '';
const tableOf = 5;
const headerMessage = `
================================
    Tabla del ${ tableOf }
================================\n
`

for (let index = 1; index <= 10; index++) {
    outputMessage += (`${ tableOf } x ${ index } = ${ tableOf * index }\n`);
}

outputMessage = headerMessage + outputMessage
console.log( outputMessage )

const outputPath = 'outputs'

fs.mkdirSync( outputPath, { recursive: true})
fs.writeFileSync(`${ outputPath}/tabla-${ tableOf }.txt`, outputMessage)
console.log('File was created');