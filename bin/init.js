'use strict'

const colors = require('colors');
const exec = require('child_process').exec;
const configure = require('../configure');
const params = process.argv.slice(2);

module.exports = () => {
    let templateName = params[1],
        projectName = params[2],
        gitCommand = ``,
        gitUrl = ``,
        branch = ``;

    if (!templateName) {
        console.log(colors.red('× Please enter template name.'));
        console.log(colors.green('√ just init <template-name> <project-name> \n '));
        process.exit();
    }

    if (!projectName) {
        console.log(colors.red('× Please enter project name.'));
        console.log(colors.green('√ just init <template-name> <project-name> \n '));
        process.exit();
    }

    if (!configure.templates[templateName]) {
        console.log(colors.red('× This template is not in the configuration file! \n '));
        process.exit();
    }

    gitUrl = configure.templates[templateName].git;
    branch = configure.templates[templateName].branch;

    gitCommand = `git clone -b ${branch} ${gitUrl} ${projectName}`;

    console.log(colors.white('Waiting... \n'))

    exec(gitCommand, error => {
        if (error) {
            console.log(colors.red(error));
            process.exit();
        }
        console.log(colors.green('√ Generation completed! \n'));
        console.log(`cd ${projectName} && npm i \n`);
        process.exit();
    });
};
