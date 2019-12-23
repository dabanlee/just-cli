'use strict'

const fs = require('fs')
const co = require('co')
const prompt = require('co-prompt')
const colors = require('colors')
const configure = require('../configure')
const commander = require('commander')

module.exports = () => {
    const argument = commander.args[0]
    
    if (commander.args.length > 1 || typeof argument.name == 'string') {
        const name = argument.name
        const branch = argument.branch || 'master'
        const gitURL = argument.git

        if (typeof name == 'function' || name === undefined) {
            console.log(colors.red('\n × Please enter template name use -n <name>.\n'))
            process.exit()
        }
        if (!gitURL) {
            console.log(colors.red('\n × Please enter template git use -g <git>.\n'))
            process.exit()
        }

        generate({
            name,
            branch,
            gitURL,
        })
    } else {
        co(function*() {
            const name = yield prompt(colors.green('\n template name: '))
            const branch = yield prompt(colors.green('\n branch(master): '))
            const gitURL = yield prompt(colors.green('\n git: '))

            if (!name) {
                console.log(colors.red('\n × Please enter template name.\n'))
                process.exit()
            }

            if (!gitURL) {
                console.log(colors.red('\n × Please enter git url.\n'))
                process.exit()
            }

            generate({
                name,
                branch,
                gitURL,
            })
        })
    }

    function generate(options) {
        if (!configure.templates[options.name]) {
            configure.templates[options.name] = {}
            configure.templates[options.name]['branch'] = options.branch || 'master'
            configure.templates[options.name]['git'] = options.gitURL

            fs.writeFile(`${__dirname}/../configure.json`, JSON.stringify(configure, null, '  '), 'utf-8', error => {
                if (error) {
                    console.log(colors.red(error))
                    process.exit()
                }
                console.log(colors.green('\n Template added:\n'))
                console.log(JSON.stringify(configure.templates, null, '    '))
                console.log('\n')
                process.exit()
            })
        } else {
            console.log(colors.red('\n Template has already existed!\n'))
            console.log(JSON.stringify(configure.templates, null, '    '))
            process.exit()
        }
    }
}