/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const generateSchema = /* GraphQL */ `
  query GenerateSchema($input: String) {
    generateSchema(input: $input)
  }
`;
export const getGraph = /* GraphQL */ `
  query GetGraph($id: ID!) {
    getGraph(id: $id) {
      id
      name
      isTable
      isSearchable
      type
      indexes {
        id
        name
        fields
        queryField
      }
      authentication {
        id
        allow
        arg
        operations {
          create
          update
          delete
          read
        }
      }
      arguments {
        id
        name
        type
        required
        connection {
          id
          argumentId
          type
          keyName
          fields
        }
      }
      resolver {
        queries
        mutations
        subscriptions
        timestamps
      }
    }
  }
`;
export const listGraphs = /* GraphQL */ `
  query ListGraphs(
    $filter: ModelGraphFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGraphs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        isTable
        isSearchable
        type
        indexes {
          id
          name
          fields
          queryField
        }
        authentication {
          id
          allow
          arg
        }
        arguments {
          id
          name
          type
          required
        }
        resolver {
          queries
          mutations
          subscriptions
          timestamps
        }
      }
      nextToken
    }
  }
`;
