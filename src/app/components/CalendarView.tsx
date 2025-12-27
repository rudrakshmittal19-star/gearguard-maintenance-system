import { useState } from 'react';
import { MaintenanceRequest, Technician } from '../types/maintenance';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

interface CalendarViewProps {
  requests: MaintenanceRequest[];
  technicians: Technician[];
  onCreateRequest: (date: string) => void;
  onRequestClick: (request: MaintenanceRequest) => void;
}

export function CalendarView({ requests, technicians, onCreateRequest, onRequestClick }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 11, 1)); // December 2025

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentDate);

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const formatDate = (day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const getRequestsForDate = (day: number) => {
    const dateStr = formatDate(day);
    return requests.filter((r) => r.requestType === 'preventive' && r.scheduledDate === dateStr);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const today = new Date();
  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Calendar Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Preventive Maintenance Calendar
          </h2>
          <div className="flex items-center gap-4">
            <button
              onClick={goToPreviousMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <span className="text-lg font-medium text-gray-900 min-w-[180px] text-center">
              {monthNames[month]} {year}
            </span>
            <button
              onClick={goToNextMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-6">
        {/* Day Names */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {dayNames.map((day) => (
            <div key={day} className="text-center py-2 text-sm font-medium text-gray-600">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-2">
          {/* Empty cells before first day */}
          {Array.from({ length: startingDayOfWeek }).map((_, index) => (
            <div key={`empty-${index}`} className="aspect-square"></div>
          ))}

          {/* Days of the month */}
          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1;
            const dayRequests = getRequestsForDate(day);
            const isTodayDate = isToday(day);

            return (
              <div
                key={day}
                className={`aspect-square border rounded-lg p-2 hover:bg-gray-50 transition-colors relative group ${
                  isTodayDate ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span
                    className={`text-sm font-medium ${
                      isTodayDate ? 'text-blue-600' : 'text-gray-700'
                    }`}
                  >
                    {day}
                  </span>
                  <button
                    onClick={() => onCreateRequest(formatDate(day))}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-blue-100 rounded"
                  >
                    <Plus className="w-3 h-3 text-blue-600" />
                  </button>
                </div>

                {/* Preventive Maintenance Events */}
                <div className="space-y-1">
                  {dayRequests.map((request) => {
                    const technician = technicians.find((t) => t.id === request.assignedTechnicianId);
                    return (
                      <div
                        key={request.id}
                        onClick={() => onRequestClick(request)}
                        className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded cursor-pointer hover:bg-green-200 transition-colors truncate"
                        style={{
                          borderLeft: `3px solid ${technician?.color || '#10B981'}`,
                        }}
                        title={request.subject}
                      >
                        {request.subject}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded border-2 border-blue-500 bg-blue-50"></div>
              <span className="text-sm text-gray-600">Today</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-green-100 border-l-4 border-green-600"></div>
              <span className="text-sm text-gray-600">Preventive Maintenance</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
