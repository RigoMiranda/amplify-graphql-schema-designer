const Handlebars = require("handlebars");

// @ Authentication
Handlebars.registerHelper("auth", function(options) {
    const auth = this.authentication;
    let auths = [];
    
    // Getting Permissions String:
    if (auth) {
        for (const a of auth) {
            let trueOptions = [];
            for (const op in a.operations) {
                if (a.operations[op]) {
                    trueOptions.push(op);
                }
            }
            const out = trueOptions.join(", ");
            if (a.allow === 'public' || a.allow === 'private') {
                auths.push(`{ allow: ${a.allow}, operations: [${out}] }`);
            } else {
                auths.push(`{ allow: ${a.allow}, ownerField: "${a.arg}", operations: [${out}] }`);
            }
            
        }
        
        const template =  `@auth(rules: [
        ${auths.join(',\n\t')}
    ])`;
        return template;
    }
    
    return null;
});

// @Resolvers Connection
Handlebars.registerHelper("resolvers", function() {
    let items = [];
    for (const item in this.resolvers) {
        if (!this.resolvers[item]) {
            items.push(`${item}: null`);
        }
    }
    
    if(items.length !== 0) {
        return `@model(${items.join(', ')})`;
    }
    else {
        return '@model';
    }
});

// @KeyFields
Handlebars.registerHelper("keyFields", function(options) {
    const list = options.fn(this).split(",");
    return `["${list.join('", "')}"]`;

});

// @Arguments Connection
Handlebars.registerHelper("argumentConnection", function(options) {
    if (this.connection) {
        if (!this.connection.fields) {
         return '@connection';   
        } else {
            let template = `{{#if this.connection.fields}}@connection(keyField: "{{this.connection.fields}}"{{#if this.connection.keyName}}, keyName: "{{this.connection.keyName}}"{{/if}}){{/if}}`;
            const compiled_template = Handlebars.compile(template);
            return compiled_template(this);
        }
    }
});

// @Arguments
Handlebars.registerHelper("argument", function(options) {

    let template = `{{this.name}}: {{this.type}}{{#if this.required}}!{{/if}}`;
    if ('connection' in this) {
        template = `{{this.name}}: {{this.type}}{{#if this.required}}!{{/if}} {{#argumentConnection}}{{this.connection}}{{/argumentConnection}}`;
    }
    const compiled_template = Handlebars.compile(template);
    return compiled_template(this);
});

// @Type Template
Handlebars.registerHelper("type", function(options) {
    const template = `
type {{this.name}}
    {{#if this.isTable}}{{#resolvers}}{{this.resolvers}}{{/resolvers}}
    {{#auth}}{{this.authentication}}{{/auth}}{{/if}}
    {{#if this.isSearchable}}@searchable{{/if}}
    {{#if this.indexes}} 
    {{#each this.indexes}}
    @key(name: "{{this.name}}", fields: {{#keyFields}}{{this.fields}}{{/keyFields}}, queryField: "{{this.queryField}}")
    {{/each}}
    {{/if}}
    {
        {{#each this.arguments}}
        {{#argument}}{{this}}{{/argument}}
        {{/each}}
    }
`;

    const compiled_template = Handlebars.compile(template);
    return compiled_template(this);
});

// @Enum Template
Handlebars.registerHelper("enum", function() {
    const template = `enum {{this.name}} {
{{#each this.arguments}}
    {{this.name}}
{{/each}}
}`;
    const compiled_template = Handlebars.compile(template);
    return compiled_template(this);
});

// @Schema Template
Handlebars.registerHelper("schema", function() {
    let templateText = '';
    for (const graphs of this.graph) {
        const template = `{{#${graphs.type}}}{{graph}}{{/${graphs.type}}}\n`;
        const compiled_template = Handlebars.compile(template);
        templateText += compiled_template(graphs);
    }
    return templateText;
});

module.exports = {
    buildTemplate: function(input) {
        const template = `{{#schema}}{{graph}}{{/schema}}`;
        const compiled_template = Handlebars.compile(template);
        return compiled_template(input);
    }
};