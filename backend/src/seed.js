require('dotenv').config();
const mongoose = require('mongoose');
const Technician = require('./models/technician.model');
const Equipment = require('./models/equipment.model');
const MaintenanceRequest = require('./models/request.model');

async function seed() {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      console.error('MONGO_URI not set in .env');
      process.exit(1);
    }
    await mongoose.connect(mongoUri);

    // clear collections
    await Technician.deleteMany({});
    await Equipment.deleteMany({});
    await MaintenanceRequest.deleteMany({});

    const technicians = [
      { id: 't1', name: 'Aarav Mittal', avatar: 'AM', color: '#4F46E5' },
      { id: 't2', name: 'Priya Sharma', avatar: 'PS', color: '#059669' },
      { id: 't3', name: 'Rohan Verma', avatar: 'RV', color: '#DC2626' },
      { id: 't4', name: 'Ananya Gupta', avatar: 'AG', color: '#7C3AED' },
      { id: 't5', name: 'Karan Singh', avatar: 'KS', color: '#0EA5A4' },
      { id: 't6', name: 'Isha Patel', avatar: 'IP', color: '#F59E0B' },
    ];

    const equipments = [
      {
        id: 'eq1',
        name: 'CNC Milling Machine',
        serial: 'CNC-2023-001',
        department: 'Production',
        location: 'Building A - Floor 2',
        warrantyExpiry: '2026-12-31',
        status: 'active',
        maintenanceCount: 8,
      },
      {
        id: 'eq2',
        name: 'Hydraulic Press',
        serial: 'HYD-2022-045',
        department: 'Manufacturing',
        location: 'Building B - Floor 1',
        warrantyExpiry: '2025-06-15',
        status: 'active',
        maintenanceCount: 12,
      },
      {
        id: 'eq3',
        name: 'Industrial Conveyor Belt',
        serial: 'CONV-2021-078',
        department: 'Logistics',
        location: 'Warehouse 3',
        warrantyExpiry: '2024-03-20',
        status: 'active',
        maintenanceCount: 15,
      },
      {
        id: 'eq4',
        name: 'Air Compressor Unit',
        serial: 'AIR-2020-112',
        department: 'Utilities',
        location: 'Building C - Basement',
        warrantyExpiry: '2023-11-10',
        status: 'scrapped',
        maintenanceCount: 24,
      },
      {
        id: 'eq5',
        name: 'Laser Cutting Machine',
        serial: 'LASER-2024-003',
        department: 'Production',
        location: 'Building A - Floor 3',
        warrantyExpiry: '2027-08-30',
        status: 'active',
        maintenanceCount: 3,
      },
    ];

    const requests = [
      {
        id: 'm1',
        subject: 'Replace worn cutting blades',
        equipmentId: 'eq1',
        equipmentName: 'CNC Milling Machine',
        team: 'Mechanical Team',
        requestType: 'corrective',
        scheduledDate: '2025-12-20',
        duration: 3,
        assignedTechnicianId: 't1',
        stage: 'new',
        isOverdue: true,
        createdDate: '2025-12-15',
      },
      {
        id: 'm2',
        subject: 'Quarterly preventive check',
        equipmentId: 'eq2',
        equipmentName: 'Hydraulic Press',
        team: 'Hydraulics Team',
        requestType: 'preventive',
        scheduledDate: '2025-12-28',
        duration: 2,
        assignedTechnicianId: 't2',
        stage: 'new',
        isOverdue: false,
        createdDate: '2025-12-18',
      },
      {
        id: 'm3',
        subject: 'Belt alignment issue',
        equipmentId: 'eq3',
        equipmentName: 'Industrial Conveyor Belt',
        team: 'Mechanical Team',
        requestType: 'corrective',
        scheduledDate: '2025-12-25',
        duration: 4,
        assignedTechnicianId: 't3',
        stage: 'in-progress',
        isOverdue: false,
        createdDate: '2025-12-22',
      },
      {
        id: 'm4',
        subject: 'Motor replacement',
        equipmentId: 'eq3',
        equipmentName: 'Industrial Conveyor Belt',
        team: 'Electrical Team',
        requestType: 'corrective',
        scheduledDate: '2025-12-23',
        duration: 6,
        assignedTechnicianId: 't4',
        stage: 'in-progress',
        isOverdue: false,
        createdDate: '2025-12-20',
      },
      {
        id: 'm5',
        subject: 'Annual calibration',
        equipmentId: 'eq5',
        equipmentName: 'Laser Cutting Machine',
        team: 'Precision Team',
        requestType: 'preventive',
        scheduledDate: '2025-12-27',
        duration: 5,
        assignedTechnicianId: 't1',
        stage: 'repaired',
        isOverdue: false,
        createdDate: '2025-12-10',
      },
    ];

    await Technician.insertMany(technicians);
    await Equipment.insertMany(equipments);
    await MaintenanceRequest.insertMany(requests);

    console.log('Seed completed');
    process.exit(0);
  } catch (err) {
    console.error('Seed error', err);
    process.exit(1);
  }
}

seed();
