import chalk from 'chalk'
import prompts from 'prompts'
import { getArgv, updateJSON } from '../common'

const templates = require('../templates.json')

export async function add() {
    const argv = getArgv()
    const {
        n: _n,
        name: _name,
        b: _b,
        branch: _branch,
        g: _g,
        git,
    } = argv
    
    if (Object.keys(argv).length > 1) {
        const name = _n || _name
        const branch = _b || _branch
        const gitURL = _g || git

        if (!name) {
            console.log(chalk.red('\n × use (-n|--name) <name> to add name.\n'))
            process.exit()
        }
        if (!gitURL) {
            console.log(chalk.red('\n × use (-g|--git) <git url> to add git url.\n'))
            process.exit()
        }
        generate({
            name,
            branch,
            gitURL,
        })
    } else {
        const questions: any[] = [{
            type: 'text',
            name: 'name',
            message: 'template name:'
        }, {
            type: 'text',
            name: 'branch',
            message: 'branch name(master) :'
        }, {
            type: 'text',
            name: 'gitURL',
            message: 'git URL:'
        }]
        const { name, branch, gitURL } = await prompts(questions)
        
        generate({
            name,
            branch: branch === '' ? 'master' : branch,
            gitURL,
        })
    }
}

function generate({ name, branch, gitURL }: {
    name: string,
    branch: string,
    gitURL: string,
}) {
    if (!templates[name]) {
        templates[name] = {}
        templates[name]['branch'] = branch || 'master'
        templates[name]['git'] = gitURL

        const content = JSON.stringify(templates, null, '  ')

        updateJSON(content, (error) => {
            if (error) {
                console.log(chalk.red(error))
                process.exit()
            } else {
                console.log(content)
                console.log('\n')
                console.log(chalk.green(`\n package "${name}" added\n`))
            }
        })
    } else {
        console.log(chalk.red(`\n Template "${name}" has already existed!\n`))
        console.log(JSON.stringify(templates, null, '    '))
        process.exit()
    }
}