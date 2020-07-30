import { graphQlTypes, dynamoDB, searchable, argument, authInfo, indexes, resolvers } from './InfoConstants';
import General   from './Components/General';
import Argument  from './Components/Argument';
import Indexes   from './Components/Indexes';
import Resolvers from './Components/Resolvers';
import Auth      from './Components/Auth';

const defaultArgumentList = (id) => {
    return [
        {   
            'id'            : id,
            'name'          : 'id',
            'type'          : 'ID',
            'required'      : true,
            'isEditable'    : true,
            'connection'    : ''
        }
    ]
};

export const defaultGraph = (id, argId) => {
    return {
        'id'            : id,
        'name'          : '',
        'isTable'       : false,
        'isSearchable'  : false,
        'isEditable'    : true,
        'type'          : 'type',
        'indexes'       : [],
        'connections'   : [],
        'authentication': [],
        'arguments'     : defaultArgumentList(argId),
        'resolvers'     : {
            'queries'       : true,
            'mutations'     : true,
            'subscriptions' : false,
            'timestamps'    : true
        }
    }
};

export const defaultArgument = (id) => {
    return {
        'id'            : id,
        'name'          : '',
        'type'          : 'String',
        'required'      : false,
        'isEditable'    : true,
        'connection'    : ''
    }
};

export const defaultIndex = (id) => {
    return {
        'id'            : id,
        'name'          : '',
        'fields'        : '',
        'queryField'    : '',
        'isEditable'    : true
    }
};

export const defaultAuthentication = (id) => {
    return {
        'id'            : id,
        'allow'         : 'owner',
        'arg'           : '',
        'operations':    {
            'create'        : true,
            'update'        : true,
            'delete'        : true,
            'read'          : true,
        },
        'isEditable'    : true
    }
};

export const graphTypes = [
    {
        'name'  : 'Type',
        'value' : 'type'
    },
    {
        'name'  : 'Enum',
        'value' : 'enum'
    },
    // {
    //     'name'  : 'Interface',
    //     'value' : 'interface'
    // }
];

export const defaultTypes = [
    {
        'name'  : 'String',
        'value' : 'String'
    },
    {
        'name'  : 'ID',
        'value' : 'ID'
    },
    {
        'name'  :  'Boolean',
        'value' : 'Boolean'
    },
    {
        'name'  :  'Int',
        'value' : 'Int'
    },
    {
        'name'  :  'Float',
        'value' : 'Float'
    },
    {
        'name'  : 'AWSDateTime',
        'value' : 'AWSDateTime'
    },
    {
        'name'  : '[String]',
        'value' : '[String]'
    },
    {
        'name'  : '[Boolean]',
        'value' : '[Boolean]'
    },
    {
        'name'  : '[Int]',
        'value' : '[Int]'
    },
    {
        'name'  : '[Float]',
        'value' : '[Float]'
    }
];

export const defaultConnection = (id) => {
    return {
        'id'            : id,
        'argumentId'    : '',
        'type'          : 'has-one',
        'keyName'       : '',
        'fields'        : '',
        'isEditable'    : true
    }
};

export const graphSections = [
    { 
        'name': 'General',
        'class': General,
        'info': null
    },
    { 
        'name': 'Arguments',
        'class': Argument,
        'info': argument
    },
    { 
        'name': 'Authentication',
        'class': Auth,
        'info': authInfo
    },
    { 
        'name': 'Indexes',
        'class': Indexes,
        'info': indexes
    },
    { 
        'name': 'Resolvers',
        'class': Resolvers,
        'info': resolvers
    },
];

export const generalTableRows = [
    {
        'title' : 'Graph Name',
        'info'  : null
    },
    {
        'title' : 'Graph Type',
        'info'  : graphQlTypes
    },
    {
        'title' : 'Store on DynamoDB',
        'info'  : dynamoDB
    },
    {
        'title' : 'Elasticsearch',
        'info'  : searchable
    }
];

export const graphEnumSections = [
    { 
        'name':'General',
        'class': General,
        'info': null
    },
    { 
        'name':'Arguments',
        'class': Argument,
        'info': argument
    }
];

export const graphEnumRows = [
    {
        'title' : 'Graph Name',
        'info'  : null
    },
    {
        'title' : 'Graph Type',
        'info'  : graphQlTypes
    }
];

export const typeTableHeader = [
    'Name',
    'Type',
    'Required',
    'Actions'
];

export const enumTableHeader = [
    'Name',
    'Actions'
];

export const authTableHeader = [
    {
        'title': 'Allow',
        'info': null
    },
    {
        'title': 'Owner/Group',
        'info': null
    },
    {
        'title': 'Create',
        'info': null
    },
    {
        'title': 'Update',
        'info': null
    },
    {
        'title': 'Delete',
        'info': null
    },
    {
        'title': 'Read',
        'info': null
    },
    {
        'title': 'Actions',
        'info': null
    }
];

export const toAllow = [
    { 
        'name': 'Owner',
        'value': 'owner',
        'needArg': true
    },
    { 
        'name': 'Group',
        'value': 'group',
        'needArg': true
    },
    { 
        'name': 'Public',
        'value': 'public',
        'needArg': false
    },
    { 
        'name': 'Private',
        'value': 'private',
        'needArg': false
    },
];

export const connectionTypes = [
    {
        'name':  'Has one',
        'value': 'has-one'
    },
    {
        'name':  'One-to-Many',
        'value': 'one-to-many'
    },
    {
        'name':  'Belongs to',
        'value': 'belongs-to'
    },
    {
        'name':  'Many-to-Many',
        'value': 'many-to-many'
    }
];

export const resolversData = [
    { 'name':'Queries' },
    { 'name':'Mutations' },
    { 'name':'Subscriptions' },
    { 'name':'Timestamps'  }
];

export const schemaSamples = [
    {
        'title': 'Blog',
        'id': '1236-4321-9876-6789'
    },
    {
        'title': 'Todo App',
        'id': '1238-4321-9876-6789'
    },
    {
        'title': 'Chat App',
        'id': '1240-4321-9876-6789'
    }
]