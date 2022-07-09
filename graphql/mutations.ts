import { gql } from "@apollo/client";

// REGISTER USER MUTATION
export const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ) {
            id
            email
            username
            createdAt
            token
        }
    }
`

// LOGIN USER MUTATION
export const LOGIN_USER = gql`
    mutation loginUser(
        $username: String!
        $password: String!
    ) {
        login(
            username: $username 
            password: $password
        ) {
            id
            email
            username
            createdAt
            token
        }
    }
`