import React, { useEffect, useState } from 'react';

interface EquipmentManagementProps {
  onViewEquipment?: (eq: any) => void;
}

export function EquipmentManagement({ onViewEquipment }: EquipmentManagementProps) {
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({
    name: '',
    serial: '',
    department: '',
    location: '',
    floor: '',
    warrantyExpiry: '',
    status: 'active',
  });

  useEffect(() => {
    fetchList();
  }, []);

  async function fetchList() {
    setLoading(true);
    try {
      setError(null);
      const res = await fetch('/api/data/equipment');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setList(json || []);
    } catch (err) {
      console.error('Failed to load equipment', err);
      setError((err as any)?.message || 'Failed to load equipment');
      setList([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(e?: React.FormEvent) {
    e?.preventDefault();
    if (!form.name.trim()) return;
    const id = `eq${Math.floor(Math.random() * 100000)}`;
    try {
      await fetch('/api/data/equipment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...form }),
      });
      setForm({ name: '', serial: '', department: '', location: '', floor: '', warrantyExpiry: '', status: 'active' });
      setShowAdd(false);
      fetchList();
    } catch (err) {
      console.error(err);
      alert('Failed to create equipment');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete equipment?')) return;
    try {
      await fetch(`/api/data/equipment/${id}`, { method: 'DELETE' });
      setList((l) => l.filter((x) => x.id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete');
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Equipment Management</h2>
        <div>
          <button onClick={() => setShowAdd(true)} className="px-3 py-2 bg-sky-600 text-white rounded">Add Equipment</button>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-4 shadow-sm">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : list.length === 0 ? (
          <div className="text-gray-600">No equipment found.</div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="pb-2">ID</th>
                <th className="pb-2">Name</th>
                <th className="pb-2">Location</th>
                <th className="pb-2">Floor</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((e) => (
                <tr key={e.id} className="border-t">
                  <td className="py-2">{e.id}</td>
                  <td className="py-2">
                    <button className="text-sky-600" onClick={() => onViewEquipment ? onViewEquipment(e) : null}>
                      {e.name}
                    </button>
                  </td>
                  <td className="py-2">{e.location}</td>
                  <td className="py-2">{e.floor || '-'}</td>
                  <td className="py-2">{e.status}</td>
                  <td className="py-2">
                    <button onClick={() => handleDelete(e.id)} className="text-red-600">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h3 className="text-lg font-medium mb-4">Add Equipment</h3>
            <form onSubmit={handleCreate} className="grid grid-cols-1 gap-3">
              <label className="text-sm font-medium">Name</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded border px-3 py-2" />

              <label className="text-sm font-medium">Serial</label>
              <input value={form.serial} onChange={(e) => setForm({ ...form, serial: e.target.value })} className="rounded border px-3 py-2" />

              <label className="text-sm font-medium">Department</label>
              <input value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} className="rounded border px-3 py-2" />

              <label className="text-sm font-medium">Location</label>
              <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="rounded border px-3 py-2" />

              <label className="text-sm font-medium">Floor</label>
              <input value={form.floor} onChange={(e) => setForm({ ...form, floor: e.target.value })} className="rounded border px-3 py-2" />

              <label className="text-sm font-medium">Warranty expiry (YYYY-MM-DD)</label>
              <input value={form.warrantyExpiry} onChange={(e) => setForm({ ...form, warrantyExpiry: e.target.value })} className="rounded border px-3 py-2" />

              <div className="mt-4 flex justify-end gap-2">
                <button type="button" onClick={() => setShowAdd(false)} className="px-3 py-2 bg-gray-200 rounded">Cancel</button>
                <button type="submit" className="px-3 py-2 bg-sky-600 text-white rounded">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default EquipmentManagement;
