const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    cid: Number,
    categoryName: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Category', CategorySchema, 'Categories');