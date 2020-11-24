const mongoose = require('mongoose');


//connect to db
mongoose.connect('mongodb+srv://dbUser:P@$$Word@cluster0.qdyp3.mongodb.net/tst_dbQE?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true }, () => {
    console.log('connected to DB');
    // const collection = client.db("test").collection("devices");
    // console.log(collection);
})


const Inventory = mongoose.model('InventoryItem', InventoryItemSchema);

const makeInventory = async() => {
    const inventory = new Inventory({
        name: 'Sliced Jalapeno'
    })

    const res = await inventory.save()
    console.log(res)
}

makeInventory();