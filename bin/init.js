'use strict'

const colors = require('colors');
const execSync = require('child_process').execSync;
const configure = require('../configure');
const params = process.argv.slice(2);

module.exports = () => {
    let templateName = params[1],
        projectName = params[2],
        gitCommand = ``,
        gitUrl = ``,
        branch = ``;

    if (!templateName) {
        console.log(colors.red('\n × Please enter template name.'));
        console.log(colors.green('√ just init <template-name> <project-name> \n '));
        process.exit();
    }

    if (!projectName) {
        console.log(colors.red('\n × Please enter project name.'));
        console.log(colors.green('√ just init <template-name> <project-name> \n '));
        process.exit();
    }

    if (!configure.templates[templateName]) {
        console.log(colors.red('\n × This template is not in the configuration file! \n '));
        process.exit();
    }

    gitUrl = configure.templates[templateName].git;
    branch = configure.templates[templateName].branch;

    gitCommand = `git clone -b ${branch} ${gitUrl} ${projectName}`;

    console.log(colors.white('\n Waiting... \n'))

    if (execSync(gitCommand)) {
        execSync(`rm -rf ./${projectName}/.git`);
        console.log(colors.green('\n✨  Generation completed! \n'));
        console.log(`cd ${projectName} && npm i \n`);
    } else {
        console.log(colors.red('\n × git clone failure! \n '));
    }
    process.exit();
};
