import { gql } from "@apollo/client";

export const AllMessages = gql`
    {
        messages {
            note
        }
    }
`;

export const AllAuthors = gql`
    {
        authors {
            name
            id
        }
    }
`;

export const AllBooks = gql`
    {
        books {
            name
            id
        }
    }
`;
export const ADD_BOOK = gql`
    mutation($name: String!, $genre: String!, $authorId: ID!) {
        addBook(name: $name, genre: $genre, authorId: $authorId) {
            name
            id
        }
    }
`;

export const ADD_MESSAGE = gql`
    mutation($note: String!) {
        addMessage(note: $note) {
            note
        }
    }
`;

export const GET_BOOK = gql`
    query($id: ID!) {
        book(id: $id) {
            name
            genre
            id
        }
    }
`;
