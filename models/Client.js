class Client {
    constructor(id, connection) {
        this.connection = connection;
        this.id = id;
    }

    getId = () => {
        return this.id;
    }
}

// class SseClient {
//     constructor(id, response) {
//         this.response = response;
//         this.id = id;
//     }

//     getId = () => {
//         return this.id;
//     }
// }

module.exports = Client;
//exports.SseClient = SseClient;