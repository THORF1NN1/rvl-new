const mongoose = require('mongoose');

const multiLang = {
    kz: { type: String, default: '' },
    ru: { type: String, default: '' },
    en: { type: String, default: '' },
};

const serviceSchema = new mongoose.Schema({
    category: { type: String, required: true },
    icon: { type: String, default: 'science' },
    title: multiLang,
    description: multiLang,
    details: multiLang,
    price: { type: String, default: '' },
    duration: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
