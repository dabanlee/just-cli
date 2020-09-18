import fs from 'fs-extra'
import { resolve } from 'path'
import minimist from 'minimist'

export * from './help'

export function checkCommand(commands: object) {
    return Object.keys(commands).includes(getCommandName())
}

export function getArgv(): {
    _: string[]
    [key: string]: any
} {
    return minimist(process.argv.slice(2))
}

export function getCommandName(): string {
    return getCommands()[0]
}

export function getCommands(): string[] {
    return getArgv()._
}

export function hasCommand() {
    return getArgv()._.length !== 0
}

export async function updateJSON(content: string, done = (error?: any) => {}) {
    try {
        await fs.writeFile(resolve(__dirname, '../templates.json'), content, 'utf-8')
        done()
        process.exit()
    } catch (error) {
        done(error)
        process.exit()
    }
}