import { gql } from "@apollo/client";

export const CREATE_TASK = gql`
  mutation ($title: String, $projectId: ID) {
    createTask(title: $title, projectId: $projectId) {
      _id
      title
      projectId
      createdAt
      updatedAt
      project {
        _id
        name
        description
      }
    }
  }
`;

export const DELETE_TASK = gql`
  mutation($id: ID!) {
  deleteTask(_id: $id) {
    _id
    title
    projectId
    createdAt
  }
}
`
