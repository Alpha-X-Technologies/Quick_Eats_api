const express = require('express');
//const session = require('express-session');
const app = express();
const mongoose = require('mongoose');
const http = require('http');
const path = require('path');
var cookieParser = require('cookie-parser')
const result = require('dotenv').config({ path: path.resolve(process.cwd(), '.env') });
const WebSocket = require('ws');
const url = require('url');

require('./models/MenuItemExtra');
require('./models/MenuItemExtraGroup');

//for all json and form requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


if (result.error) {
    throw result.error
}


//connect to db
mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }, () => {
    console.log('connected to DB');

})

const users = require('./routes/users.js'); //require the router
app.use('/users', users); //use it

const vendors = require('./routes/vendors.js');
app.use('/vendor', vendors);

const menuItems = require('./routes/menuItems.js')
app.use('/menuItems', menuItems);

const menus = require('./routes/menus.js')
app.use('/menus', menus);

const orders = require('./routes/orders.js');
app.use('/orders', orders);

const restaurants = require('./routes/restaurants.js')
app.use('/restaurants', restaurants);

const menuItemCategories = require('./routes/menuCategory.js');
app.use('/menuItemCategories', menuItemCategories);

const notifications = require('./routes/notifications.js');
const Client = require('./models/client');

app.use('/notifications', notifications);

// const dashboards = require('./routes/dashboards.js')
// app.use('/management/dash')

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });


wss.on('connection', (ws, req) => {
    console.log('connection established');
    console.info("Total connected clients:", wss.clients.size);

    const { query: { userId } } = url.parse(req.url, true);

    let clients = app.locals.clients ? app.locals.clients : [];

    //TODO no duplicates if applicable
    // if(!clients.includes(c=>c.id==userId)){
    //     clients.push(new Client.SseClient(userId, response));
    // }

    clients.push(new Client(userId, ws));
    //     //TODO test this with multiple devices
    //     if (app.locals.clients == null) {
    //         app.locals.clients = clients;
    //     }

    app.locals.clients = clients;
});

wss.on('close', (ws) => {

    })
    // app.get('/status', (request, response) => response.json({ clients: app.locals.clients ? app.locals.clients.length : 'No clients present' }));

// app.get('/events', (request, response, next) => {
//     const headers = {
//         'Content-Type': 'text/event-stream',
//         'Connection': 'keep-alive',
//         'Cache-Control': 'no-cache'
//     };
//     response.writeHead(200, headers);

//     console.log(request.url);

//     const { query: { userId } } = url.parse(request.url, true);

//     let clients = app.locals.clients ? app.locals.clients : [];

//     //TODO no duplicates if applicable
//     // if(!clients.includes(c=>c.id==userId)){
//     //     clients.push(new Client.SseClient(userId, response));
//     // }

//     clients.push(new Client.SseClient(userId, response));


//     //TODO test this with multiple devices
//     if (app.locals.clients == null) {
//         app.locals.clients = clients;
//     }

//     request.on('close', () => {
//         console.log(`${userId} Connection closed`);
//         clients = clients.filter(client => client.id !== userId);
//     });

//     // const data = `data: ${JSON.stringify(facts)}\n\n`;

//     //response.write(data);
// });

// var SSE = require('express-sse');

// var sse = new SSE();



//listening to the server
server.listen(4000, function() {
    console.log('Listening on http://localhost:4000')
});