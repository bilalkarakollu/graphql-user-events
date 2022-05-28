const { users, locations } = require('../../data.js');
const Event = {
    location: (parent) => locations.find((location) => location.id === parent.location_id),
    user: (parent) => users.find((user) => user.id === parent.user_id)
}

module.exports = Event;