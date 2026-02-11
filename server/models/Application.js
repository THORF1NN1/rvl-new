const mongoose = require('mongoose');

const multiLang = {
    kz: { type: String, default: '' },
    ru: { type: String, default: '' },
    en: { type: String, default: '' },
};

const applicationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    client: { type: String, required: true },
    service: { type: String, required: true },
    amount: { type: String, default: '0 ₸' },
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'processing', 'approved', 'rejected'], default: 'pending' },
    notes: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
