const mongoose = require('mongoose');
const path = require('path');
const MenuItemExtra = require("../../models/MenuItemExtra");
const MenuItemExtraGroup = require('../../models/MenuItemExtraGroup');
const result = require('dotenv').config({ path: path.resolve(process.cwd(), '.env') })

if (result.error) {
    throw result.error
}

const group_items = [];

const makeGroupItems = async() => {
    group_items.push(new MenuItemExtraGroup({
        name: 'Sauces'
    }), new MenuItemExtraGroup({
        name: 'Drinks'
    }), new MenuItemExtraGroup({
        name: 'Extras'
    }), new MenuItemExtraGroup({
        name: 'Flavours'
    }));

    try {
        group_items.forEach((item) => {
            item.save()
        })
    } catch (err) {
        console.log(err);
        //res.json({ message: err });
    }
}

const items = [];

const makeItems = async() => {
    const item1 = new MenuItemExtra({
        name: "Chips",
        price: 15,
        size: 'M',
        group: '60185da365db108320b73f0e', //Extras
        menu: '60167c66f1d4ba52207aacc5', //default
        categories: '60185e63f8c62a857ccd9632' //burger
    });

    const item2 = new MenuItemExtra({
        name: "Tomato",
        group: '60185da365db108320b73f0c', //Sauces
        menu: '60167c66f1d4ba52207aacc5', //default
        categories: '60169b07c4813880449082fa' //burger
    });

    const item3 = new MenuItemExtra({
        name: "Coca-Cola",
        size: "330ml",
        price: 10,
        group: '60185da365db108320b73f0d', //Drinks
        menu: '60167c66f1d4ba52207aacc5', //default
        categories: '60169b07c4813880449082fa' //burger
    });

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

//makeGroupItems();
makeItems();