import fs from 'fs-extra'
import path from 'path'
import { execSync } from 'child_process'

const localesDir = './public/locales'

// Function to run i18next-parser
const runI18nextParser = () => {
    console.log('Running i18next-parser...')
    execSync('npx i18next-parser --config i18next-parser.config.js', {
        stdio: 'inherit',
    })
}

// Function to sort JSON keys alphabetically
const sortJsonKeys = (json) => {
    return Object.keys(json)
        .sort()
        .reduce((acc, key) => {
            acc[key] = json[key]
            return acc
        }, {})
}

// Function to sort translations
const sortTranslations = () => {
    console.log('Sorting translations...')
    const localeDirs = fs.readdirSync(localesDir)

    localeDirs.forEach((locale) => {
        const localePath = path.join(localesDir, locale)
        const namespaceFiles = fs.readdirSync(localePath)

        namespaceFiles.forEach((file) => {
            if (path.extname(file) === '.json') {
                const filePath = path.join(localePath, file)
                const translations = JSON.parse(
                    fs.readFileSync(filePath, 'utf8')
                )
                const sortedTranslations = sortJsonKeys(translations)
                fs.writeFileSync(
                    filePath,
                    JSON.stringify(sortedTranslations, null, 2),
                    'utf8'
                )
                console.log(`Sorted ${filePath}`)
            }
        })
    })
}

// Execute the tasks
const main = () => {
    runI18nextParser()
    sortTranslations()
}

// Run the main function
main()
