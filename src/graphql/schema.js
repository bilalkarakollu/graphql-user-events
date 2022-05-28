const { gql } = require('apollo-server');
const typeDefs = gql`
type Event {
    id: Int!
    title: String!
    desc: String!
    date: String!
    from: String!
    to: String!
    location_id: Int!
    user_id: Int!
    location: Location
    user: User
  }
  
  type Location {
    id: Int!
    name: String!
    desc: String!
    lat: Float!
    lng: Float!
  }
  
  type User {
    id: Int!
    username: String!
    email: String!
    events: [Event]
    participants: [Participant]
  }
  
  type Participant {
    id: Int!
    user_id: Int!
    event_id: Int!
  }
  
  type Query {
    users: [User]
    user(id: Int!): User
    events: [Event]
    event(id: Int!): Event
    locations: [Location]
    location(id: Int!): Location
    participants: [Participant]
    participant(id: Int!): Participant
  }
  
  type UserResponse {
    user: User
    success: Boolean
  }
  
  type DeleteResponse {
    success: Boolean!
    count: Int!
  }
  
  input CreateUserInput {
    username: String!
    email: String!
  }
  
  input UpdateUserInput {
    username: String
    email: String
  }
  
  type Mutation {
    createUser(data: CreateUserInput!): UserResponse!
    updateUser(id: Int!, data: UpdateUserInput!): UserResponse!
    deleteUser(id: Int!): UserResponse!
    deleteAllUser: DeleteResponse!
    createEvent(
      title: String!
      desc: String!
      date: String!
      from: String!
      to: String!
      location_id: Int!
      user_id: Int!
    ): Event
    createLocation(
      name: String!
      desc: String!
      lat: Float!
      lng: Float!
    ): Location
    createParticipant(user_id: Int!, event_id: Int!): Participant
  }
`;

module.exports = typeDefs;