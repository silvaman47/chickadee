import { useState, useEffect } from 'react';

export default function Profile({ token }) {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ email: '', name: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true); // Start loading
      try {
        const response = await fetch('http://localhost:5000/api/auth/me', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        });
        const data = await response.json();
        if (response.ok) {
          setUser(data);
          setFormData({ email: data.email, name: data.name || '' });
        } else {
          setError(data.msg);
        }
      } catch (err) {
        setError('Failed to load profile');
      } finally {
        setLoading(false); // End loading
      }
    };

    if (token) fetchUser();
  }, [token]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading for save
    try {
      const response = await fetch('http://localhost:5000/api/auth/me', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        setEditMode(false);
        alert('Profile updated successfully!');
      } else {
        setError(data.msg);
      }
    } catch (err) {
      setError('Failed to update profile');
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) return <div className="p-8 text-center"><div className="loading-spinner"></div></div>;
  if (error) return <p className="p-8 text-red-600">{error}</p>;
  if (!user) return <p className="p-8">Please log in to view your profile.</p>;

  return (
    <section className="p-8 bg-black">
      <h2 className="text-2xl mb-4">Your Profile</h2>
      {editMode ? (
        <form onSubmit={handleSave} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="bg-gray-800 p-3 w-full rounded text-white placeholder-gray-400"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="bg-gray-800 p-3 w-full rounded text-white placeholder-gray-400"
            required
          />
          <button type="submit" className="bg-red-800 p-3 w-full rounded text-white">Save Changes</button>
          <button type="button" onClick={() => setEditMode(false)} className="bg-gray-600 p-3 w-full rounded text-white mt-2">Cancel</button>
        </form>
      ) : (
        <div className="bg-gray-900 p-4 rounded">
          <p><strong>Name:</strong> {user.name || 'Not set'}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button onClick={handleEdit} className="bg-red-800 px-4 py-2 mt-4 rounded">Edit Profile</button>
        </div>
      )}
    </section>
  );
}