export const dynamoDB = {
    'text': 'Objects annotated with @model are stored in Amazon DynamoDB and are capable of being protected via @auth, related to other objects via @connection, and streamed into Amazon Elasticsearch via @searchable. You may also apply the @versioned directive to instantly add a version field and conflict detection to a model type.',
    'url': 'https://docs.amplify.aws/cli/graphql-transformer/directives#model'
}

export const indexes = {
    'text': `The @key directive makes it simple to configure custom index structures for @model types.

    Amazon DynamoDB is a key-value and document database that delivers single-digit millisecond performance at any scale but making it work for your access patterns requires a bit of forethought. DynamoDB query operations may use at most two attributes to efficiently query data. The first query argument passed to a query (the hash key) must use strict equality and the second attribute (the sort key) may use gt, ge, lt, le, eq, beginsWith, and between. DynamoDB can effectively implement a wide variety of access patterns that are powerful enough for the majority of applications.`,
    'url': 'https://docs.amplify.aws/cli/graphql-transformer/directives#key'
}

export const authInfo = {
    'text': 'Authorization is required for applications to interact with your GraphQL API. API Keys are best used for public APIs (or parts of your schema which you wish to be public) or prototyping, and you must specify the expiration time before deploying. IAM authorization uses Signature Version 4 to make request with policies attached to Roles. OIDC tokens provided by Amazon Cognito User Pools or 3rd party OpenID Connect providers can also be used for authorization, and simply enabling this provides a simple access control requiring users to authenticate to be granted top level access to API actions. You can set finer grained access controls using @auth on your schema which leverages authorization metadata provided as part of these tokens or set on the database items themselves.',
    'url': 'https://docs.amplify.aws/cli/graphql-transformer/directives#auth'
}

export const connectionInfo = {
    'text': 'The @connection directive enables you to specify relationships between @model types. Currently, this supports one-to-one, one-to-many, and many-to-one relationships. You may implement many-to-many relationships using two one-to-many connections and a joining @model type.',
    'url': 'https://docs.amplify.aws/cli/graphql-transformer/directives#connection'
}

export const searchable = {
    'text': `The @searchable directive handles streaming the data of an @model object type to Amazon Elasticsearch Service and configures search resolvers that search that information.

    Note: @searchable is not compatible with DataStore but you can use it with the API category.
    
    Note: @searchable is not compatible with Amazon ElasticSearch t2.micro instance as it only works with ElasticSearch version 1.5 and 2.3 and Amplify CLI only supports instances with ElasticSearch version >= 6.x.`,
    'url': 'https://docs.amplify.aws/cli/graphql-transformer/directives#searchable'
}

export const argument = {
    'text': `All arguments are named. Unlike languages like JavaScript and Python where functions take a list of ordered arguments, all arguments in GraphQL are passed by name specifically. Arguments can be either required or optional.`,
    'url': 'https://graphql.org/learn/schema/#arguments'
}

export const resolvers = {
    'text': `When using the @model directive, up to 8 resolvers (create, update, delete, get, list, onCreate, onUpdate, onDelete) can be configured. By default all of them will be created, but they can be overwritten or eliminated.`,
    'url': 'https://docs.amplify.aws/cli/graphql-transformer/resolvers'
}

export const graphQlTypes = {
    'text': `The most basic components of a GraphQL schema are object types, which just represent a kind of object you can fetch from your service, and what fields it has. `,
    'url': 'https://graphql.org/learn/schema/#object-types-and-fields'
}