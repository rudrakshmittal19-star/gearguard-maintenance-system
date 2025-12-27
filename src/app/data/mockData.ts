import { Technician, Equipment, MaintenanceRequest } from '../types/maintenance';

// generate a small set of realistic Indian names for demo purposes
const indianFirstNames = ['Aarav', 'Vivaan', 'Aditya', 'Arjun', 'Ishaan', 'Sai', 'Vihaan', 'Karan', 'Rohan', 'Sameer', 'Priya', 'Ananya', 'Isha', 'Nisha', 'Sana', 'Riya'];
const indianLastNames = ['Mittal', 'Sharma', 'Verma', 'Gupta', 'Kumar', 'Singh', 'Patel', 'Reddy', 'Mehra', 'Chatterjee', 'Nair', 'Iyer'];
const colors = ['#4F46E5', '#059669', '#DC2626', '#7C3AED', '#0EA5A4', '#F59E0B'];

function makeAvatar(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export const technicians: Technician[] = Array.from({ length: 6 }).map((_, i) => {
  const first = indianFirstNames[i % indianFirstNames.length];
  const last = indianLastNames[i % indianLastNames.length];
  const name = `${first} ${last}`;
  return {
    id: `t${i + 1}`,
    name,
    avatar: makeAvatar(name),
    color: colors[i % colors.length],
  } as Technician;
});

export const equipment: Equipment[] = [
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

export const maintenanceRequests: MaintenanceRequest[] = [
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
