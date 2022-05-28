import { ApolloServer, gql } from 'apollo-server';
import { events, locations, participants, users } from './data.js';

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
        user(id:Int!): User
        events: [Event]
        event(id:Int!): Event
        locations: [Location]
        location(id:Int!): Location
        participants: [Participant]
        participant(id:Int!): Participant
    }

`;

const resolvers = {
    Query: {
        users: () => users,
        user: (parent, args) => users.find((user) => user.id === args.id),
        events: () => events,
        event: (parent, args) => events.find((event) => event.id === args.id),
        locations: () => locations,
        location: (parent, args) => locations.find((location) => location.id === args.id),
        participants: () => participants,
        participant: (parent, args) => participants.find((participant) => participant.id === args.id)
    },
    Event: {
        location: (parent) => locations.find((location) => location.id === parent.location_id),
        user: (parent) => users.find((user) => user.id === parent.user_id)
    },
    User: {
        events: (parent) => events.filter((event) => event.user_id === parent.id),
        participants: (parent) => participants.filter((participant) => participant.user_id === parent.id)
    },
};

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
}
);

