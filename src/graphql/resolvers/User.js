const { events, participants} = require('../../data.js');
const User = {
    events: (parent) => events.filter((event) => event.user_id === parent.id),
    participants: (parent) => participants.filter((participant) => participant.user_id === parent.id)
}