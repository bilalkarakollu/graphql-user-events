const { users } = require('../../data.js');
const Mutation = {
    createUser: (parent, { data }) => {
        const user = {
            id: 26,
            ...data,
        }
        users.push(user);
        return {
            success: true,
            user: user
        };
    },
    updateUser: (parent, { id, data }) => {
        const user_index = users.findIndex(user => user.id === id);
        if (user_index === -1) {
            return {
                success: false,
                user: null
            };
        }
        const user = {
            ...users[user_index],
            ...data,
        }
        users[user_index] = user;
        return {
            success: true,
            user: user
        };
    },
    deleteUser: (parent, { id }) => {
        const user_index = users.findIndex(user => user.id === id);
        if (user_index === -1) {
            return {
                success: false,
                user: null
            };
        }
        const delete_user = users[user_index];
        users.splice(user_index, 1);
        return {
            success: true,
            user: delete_user
        };
    },
    deleteAllUser: (parent, args) => {
        const length = users.length;
        users.splice(0, length);
        return {
            success: true,
            count: length
        };
    }

}

module.exports = Mutation;