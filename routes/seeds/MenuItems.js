const mongoose = require('mongoose');
const path = require('path');
const MenuItem = require("../../models/MenuItem");
const result = require('dotenv').config({ path: path.resolve(process.cwd(), '.env') })

if (result.error) {
    throw result.error
}

const items = [];

const makeMenuItems = async() => {
    const item1 = new MenuItem({
        name: "Dagwood",
        price: 50,
        description: "Toasted bread with egg, a beef patty, with lettuce and tomato",
        picture_url: "https://i.ibb.co/jyQ6brt/IMG-7451.jpg",
        menu: '60167c66f1d4ba52207aacc5', //Default
        categories: '60169b07c4813880449082fa', //Burgers
        extra_items: '60185e63f8c62a857ccd9632', //Chips
    });

    const item2 = new MenuItem({
        name: "Cheese Burger",
        price: 40,
        description: "A charming burger with 100% beef and a slice of cheese",
        picture_url: "https://i.ibb.co/jyQ6brt/IMG-7451.jpg",
        menu: '60167c66f1d4ba52207aacc5', //Default menu for Chubby
        categories: '60169b07c4813880449082fa', //Burgers
        extra_items: '60185e63f8c62a857ccd9634', //Coca-Cola
    });

    const item3 = new MenuItem({
        name: "Chip Roll",
        price: 35,
        description: "A roll with chips",
        picture_url: "https://i.ibb.co/jyQ6brt/IMG-7451.jpg",
        menu: '60167c66f1d4ba52207aacc5',
        extra_items: ['60185e63f8c62a857ccd9633', '60185e63f8c62a857ccd9634'], //tomato sauce and coke
    });


    // const item4 = new MenuItem({
    //     name: "Cheese Burger",
    //     price: 50,
    //     description: "A charming burger with 100% beef and a slice of cheese",
    //     picture_url: "https://i.ibb.co/jyQ6brt/IMG-7451.jpg",
    //     menu: '',
    //     categories: '',
    //     extra_items: '',
    // });

    items.push(item1, item2, item3);
    try {
        items.forEach((item) => {
            item.save()
        })
    } catch (err) {
        console.log(err);
        //res.json({ message: err });
    }
}

mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true }, () => {
    console.log('connected to DB');
    // const collection = client.db("test").collection("devices");
    // console.log(collection);
})


makeMenuItems();