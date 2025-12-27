import { MaintenanceRequest } from '../types/maintenance';
import { Wrench, Clock, CircleCheck, CircleX } from 'lucide-react';

interface StatsCardsProps {
  requests: MaintenanceRequest[];
}

export function StatsCards({ requests }: StatsCardsProps) {
  const stats = {
    total: requests.length,
    inProgress: requests.filter((r) => r.stage === 'in-progress').length,
    repaired: requests.filter((r) => r.stage === 'repaired').length,
    overdue: requests.filter((r) => r.isOverdue).length,
  };

  const cards = [
    {
      label: 'Total Requests',
      value: stats.total,
      icon: Wrench,
      color: 'bg-blue-50 text-blue-600',
      iconBg: 'bg-blue-100',
    },
    {
      label: 'In Progress',
      value: stats.inProgress,
      icon: Clock,
      color: 'bg-orange-50 text-orange-600',
      iconBg: 'bg-orange-100',
    },
    {
      label: 'Repaired',
      value: stats.repaired,
      icon: CircleCheck,
      color: 'bg-green-50 text-green-600',
      iconBg: 'bg-green-100',
    },
    {
      label: 'Overdue',
      value: stats.overdue,
      icon: CircleX,
      color: 'bg-red-50 text-red-600',
      iconBg: 'bg-red-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className={`rounded-lg p-4 border bg-white shadow-sm border-gray-100`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{card.label}</p>
                <p className="text-3xl font-bold text-gray-900">{card.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center`}>
                <Icon className="w-6 h-6 text-gray-500" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}