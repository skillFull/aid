const { MemoryStore } = require('express-session');
const { set } = require('mongoose');

const sessionStore = new MemoryStore();

const store = {

    get(sid) {
        sessionStore.get(sid, (err, session) => {
            if(err) console.log(err)

            console.log(session);
        })
    },

    set(sid, session) {
        sessionStore.set(sid, session, (err) => {
            if(err) console.log(err);
            console.log("Session save");
        })
    }

}

module.exports = store;