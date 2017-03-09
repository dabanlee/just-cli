'use strict'

const colors = require('colors');
const configure = require('../configure');

module.exports = () => {
    console.log(colors.green('\ntemplates: \n'));
    console.log(JSON.stringify(configure.templates, null, '    '));
    console.log('\n');
};
