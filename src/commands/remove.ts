import chalk from 'chalk'
import prompts from 'prompts'
import { getArgv, updateJSON } from '../common'

const templates = require('../templates.json')

export async function remove() {
    const { _ } = getArgv()
    const [, name] = _

    if (!name) {
        console.log(chalk.green('\n Specify the name that you want to remove.\n'))
        process.exit()
    }

    if (templates[name]) {
        const { choice } = await prompts([{
            type: 'text',
            name: 'choice',
            message: `remove package ${name}?[y/n]:`,
        }])

        if (['y', 'yes'].includes(choice)) {
            delete templates[name]
            const content = JSON.stringify(templates, null, '  ')
            updateJSON(content, (error) => {
                if (error) {
                    console.log(chalk.red(`remove package ${name} fail.`, error.message))
                } else {
                    console.log(chalk.green('\n package removed.\n'))
                    console.log(chalk.green(' Latest packages:\n'))
                    console.log(content)
                    console.log('\n')
                    process.exit()
                }
            })
        }
    } else {
        console.log(chalk.red(`package "${name}" not exist.`))
    }
}