import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { KanbanBoard } from './components/KanbanBoard';
import { RequestForm } from './components/RequestForm';
import { EquipmentDetail } from './components/EquipmentDetail';
import { CalendarView } from './components/CalendarView';
import { StatsCards } from './components/StatsCards';
import { LoginPage } from './components/LoginPage';
import { VerificationPage } from './components/VerificationPage';
import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { maintenanceRequests as mockRequests, equipment as mockEquipment, technicians as mockTechnicians } from './data/mockData';
// data will be fetched from backend
import { MaintenanceRequest, MaintenanceStage } from './types/maintenance';

export default function App() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('gearguard_authenticated') === 'true';
  });
  const [authStep, setAuthStep] = useState<'login' | 'verify'>('login');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');

  const [activeView, setActiveView] = useState('kanban');
  // Initialize UI with frontend mock data for fast local UX; backend will overwrite when available
  const [requests, setRequests] = useState<MaintenanceRequest[]>(mockRequests);
  const [selectedEquipment, setSelectedEquipment] = useState<any>(mockEquipment[0]);
  const [technicians, setTechnicians] = useState<any[]>(mockTechnicians);
  const [equipment, setEquipment] = useState<any[]>(mockEquipment);

  useEffect(() => {
    async function fetchData() {
      try {
        const [techRes, eqRes, reqRes] = await Promise.all([
          fetch('/api/data/technicians'),
          fetch('/api/data/equipment'),
          fetch('/api/data/requests'),
        ]);

        const [techJson, eqJson, reqJson] = await Promise.all([
          techRes.json(),
          eqRes.json(),
          reqRes.json(),
        ]);

        // Only overwrite frontend mock data if backend returns data
        if (Array.isArray(techJson) && techJson.length) setTechnicians(techJson);
        if (Array.isArray(eqJson) && eqJson.length) {
          setEquipment(eqJson);
          setSelectedEquipment(eqJson[0]);
        }
        if (Array.isArray(reqJson) && reqJson.length) setRequests(reqJson);
      } catch (err) {
        console.error('Failed to fetch data', err);
      }
    }

    fetchData();
  }, []);

  // setup socket.io for real-time updates
  const socketRef = useRef<Socket | null>(null);
  useEffect(() => {
    const socket = io(); // connect to same origin
    socketRef.current = socket;

    socket.on('technician:created', (tech) => {
      setTechnicians((prev) => [...prev, tech]);
    });

    socket.on('technician:updated', (tech) => {
      setTechnicians((prev) => prev.map((t) => (t.id === tech.id ? tech : t)));
    });

    socket.on('technician:deleted', ({ id }) => {
      setTechnicians((prev) => prev.filter((t) => t.id !== id));
    });

    socket.on('request:created', (r) => {
      setRequests((prev) => [...prev, r]);
    });

    socket.on('request:updated', (r) => {
      setRequests((prev) => prev.map((rr) => (rr.id === r.id ? r : rr)));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleAddTechnician = async (name: string) => {
    if (!name) return;
    // create simple id and avatar
    const id = `t${Math.floor(Math.random() * 10000)}`;
    const avatar = name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
    const color = '#'+Math.floor(Math.random()*16777215).toString(16).padStart(6,'0');

    try {
      await fetch('/api/data/technicians', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name, avatar, color }),
      });
      // server will emit event and update clients — we don't need to update local state here
    } catch (err) {
      console.error('Failed to add technician', err);
    }
  };
  const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | undefined>();
  const [newRequestDate, setNewRequestDate] = useState<string>('');

  const handleUpdateStage = (requestId: string, newStage: MaintenanceStage) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === requestId ? { ...req, stage: newStage } : req))
    );
  };

  const handleSaveRequest = (request: Partial<MaintenanceRequest>) => {
    if (selectedRequest) {
      // Update existing request
      setRequests((prev) =>
        prev.map((req) =>
          req.id === selectedRequest.id ? { ...req, ...request } as MaintenanceRequest : req
        )
      );
    } else {
      // Create new request
      const newRequest: MaintenanceRequest = {
        id: `m${requests.length + 1}`,
        ...request,
      } as MaintenanceRequest;
      setRequests((prev) => [...prev, newRequest]);
    }
    setSelectedRequest(undefined);
    setActiveView('kanban');
  };

  const handleRequestClick = (request: MaintenanceRequest) => {
    setSelectedRequest(request);
    setActiveView('form');
  };

  const handleCreateRequestFromCalendar = (date: string) => {
    setNewRequestDate(date);
    setSelectedRequest(undefined);
    setActiveView('form');
  };

  const handleViewMaintenance = () => {
    setActiveView('kanban');
  };

  const getHeaderInfo = () => {
    switch (activeView) {
      case 'kanban':
        return {
          title: 'Maintenance Kanban Board',
          subtitle: 'Drag and drop maintenance requests to update their status',
        };
      case 'form':
        return {
          title: selectedRequest ? 'Edit Maintenance Request' : 'New Maintenance Request',
          subtitle: 'Fill in the details below to create or update a maintenance request',
        };
      case 'equipment':
        return {
          title: 'Equipment Details',
          subtitle: 'View and manage equipment information',
        };
      case 'calendar':
        return {
          title: 'Preventive Maintenance Calendar',
          subtitle: 'Schedule and view preventive maintenance activities',
        };
      default:
        return { title: 'GearGuard', subtitle: 'Maintenance Management System' };
    }
  };

  const handleLoginSubmit = (email: string, phone: string) => {
    setUserEmail(email);
    setUserPhone(phone);
    setAuthStep('verify');
  };

  const handleVerifySuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem('gearguard_authenticated', 'true');
  };

  const handleBackToLogin = () => {
    setAuthStep('login');
    setUserEmail('');
    setUserPhone('');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('gearguard_authenticated');
    setAuthStep('login');
    setUserEmail('');
    setUserPhone('');
  };

  // Show authentication screens if not authenticated
  if (!isAuthenticated) {
    if (authStep === 'login') {
      return <LoginPage onSubmit={handleLoginSubmit} />;
    } else {
      return (
        <VerificationPage
          email={userEmail}
          phone={userPhone}
          onVerify={handleVerifySuccess}
          onBack={handleBackToLogin}
        />
      );
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        activeView={activeView} 
        onViewChange={setActiveView}
        equipmentCount={equipment.length}
        maintenanceCount={requests.length}
      />
      
      <div className="flex-1 ml-64 flex flex-col">
  <Header {...getHeaderInfo()} onLogout={handleLogout} onAddTechnician={handleAddTechnician} />
        
        <main className="flex-1 overflow-auto p-8">
          {activeView === 'kanban' && (
            <>
              <StatsCards requests={requests} />
              <KanbanBoard
                requests={requests}
                technicians={technicians}
                onUpdateStage={handleUpdateStage}
                onRequestClick={handleRequestClick}
              />
            </>
          )}

          {activeView === 'form' && (
            <RequestForm
              equipment={equipment.filter((eq) => eq.status === 'active')}
              technicians={technicians}
              onSave={handleSaveRequest}
              onCancel={() => {
                setSelectedRequest(undefined);
                setNewRequestDate('');
                setActiveView('kanban');
              }}
              initialData={
                selectedRequest
                  ? selectedRequest
                  : newRequestDate
                  ? ({
                      scheduledDate: newRequestDate,
                      requestType: 'preventive',
                    } as any)
                  : undefined
              }
            />
          )}

          {activeView === 'equipment' && (
            <EquipmentDetail
              equipment={selectedEquipment}
              onBack={() => setActiveView('kanban')}
              onViewMaintenance={handleViewMaintenance}
            />
          )}

          {activeView === 'calendar' && (
            <CalendarView
              requests={requests}
              technicians={technicians}
              onCreateRequest={handleCreateRequestFromCalendar}
              onRequestClick={handleRequestClick}
            />
          )}
        </main>
      </div>
    </div>
  );
}