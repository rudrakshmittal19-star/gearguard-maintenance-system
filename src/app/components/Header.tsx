import { Bell, Search, LogOut } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onLogout?: () => void;
  onAddTechnician?: (name: string) => void;
}

export function Header({ title, subtitle, onLogout, onAddTechnician }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-gradient-to-r from-sky-500 to-indigo-600 flex items-center justify-center text-white font-semibold">GG</div>
            <div>
              <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
              {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search maintenance, equipment, technicians"
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none w-72"
            />
          </div>

          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {onAddTechnician && (
            <button
              onClick={() => {
                const name = window.prompt('Technician full name');
                if (name) onAddTechnician(name);
              }}
              className="px-3 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
            >
              Add Technician
            </button>
          )}

          {onLogout && (
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}