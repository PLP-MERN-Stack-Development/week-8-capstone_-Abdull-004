import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from './api';

export default function Register() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        location: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            // Register all users with the role "customer"
            await apiRequest('/auth/register', 'POST', { ...form, role: 'customer' });
            setSuccess(true);
            setTimeout(() => navigate('/login'), 1500);
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-6 text-center text-green-800">Create Account</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block mb-1 font-medium">Full Name</label>
                    <input
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block mb-1 font-medium">Email Address</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block mb-1 font-medium">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        minLength={6}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
                <div>
                    <label htmlFor="location" className="block mb-1 font-medium">Location (optional)</label>
                    <input
                        id="location"
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 font-semibold transition"
                >
                    {loading ? 'Registering...' : 'Register'}
                </button>
                {error && <div className="text-red-600 text-center">{error}</div>}
                {success && <div className="text-green-600 text-center">Registration successful! Redirecting...</div>}
            </form>
            <div className="text-sm text-center mt-4">
                Already have an account?{' '}
                <span
                    className="text-green-700 font-semibold cursor-pointer hover:underline"
                    onClick={() => navigate('/login')}
                >
                    Login here
                </span>
            </div>
        </div>
    );
}
