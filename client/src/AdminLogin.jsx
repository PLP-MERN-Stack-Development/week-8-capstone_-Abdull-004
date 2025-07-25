import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from './api';
import { useAuth } from './AuthContext';

export default function AdminLogin() {
    const { setUser, setToken } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await apiRequest('/admin/login', 'POST', { email, password });
            setToken(res.token);
            setUser(res.user);
            localStorage.setItem('token', res.token);
            localStorage.setItem('user', JSON.stringify(res.user));
            navigate('/admin');
        } catch (err) {
            if (err?.message?.includes('401') || err?.message?.includes('Unauthorized')) {
                setError('Invalid credentials. Please try again.');
            } else {
                setError(err.message || 'Login failed. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="w-full max-w-md p-6 rounded-xl shadow-lg bg-white border border-gray-200">
                <h2 className="text-2xl font-bold mb-4 text-center text-green-800">Admin Login</h2>

                {error && (
                    <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4" aria-label="Admin Login Form">
                    <div>
                        <label htmlFor="email" className="block mb-1 font-medium">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            autoComplete="email"
                            onChange={(e) => {
                                setEmail(e.target.value);
                                if (error) setError(null);
                            }}
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block mb-1 font-medium">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            autoComplete="current-password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                                if (error) setError(null);
                            }}
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 rounded font-semibold transition-colors ${loading
                                ? 'bg-green-400 cursor-not-allowed'
                                : 'bg-green-700 hover:bg-green-800 text-white'
                            }`}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
}
