const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  subject: { type: String, required: true },
  equipmentId: { type: String },
  equipmentName: { type: String },
  team: { type: String },
  requestType: { type: String },
  scheduledDate: { type: String },
  duration: { type: Number },
  assignedTechnicianId: { type: String },
  stage: { type: String },
  isOverdue: { type: Boolean },
  createdDate: { type: String },
});

module.exports = mongoose.model('MaintenanceRequest', requestSchema);
