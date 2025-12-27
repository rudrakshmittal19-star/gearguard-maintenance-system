import { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { MaintenanceRequest, MaintenanceStage, Technician } from '../types/maintenance';
import { Clock, CircleAlert } from 'lucide-react';

interface KanbanBoardProps {
  requests: MaintenanceRequest[];
  technicians: Technician[];
  onUpdateStage: (requestId: string, newStage: MaintenanceStage) => void;
  onRequestClick: (request: MaintenanceRequest) => void;
}

interface MaintenanceCardProps {
  request: MaintenanceRequest;
  technician: Technician | undefined;
  onClick: () => void;
}

const MaintenanceCard = ({ request, technician, onClick }: MaintenanceCardProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'maintenance-card',
    item: { id: request.id, stage: request.stage },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag as any}
      onClick={onClick}
      className={`bg-white rounded-lg border border-gray-100 p-4 mb-3 cursor-pointer hover:shadow-lg transition-shadow ${
        isDragging ? 'opacity-60' : ''
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-gray-900 flex-1">{request.subject}</h4>
        {request.isOverdue && (
          <div className="ml-2 flex items-center gap-1 text-red-600">
            <CircleAlert className="w-4 h-4" />
          </div>
        )}
      </div>
      
  <p className="text-sm text-gray-500 mb-3">{request.equipmentName}</p>
      
      <div className="flex items-center justify-between">
        {technician && (
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium shadow-sm"
              style={{ backgroundColor: technician.color }}
            >
              {technician.avatar}
            </div>
            <span className="text-sm text-gray-700">{technician.name}</span>
          </div>
        )}
        
        {request.isOverdue && (
          <div className="flex items-center gap-1 text-xs text-red-600">
            <Clock className="w-3 h-3" />
            <span>Overdue</span>
          </div>
        )}
      </div>
    </div>
  );
};

interface KanbanColumnProps {
  stage: MaintenanceStage;
  title: string;
  color: string;
  requests: MaintenanceRequest[];
  technicians: Technician[];
  onDrop: (requestId: string, newStage: MaintenanceStage) => void;
  onRequestClick: (request: MaintenanceRequest) => void;
}

const KanbanColumn = ({ stage, title, color, requests, technicians, onDrop, onRequestClick }: KanbanColumnProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'maintenance-card',
    drop: (item: { id: string; stage: MaintenanceStage }) => {
      if (item.stage !== stage) {
        onDrop(item.id, stage);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div className="flex-1 min-w-[280px]">
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-3">
          <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: color }}></div>
          <h3 className="font-semibold text-gray-800">{title}</h3>
          <span className="ml-auto bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
            {requests.length}
          </span>
        </div>
      </div>
      
      <div
        ref={drop as any}
        className={`min-h-[500px] bg-gray-50 rounded-lg p-3 transition-colors ${
          isOver ? 'bg-blue-50 border-2 border-blue-300' : 'border-2 border-transparent'
        }`}
      >
        {requests.map((request) => (
          <MaintenanceCard
            key={request.id}
            request={request}
            technician={technicians.find((t) => t.id === request.assignedTechnicianId)}
            onClick={() => onRequestClick(request)}
          />
        ))}
      </div>
    </div>
  );
};

export function KanbanBoard({ requests, technicians, onUpdateStage, onRequestClick }: KanbanBoardProps) {
  const columns: { stage: MaintenanceStage; title: string; color: string }[] = [
    { stage: 'new', title: 'New', color: '#3B82F6' },
    { stage: 'in-progress', title: 'In Progress', color: '#F59E0B' },
    { stage: 'repaired', title: 'Repaired', color: '#10B981' },
    { stage: 'scrap', title: 'Scrap', color: '#EF4444' },
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((column) => (
          <KanbanColumn
            key={column.stage}
            stage={column.stage}
            title={column.title}
            color={column.color}
            requests={requests.filter((r) => r.stage === column.stage)}
            technicians={technicians}
            onDrop={onUpdateStage}
            onRequestClick={onRequestClick}
          />
        ))}
      </div>
    </DndProvider>
  );
}