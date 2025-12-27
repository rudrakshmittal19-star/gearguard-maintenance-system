import { LayoutGrid, FileText, Package, Calendar, Settings } from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  equipmentCount?: number;
  maintenanceCount?: number;
}

export function Sidebar({ activeView, onViewChange, equipmentCount = 5, maintenanceCount = 8 }: SidebarProps) {
  const menuItems = [
    { id: 'kanban', label: 'Kanban Board', icon: LayoutGrid },
    { id: 'form', label: 'New Request', icon: FileText },
    { id: 'equipment', label: 'Equipment', icon: Package },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white h-screen fixed left-0 top-0 flex flex-col">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-semibold text-lg">GearGuard</h1>
            <p className="text-xs text-gray-400">Maintenance System</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-sm font-medium">
            AD
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-gray-400">admin@gearguard.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}