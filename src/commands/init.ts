import ora from 'ora'
import boxen from 'boxen'
import chalk from 'chalk'
import { execSync, exec } from 'child_process'
import { getArgv } from '../common'

const templates = require('../templates.json')

export async function init() {
    const [, templateName, projectName] = getArgv()._
    
    if (!templateName) {
        console.log(chalk.red('\n × Please enter template name.'))
        console.log(chalk.green('√ just init <template-name> <project-name> \n '))
        process.exit()
    }

    if (!projectName) {
        console.log(chalk.red('\n × Please enter project name.'))
        console.log(chalk.green('√ just init <template-name> <project-name> \n '))
        process.exit()
    }

    if (!templates[templateName]) {
        console.log(chalk.red('\n × This template is not in the templates.json! \n '))
        process.exit()
    }

    const tpl = templates[templateName]
    const gitCommand = `git clone -b ${tpl.branch} ${tpl.git} ${projectName}`

    const spinner = ora(`⌛️ Waiting...`)
    spinner.start()
    spinner.color = 'green'
    exec(gitCommand, (error) => {
        if (error) {
            console.log(chalk.red(`\n × git clone failure! \n `))
            console.log(chalk.red(`${error.message} \n `))
            spinner.stop()
            process.exit()
        }
        execSync(`rm -rf ./${projectName}/.git`)
        spinner.stop()
        console.log(boxen(`${chalk.green(`\n project "${projectName}" created \n\n cd ${projectName} && yarn && yarn start`)}`, {
            borderColor: 'green',
            padding: 1,
            margin: 1,
            align: 'center',
        }))
        process.exit()
    })
}