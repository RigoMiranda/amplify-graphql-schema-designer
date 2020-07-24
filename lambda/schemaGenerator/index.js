const Template = require('./template');

exports.handler = async (event) => {
    console.log(JSON.parse(event.arguments.input));
    const input        = { 'graph': JSON.parse(event.arguments.input) };
    const templateText = Template.buildTemplate(input);
    return JSON.stringify(templateText);
};