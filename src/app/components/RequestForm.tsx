import { useState } from 'react';
import { MaintenanceRequest, RequestType, Technician, Equipment } from '../types/maintenance';
import { Calendar, Clock, User, Wrench, ChevronLeft } from 'lucide-react';

interface RequestFormProps {
  equipment: Equipment[];
  technicians: Technician[];
  onSave: (request: Partial<MaintenanceRequest>) => void;
  onCancel: () => void;
  initialData?: MaintenanceRequest;
}

export function RequestForm({ equipment, technicians, onSave, onCancel, initialData }: RequestFormProps) {
  const [subject, setSubject] = useState(initialData?.subject || '');
  const [selectedEquipment, setSelectedEquipment] = useState(initialData?.equipmentId || '');
  const [requestType, setRequestType] = useState<RequestType>(initialData?.requestType || 'corrective');
  const [scheduledDate, setScheduledDate] = useState(initialData?.scheduledDate || '');
  const [duration, setDuration] = useState(initialData?.duration || 2);
  const [assignedTechnician, setAssignedTechnician] = useState(initialData?.assignedTechnicianId || '');

  const selectedEquipmentData = equipment.find((e) => e.id === selectedEquipment);
  const maintenanceTeam = selectedEquipmentData?.department 
    ? `${selectedEquipmentData.department} Team` 
    : 'Not assigned';

  const stages = [
    { key: 'new', label: 'New', active: true },
    { key: 'in-progress', label: 'In Progress', active: false },
    { key: 'repaired', label: 'Repaired', active: false },
    { key: 'scrap', label: 'Scrap', active: false },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      subject,
      equipmentId: selectedEquipment,
      equipmentName: selectedEquipmentData?.name || '',
      team: maintenanceTeam,
      requestType,
      scheduledDate,
      duration,
      assignedTechnicianId: assignedTechnician,
      stage: initialData?.stage || 'new',
      isOverdue: false,
      createdDate: initialData?.createdDate || new Date().toISOString(),
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={onCancel}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold text-gray-900">
              {initialData ? 'Edit Maintenance Request' : 'New Maintenance Request'}
            </h2>
          </div>

          {/* Stage Status Bar */}
          <div className="flex items-center gap-2">
            {stages.map((stage, index) => (
              <div key={stage.key} className="flex items-center">
                <div
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    stage.active
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {stage.label}
                </div>
                {index < stages.length - 1 && (
                  <div className="w-8 h-0.5 bg-gray-200 mx-1"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Subject */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Enter maintenance issue subject"
                required
              />
            </div>

            {/* Equipment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Equipment <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Wrench className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={selectedEquipment}
                  onChange={(e) => setSelectedEquipment(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white"
                  required
                >
                  <option value="">Select equipment...</option>
                  {equipment.map((eq) => (
                    <option key={eq.id} value={eq.id}>
                      {eq.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Maintenance Team (Auto-filled) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maintenance Team
              </label>
              <input
                type="text"
                value={maintenanceTeam}
                readOnly
                className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-600"
              />
            </div>

            {/* Request Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Request Type <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="corrective"
                    checked={requestType === 'corrective'}
                    onChange={(e) => setRequestType(e.target.value as RequestType)}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Corrective</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="preventive"
                    checked={requestType === 'preventive'}
                    onChange={(e) => setRequestType(e.target.value as RequestType)}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Preventive</span>
                </label>
              </div>
            </div>

            {/* Scheduled Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Scheduled Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                />
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration (hours) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  min="1"
                  max="24"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                />
              </div>
            </div>

            {/* Assigned Technician */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assigned Technician <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={assignedTechnician}
                  onChange={(e) => setAssignedTechnician(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white"
                  required
                >
                  <option value="">Select technician...</option>
                  {technicians.map((tech) => (
                    <option key={tech.id} value={tech.id}>
                      {tech.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {initialData ? 'Save Changes' : 'Create Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
