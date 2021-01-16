const Restaurant = require("../../models/Restaurant");
const mongoose = require('mongoose');
const path = require('path');
const result = require('dotenv').config({ path: path.resolve(process.cwd(), '.env') })

if (result.error) {
    throw result.error
}

const makeRestaurant = async() => {
    const restaurant = new Restaurant({
        name: 'Flavaz South',
        //email: 'flavaz@email.com',
        description: 'An store that offers quality food at a reasonable price',
        contact_number: '0414016549',
        campus: 'South',
        trading_hours: [{
            day: 'Monday',
            times: '08:00-15:00'
        },
        {
            day: 'Tuesday',
            times: '08:00-15:00'

        }, {
            day: 'Wednesday',
            times: '08:00-15:00'

        },
        {
            day: 'Thursday',
            times: '08:00-15:00'

        }, {
            day: 'Friday',
            times: '08:00-15:00',
            unavailable: '12:00-14:00',

        }, {
            day: 'Saturday',
            times: '10:00-18:00'
        }, {
            day: 'Sunday',
            times: '10:00-15:00'

        }],
        hasMenu: true,
        //TODO perform aggregate calculations on the restaurant
        aggregateRating: 4.7,
        // img: {
        //     data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
        //     contentType: 'image/png'
        // },
        vendor_id: '5fd4d74c584eb04bb0a3cd62'
    });
    //c.menuItems.push('5fb93116a4481713cc1fc0dd')
    try {
        const saveRestaurant = await restaurant.save();
        console.log(saveRestaurant);
        //res.json(saveRestaurant);
        // res.redirect('/');
    } catch (err) {
        console.log(err);
        //res.json({ message: err });
    }
    //const res = await restaurant.save();
    //console.log(res);
}

mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true,useNewUrlParser: true }, () => {
    console.log('connected to DB');
    // const collection = client.db("test").collection("devices");
    // console.log(collection);
})


makeRestaurant();
//module.exports = makeRestaurant;
