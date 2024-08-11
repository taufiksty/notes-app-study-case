import { gql } from '@apollo/client';

export const CREATE_NOTE = gql`
  mutation CreateNote($title: String!, $body: String) {
    createNote(title: $title, body: $body) {
      id
      title
      body
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_NOTE = gql`
  mutation UpdateNote($id: ID!, $title: String!, $body: String) {
    updateNote(id: $id, title: $title, body: $body) {
      id
      title
      body
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_NOTE = gql`
  mutation DeleteNote($id: ID!) {
    deleteNote(id: $id) {
      id
    }
  }
`;
