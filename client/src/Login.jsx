import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function Login() {
    const { login } = useAuth();
    const [form, setForm] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = e => {
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const success = await login(form.email, form.password);
        if (success) {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser?.isAdmin) {
                navigate('/admin');
            } else {
                navigate('/account');
            }
        } else {
            setError('Invalid credentials');
        }

        setLoading(false);
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8">
            <h2 className="text-2xl font-bold mb-4 text-green-800">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Email</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Password</label>
                    <input name="password" type="password" value={form.password} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
                </div>
                <button type="submit" className="w-full bg-green-700 text-white py-2 rounded font-semibold" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                {error && <div className="text-red-600 text-center mt-2">{error}</div>}
            </form>
            <div className="text-center mt-4 text-sm">
                Don&apos;t have an account? <span className="text-green-700 cursor-pointer" onClick={() => navigate('/register')}>Register</span>
            </div>
        </div>
    );
}
