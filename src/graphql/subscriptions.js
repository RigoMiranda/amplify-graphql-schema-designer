/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateGraph = /* GraphQL */ `
  subscription OnCreateGraph {
    onCreateGraph {
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
export const onUpdateGraph = /* GraphQL */ `
  subscription OnUpdateGraph {
    onUpdateGraph {
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
export const onDeleteGraph = /* GraphQL */ `
  subscription OnDeleteGraph {
    onDeleteGraph {
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
