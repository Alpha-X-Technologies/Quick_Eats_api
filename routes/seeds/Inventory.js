const mongoose = require('mongoose');


//connect to db

const Inventory = mongoose.model('InventoryItem', InventoryItemSchema);

const makeInventory = async() => {
    const inventory = new Inventory({
        name: 'Sliced Jalapeno'
    })

    const res = await inventory.save()
    console.log(res)
}

makeInventory();