const mongoose = require('mongoose');

const technicianSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  avatar: { type: String },
  color: { type: String },
});

module.exports = mongoose.model('Technician', technicianSchema);
