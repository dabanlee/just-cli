'use strict'

const fs = require('fs')
const path = require('path')
const colors = require('colors')
const fetch = require('node-fetch')
const execSync = require('child_process').execSync
const { templates: templatesFromLocal } = require('../configure')
const params = process.argv.slice(2)

module.exports = async () => {
    const [_, templateName, projectName] = params
    const { templates: templatesFromGit } = await fetch('https://raw.githubusercontent.com/JustClear/just-cli/master/configure.json').then(response => response.json())
    const templates = Object.assign(templatesFromLocal, templatesFromGit)

    if (!templateName) {
        console.log(colors.red('\n × Please enter template name.'))
        console.log(colors.green('√ just init <template-name> <project-name> \n '))
        process.exit()
    }

    if (!projectName) {
        console.log(colors.red('\n × Please enter project name.'))
        console.log(colors.green('√ just init <template-name> <project-name> \n '))
        process.exit()
    }

    if (!templates[templateName]) {
        console.log(colors.red('\n × This template is not in the configuration file! \n '))
        process.exit()
    }

    const gitUrl = templates[templateName].git
    const branch = templates[templateName].branch
    const gitCommand = `git clone -b ${branch} ${gitUrl} ${projectName}`

    console.log(colors.green('\n ⌛️ Waiting... \n'))

    if (execSync(gitCommand)) {
        const packages = require(path.resolve(process.cwd(), projectName, 'package.json'))
        execSync(`rm -rf ./${projectName}/.git ./${projectName}/package.json`)
        packageJSONUpdate(packages)
        console.log(colors.green('\n✨  Generation completed! \n'))
        console.log(`cd ${projectName} && npm i \n`)
    } else {
        console.log(colors.red('\n × git clone failure! \n '))
    }

    process.exit()

    function packageJSONUpdate(packages) {
        packages.name = projectName
        packages.moduleName = camelize(getName(projectName))
        packages.main = `dist/${getName(projectName)}.js`
        packages.module = `dist/${getName(projectName)}.es.js`
        
        try {
            fs.writeFileSync(`${process.cwd()}/${projectName}/package.json`, JSON.stringify(packages, null, '  '), 'utf-8')
        } catch (error) {
            console.log(error)
        } finally {
            process.exit()
        }
    }
}

function camelize(string) {
    if (typeof string !== 'string') return console.warn('you can only camelize a string.')
    return string.replace(/[_.-](\w|$)/g, (match, $) => $.toUpperCase())
}

function getName(name) {
    if (name.startsWith('@') && name.includes('/')) {
        return name.split('/')[1]
    }
    return name
}