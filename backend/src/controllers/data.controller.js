const Technician = require('../models/technician.model');
const Equipment = require('../models/equipment.model');
const MaintenanceRequest = require('../models/request.model');

exports.getTechnicians = async (req, res) => {
  try {
    const docs = await Technician.find().lean();
    return res.json(docs);
  } catch (err) {
    console.error('getTechnicians', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.createTechnician = async (req, res) => {
  try {
    const { id, name, avatar, color } = req.body;
    if (!id || !name) return res.status(400).json({ message: 'id and name are required' });
    const exists = await Technician.findOne({ id });
    if (exists) return res.status(409).json({ message: 'Technician with this id already exists' });
    const doc = await Technician.create({ id, name, avatar, color });
    // emit real-time event
    const io = req.app.get('io');
    if (io) io.emit('technician:created', doc);
    return res.status(201).json(doc);
  } catch (err) {
    console.error('createTechnician', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateTechnician = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const doc = await Technician.findOneAndUpdate({ id }, updates, { new: true });
    if (!doc) return res.status(404).json({ message: 'Technician not found' });
    const io = req.app.get('io');
    if (io) io.emit('technician:updated', doc);
    return res.json(doc);
  } catch (err) {
    console.error('updateTechnician', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteTechnician = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Technician.deleteOne({ id });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Technician not found' });
    const io = req.app.get('io');
    if (io) io.emit('technician:deleted', { id });
    return res.json({ message: 'Deleted' });
  } catch (err) {
    console.error('deleteTechnician', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Requests create/update endpoints (emit events for real-time updates)
exports.createRequest = async (req, res) => {
  try {
    const payload = req.body;
    if (!payload || !payload.id || !payload.subject) return res.status(400).json({ message: 'id and subject required' });
    const doc = await MaintenanceRequest.create(payload);
    const io = req.app.get('io');
    if (io) io.emit('request:created', doc);
    return res.status(201).json(doc);
  } catch (err) {
    console.error('createRequest', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const doc = await MaintenanceRequest.findOneAndUpdate({ id }, updates, { new: true });
    if (!doc) return res.status(404).json({ message: 'Request not found' });
    const io = req.app.get('io');
    if (io) io.emit('request:updated', doc);
    return res.json(doc);
  } catch (err) {
    console.error('updateRequest', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getEquipment = async (req, res) => {
  try {
    const docs = await Equipment.find().lean();
    return res.json(docs);
  } catch (err) {
    console.error('getEquipment', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getRequests = async (req, res) => {
  try {
    const docs = await MaintenanceRequest.find().lean();
    return res.json(docs);
  } catch (err) {
    console.error('getRequests', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
