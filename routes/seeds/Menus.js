const mongoose = require('mongoose');

const MenuCatgorySchema = mongoose.Schema({
    name: String,
    tag: String,
    menuItems: [{
        type: mongoose.Types.ObjectId,
        ref: 'MenuItem'
    }]
});
const Category = mongoose.model('MenuCategory', MenuCatgorySchema);


const makeCategory = async() => {
    const c = new Category({
            name: 'Burgers',
            tag: 'Chubb'
        })
        //c.menuItems.push('5fb93116a4481713cc1fc0dd')
    const res = await c.save();
    console.log(res);
}

makeCategory();
// module.exports = mongoose.model('MenuCategory', MenuCatgorySchema);