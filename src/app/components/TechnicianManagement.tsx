import React, { useEffect, useState } from 'react';

export function TechnicianManagement() {
  const [techs, setTechs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    fetchList();
  }, []);

  async function fetchList() {
    setLoading(true);
    try {
      setError(null);
      const res = await fetch('/api/data/technicians');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setTechs(json || []);
    } catch (err: any) {
      console.error('Failed to load technicians', err);
      setError(err?.message || 'Failed to load technicians');
      setTechs([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(e?: React.FormEvent) {
    e?.preventDefault();
    if (!newName.trim()) return;
    const id = `t${Math.floor(Math.random() * 100000)}`;
    const avatar = newName
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
        body: JSON.stringify({ id, name: newName, avatar, color }),
      });
      setNewName('');
      setShowAdd(false);
      fetchList();
    } catch (err) {
      console.error(err);
      alert('Failed to add technician');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this technician?')) return;
    try {
      await fetch(`/api/data/technicians/${id}`, { method: 'DELETE' });
      setTechs((t) => t.filter((x) => x.id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete');
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Technician Management</h2>
        <div>
          <button onClick={() => setShowAdd(true)} className="px-3 py-2 bg-sky-600 text-white rounded">Add Technician</button>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-4 shadow-sm">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : techs.length === 0 ? (
          <div className="text-gray-600">No technicians found.</div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="pb-2">ID</th>
                <th className="pb-2">Name</th>
                <th className="pb-2">Avatar</th>
                <th className="pb-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {techs.map((t) => (
                <tr key={t.id} className="border-t">
                  <td className="py-2">{t.id}</td>
                  <td className="py-2">{t.name}</td>
                  <td className="py-2">{t.avatar}</td>
                  <td className="py-2">
                    <button onClick={() => handleDelete(t.id)} className="text-red-600">Delete</button>
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
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">Add Technician</h3>
            <form onSubmit={handleCreate}>
              <label className="block text-sm font-medium text-gray-700">Full name</label>
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="mt-1 block w-full rounded border px-3 py-2"
                placeholder="e.g. Rahul Kumar"
              />
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

export default TechnicianManagement;
