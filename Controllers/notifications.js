const gcm = require("node-gcm");
//NOTE Android sender using key generated for Android developers
const androidSender = new gcm.Sender(process.env.FCM_SERVER_KEY);


module.exports = {
    sendNotification(message, tokensArray) {
        // Set up the sender with your GCM/FCM API key (declare this once for multiple messages)  
        var resp = false;

        var gcmMessage = new gcm.Message();
        gcmMessage.addNotification("title", "QuickEats notification");
        gcmMessage.addNotification("body", message);

        androidSender.send(gcmMessage, { registrationTokens: tokensArray }, (err, response) => {
            if (err) {
                console.error(err);
                //resp = false;
            } else {
                //console.log(response);
                resp = true;
            }

        });

        return resp;
    },

    sendSseNotification(message, id) {

    },

    sendEventsToAll(clients, message) {
        clients.forEach(client => client.response.write(message))
    }


}