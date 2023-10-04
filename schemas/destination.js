const mongoose = require('mongoose');

const DestinationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    country: { type: String, required: true },
    dateStart: { type: Date },
    dateEnd: { type: Date },
    description: { type: String },
    link: { type: String },
    image: { type: String },
});

const Destination = mongoose.model('Destination', DestinationSchema);

module.exports = Destination;