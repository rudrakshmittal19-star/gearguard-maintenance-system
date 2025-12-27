const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  serial: { type: String },
  department: { type: String },
  location: { type: String },
  warrantyExpiry: { type: String },
  status: { type: String },
  maintenanceCount: { type: Number, default: 0 },
});

module.exports = mongoose.model('Equipment', equipmentSchema);
