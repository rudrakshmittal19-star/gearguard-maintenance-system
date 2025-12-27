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
      { id: 't7', name: 'Vikram Reddy', avatar: 'VR', color: '#4F46E5' },
      { id: 't8', name: 'Meera Nair', avatar: 'MN', color: '#059669' },
      { id: 't9', name: 'Sahil Iyer', avatar: 'SI', color: '#DC2626' },
      { id: 't10', name: 'Nisha Chatterjee', avatar: 'NC', color: '#7C3AED' },
    ];

    const equipments = [
      {
        id: 'eq1',
        name: 'CNC Milling Machine',
        serial: 'CNC-2023-001',
        department: 'Production',
        location: 'Building A - Floor 2',
        floor: '2',
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
        floor: '1',
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
        floor: 'G',
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
        floor: 'B',
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
        floor: '3',
        warrantyExpiry: '2027-08-30',
        status: 'active',
        maintenanceCount: 3,
      },
      {
        id: 'eq6',
        name: 'Industrial Forklift',
        serial: 'FL-2020-210',
        department: 'Logistics',
        location: 'Warehouse 1',
        floor: 'G',
        warrantyExpiry: '2025-05-01',
        status: 'active',
        maintenanceCount: 6,
      },
      {
        id: 'eq7',
        name: 'Backup Generator',
        serial: 'GEN-2019-009',
        department: 'Utilities',
        location: 'Building B - Roof',
        floor: 'Roof',
        warrantyExpiry: '2028-09-30',
        status: 'active',
        maintenanceCount: 10,
      },
      {
        id: 'eq8',
        name: '3D Printer (Pro)',
        serial: '3DP-2024-011',
        department: 'R&D',
        location: 'R&D Lab - Floor 1',
        floor: '1',
        warrantyExpiry: '2026-04-15',
        status: 'active',
        maintenanceCount: 1,
      },
      {
        id: 'eq9',
        name: 'Hydraulic Pump',
        serial: 'HP-2022-077',
        department: 'Manufacturing',
        location: 'Building B - Floor 1',
        floor: '1',
        warrantyExpiry: '2025-07-20',
        status: 'active',
        maintenanceCount: 4,
      },
      {
        id: 'eq10',
        name: 'Vibration Analyzer',
        serial: 'VA-2021-033',
        department: 'Maintenance',
        location: 'Maintenance Office - Floor 2',
        floor: '2',
        warrantyExpiry: '2026-11-11',
        status: 'active',
        maintenanceCount: 2,
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
      {
        id: 'm6',
        subject: 'Complete system failure',
        equipmentId: 'eq4',
        equipmentName: 'Air Compressor Unit',
        team: 'Utilities Team',
        requestType: 'corrective',
        scheduledDate: '2025-12-18',
        duration: 8,
        assignedTechnicianId: 't2',
        stage: 'scrap',
        isOverdue: true,
        createdDate: '2025-12-16',
      },
      {
        id: 'm7',
        subject: 'Pressure valve inspection',
        equipmentId: 'eq2',
        equipmentName: 'Hydraulic Press',
        team: 'Hydraulics Team',
        requestType: 'preventive',
        scheduledDate: '2026-01-05',
        duration: 2,
        assignedTechnicianId: 't3',
        stage: 'new',
        isOverdue: false,
        createdDate: '2025-12-26',
      },
      {
        id: 'm8',
        subject: 'Lubrication service',
        equipmentId: 'eq1',
        equipmentName: 'CNC Milling Machine',
        team: 'Mechanical Team',
        requestType: 'preventive',
        scheduledDate: '2026-01-10',
        duration: 1,
        assignedTechnicianId: 't4',
        stage: 'new',
        isOverdue: false,
        createdDate: '2025-12-26',
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
