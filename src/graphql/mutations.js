/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createGraph = /* GraphQL */ `
  mutation CreateGraph(
    $input: CreateGraphInput!
    $condition: ModelGraphConditionInput
  ) {
    createGraph(input: $input, condition: $condition) {
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
export const updateGraph = /* GraphQL */ `
  mutation UpdateGraph(
    $input: UpdateGraphInput!
    $condition: ModelGraphConditionInput
  ) {
    updateGraph(input: $input, condition: $condition) {
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
export const deleteGraph = /* GraphQL */ `
  mutation DeleteGraph(
    $input: DeleteGraphInput!
    $condition: ModelGraphConditionInput
  ) {
    deleteGraph(input: $input, condition: $condition) {
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
