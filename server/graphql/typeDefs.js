//se definen los tipos de datos
//se definen las consultas
import { gql } from "graphql-tag";

// Mutation: equivalente al POST, DELETE, UPSATE
// Project: tipo de dato personalizado
// createdAt: String, y updatedAt: String, ProjectSchema
// estan definidos implicitamente en el "timestamp: true" del ProjectSchema del Project.js
//project(_id: ID!) //! es obligatorio
export const typeDefs = gql`
  type Query {
    hello: String
    projects: [Project]
    project(_id: ID!): Project
    tasks: [Task]
    task(_id: ID!): Task
  }
  type Mutation {
    createProject(name: String, description: String): Project
    deleteProject(_id: ID!): Project
    createTask(title: String, projectId: ID): Task,
    deleteTask(_id: ID!): Task
  }
  type Project {
    _id : ID
    name: String
    description: String
    createdAt: String
    updatedAt: String
  }
  type Task {
    _id : ID
    title: String
    projectId: ID
    createdAt: String
    updatedAt: String
  }
`
  //tipo de datos para guardar proyectos