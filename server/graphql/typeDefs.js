//se definen los tipos de datos
//se definen las consultas
import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Query {
    hello: String
  }
`
  