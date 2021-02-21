const MenuItemCategory = require("../../models/MenuCategory");
const mongoose = require('mongoose');
const path = require('path');
const result = require('dotenv').config({ path: path.resolve(process.cwd(), '.env') })

if (result.error) {
    throw result.error
}

const categories = [];

const makeCategories = async() => {
    const cat1 = new MenuItemCategory({
        name: "Dessert",
        picture_url: "https://i.ibb.co/gJjQjn8/dessert-icon.jpg"
    });

    const cat2 = new MenuItemCategory({
        name: "Vegan",
        picture_url: "https://i.ibb.co/N1yMNDP/Vegan-friendly-icon.png"
    });

    const cat3 = new MenuItemCategory({
        name: "Halaal",
        picture_url: "https://i.ibb.co/z4svCK2/halaal.png"
    });


    const cat4 = new MenuItemCategory({
        name: "Burgers",
        picture_url: "https://i.ibb.co/82GT5vK/burgers.png"
    });

    categories.push(cat1, cat2, cat3, cat4);
    try {
        categories.forEach((cat) => {
            console.log(cat);
            cat.save()
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


makeCategories();