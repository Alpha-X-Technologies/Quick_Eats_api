const Restaurant = require("../../models/Restaurant");
const mongoose = require('mongoose');
const path = require('path');
const result = require('dotenv').config({ path: path.resolve(process.cwd(), '.env') })

if (result.error) {
    throw result.error
}

const makeRestaurant = async() => {
    const restaurant = new Restaurant({
        name: 'Cafe South',
        description: 'The cafeteria situated on the South campus',
        contact_number: '0414612249',
        campus: 'South',
        trading_hours: [{
                day: '1',
                times: '08:00-21:00'
            },
            {
                day: '2',
                times: '08:00-21:00'

            }, {
                day: '3',
                times: '08:00-21:00'

            },
            {
                day: '4',
                times: '08:00-21:00'

            }, {
                day: '5',
                times: '08:00-22:00',

            }, {
                day: '6',
                times: '10:00-16:00'
            }, {
                day: '7',
                times: '10:00-13:00'

            }
        ],
        picture_url: "https://i.ibb.co/4ZF0ZJQ/logo.png",
        vendor: '6016a6f55cf9231448c12282'
    });
    //c.menuItems.push('5fb93116a4481713cc1fc0dd')
    try {
        const saveRestaurant = await restaurant.save();
        //console.log(saveRestaurant);
        //res.json(saveRestaurant);
        // res.redirect('/');
    } catch (err) {
        console.log(err);
        //res.json({ message: err });
    }
    //const res = await restaurant.save();
    //console.log(res);
}

mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true }, () => {
    console.log('connected to DB');
    // const collection = client.db("test").collection("devices");
    // console.log(collection);
})


makeRestaurant();