export type MaintenanceStage = 'new' | 'in-progress' | 'repaired' | 'scrap';
export type RequestType = 'corrective' | 'preventive';

export interface Technician {
  id: string;
  name: string;
  avatar: string;
  color: string;
}

export interface Equipment {
  id: string;
  name: string;
  serial: string;
  department: string;
  location: string;
  // optional floor/location descriptor (e.g. '1', 'G', 'Roof')
  floor?: string;
  warrantyExpiry: string;
  status: 'active' | 'scrapped';
  maintenanceCount: number;
}

export interface MaintenanceRequest {
  id: string;
  subject: string;
  equipmentId: string;
  equipmentName: string;
  team: string;
  requestType: RequestType;
  scheduledDate: string;
  duration: number;
  assignedTechnicianId: string;
  stage: MaintenanceStage;
  isOverdue: boolean;
  createdDate: string;
}
