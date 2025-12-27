import { Equipment } from '../types/maintenance';
import { ChevronLeft, Wrench, MapPin, Building2, Calendar, TriangleAlert } from 'lucide-react';

interface EquipmentDetailProps {
  equipment: Equipment;
  onBack: () => void;
  onViewMaintenance: () => void;
}

export function EquipmentDetail({ equipment, onBack, onViewMaintenance }: EquipmentDetailProps) {
  const isScrapped = equipment.status === 'scrapped';

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={onBack}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-semibold text-gray-900">{equipment.name}</h1>
              <p className="text-sm text-gray-500 mt-1">Serial: {equipment.serial}</p>
            </div>
            {isScrapped && (
              <div className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg border border-red-200">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-medium">Scrapped</span>
              </div>
            )}
          </div>

          {/* Smart Button */}
          <div className="flex gap-3">
            <button
              onClick={onViewMaintenance}
              className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200"
            >
              <Wrench className="w-4 h-4" />
              <span className="font-medium">Maintenance</span>
              <span className="ml-1 px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">
                {equipment.maintenanceCount}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Equipment Information */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">Equipment Information</h2>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Serial Number */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                <Wrench className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Serial Number</p>
                <p className="font-medium text-gray-900">{equipment.serial}</p>
              </div>
            </div>

            {/* Department */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                <Building2 className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Department</p>
                <p className="font-medium text-gray-900">{equipment.department}</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Location</p>
                <p className="font-medium text-gray-900">{equipment.location}</p>
              </div>
            </div>

            {/* Warranty Expiry */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Warranty Expiry</p>
                <p className="font-medium text-gray-900">
                  {new Date(equipment.warrantyExpiry).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>

            {/* Status */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Status</p>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      isScrapped ? 'bg-red-500' : 'bg-green-500'
                    }`}
                  ></div>
                  <p className="font-medium text-gray-900 capitalize">
                    {equipment.status}
                  </p>
                </div>
              </div>
            </div>

            {/* Total Maintenance */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Wrench className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Maintenance Requests</p>
                <p className="text-2xl font-semibold text-blue-600">
                  {equipment.maintenanceCount}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scrapped Warning */}
      {isScrapped && (
        <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-red-900 mb-1">Equipment Scrapped</h3>
              <p className="text-sm text-red-700">
                This equipment has been marked as scrapped and is no longer in active service.
                Historical maintenance records are still available for reference.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}