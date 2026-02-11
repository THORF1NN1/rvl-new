const mongoose = require('mongoose');

const multiLang = {
    kz: { type: String, default: '' },
    ru: { type: String, default: '' },
    en: { type: String, default: '' },
};

const branchSchema = new mongoose.Schema({
    city: multiLang,
    name: multiLang,
    director: multiLang,
    address: multiLang,
    phone: { type: String, default: '' },
    email: { type: String, default: '' },
    isMain: { type: Boolean, default: false },
    coords: { type: [Number], default: [0, 0] },
}, { timestamps: true });

module.exports = mongoose.model('Branch', branchSchema);
