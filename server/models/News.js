const mongoose = require('mongoose');

const multiLang = {
    kz: { type: String, default: '' },
    ru: { type: String, default: '' },
    en: { type: String, default: '' },
};

const newsSchema = new mongoose.Schema({
    title: multiLang,
    excerpt: multiLang,
    category: multiLang,
    date: { type: Date, default: Date.now },
    image: { type: String, default: '' },
    featured: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('News', newsSchema);
