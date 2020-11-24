const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://dbUser:P@$$Word@cluster0.qdyp3.mongodb.net/tst_dbQE?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true }, () => {
    console.log('connected to DB');
    // const collection = client.db("test").collection("devices");
    // console.log(collection);
})

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