import { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { apiRequest } from './api';

export default function Account() {
    const { user, login, logout, token } = useAuth();
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (user && !user.isAdmin) fetchOrders();
        // eslint-disable-next-line
    }, [user]);

    const fetchOrders = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await apiRequest('/orders/my', 'GET', null, token);
            setOrders(res);
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    const handleChange = (e) => {
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const ok = await login(form.email, form.password);
        if (!ok) setError('Invalid credentials');
        setLoading(false);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await apiRequest('/auth/register', 'POST', {
                name: form.name,
                email: form.email,
                password: form.password,
                role: 'customer',
            });
            const ok = await login(form.email, form.password);
            if (!ok) setError('Registered but login failed');
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    if (!user) {
        return (
            <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8">
                <h2 className="text-2xl font-bold mb-4 text-green-800">Account</h2>
                <div className="flex justify-center mb-4">
                    <button
                        className={`px-4 py-2 rounded-l font-semibold ${isLogin ? 'bg-green-700 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => {
                            setIsLogin(true);
                            setError(null);
                        }}
                    >
                        Login
                    </button>
                    <button
                        className={`px-4 py-2 rounded-r font-semibold ${!isLogin ? 'bg-green-700 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => {
                            setIsLogin(false);
                            setError(null);
                        }}
                    >
                        Register
                    </button>
                </div>

                {isLogin ? (
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block mb-1 font-medium">Email</label>
                            <input
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Password</label>
                            <input
                                name="password"
                                type="password"
                                value={form.password}
                                onChange={handleChange}
                                required
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-green-700 text-white py-2 rounded font-semibold"
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                        {error && <div className="text-red-600 text-center mt-2">{error}</div>}
                    </form>
                ) : (
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div>
                            <label className="block mb-1 font-medium">Name</label>
                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Email</label>
                            <input
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Password</label>
                            <input
                                name="password"
                                type="password"
                                value={form.password}
                                onChange={handleChange}
                                required
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-green-700 text-white py-2 rounded font-semibold"
                            disabled={loading}
                        >
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                        {error && <div className="text-red-600 text-center mt-2">{error}</div>}
                    </form>
                )}
            </div>
        );
    }

    /* …top‑of‑file unchanged… */

    if (user.isAdmin) {
        return (
            <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8 text-center">
                <h2 className="text-2xl font-bold mb-4 text-green-800">Admin Account</h2>
                <div className="mb-2">Email: {user.email}</div>
                <div className="flex justify-center gap-3 mt-4">
                    <button
                        onClick={() => navigate('/admin')}
                        className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded"
                    >
                        Go to Dashboard
                    </button>
                    <button
                        onClick={logout}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded"
                    >
                        Logout
                    </button>
                </div>
            </div>
        );
    }

    /* …rest‑of‑file unchanged… */


    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6 text-green-800">My Account</h2>
            <div className="bg-white rounded shadow p-4 mb-6">
                <div className="mb-2 font-semibold">Email: {user.email}</div>
                <button onClick={logout} className="mt-2 bg-red-700 text-white px-6 py-2 rounded">Logout</button>
            </div>

            <h3 className="text-lg font-semibold mb-4">My Orders</h3>

            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div className="text-red-600">{error}</div>
            ) : (
                <div className="space-y-6">
                    {orders.length === 0 ? (
                        <div className="text-gray-500">No orders yet.</div>
                    ) : (
                        orders.map((order) => (
                            <div key={order._id} className="bg-white rounded shadow p-4 border border-gray-100">
                                <div className="font-bold text-lg mb-2">
                                    Order #{order._id.slice(-6).toUpperCase()}
                                </div>
                                <div className="mb-2 flex gap-4 items-center">
                                    <span className="font-semibold">Status:</span>
                                    <span className="inline-block px-2 py-1 rounded bg-yellow-100 text-yellow-800 text-xs">{order.status}</span>
                                    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${order.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {order.paymentStatus === 'paid' ? 'Paid' : 'Pending Payment'}
                                    </span>
                                </div>
                                <div className="mb-2 font-semibold">Items:</div>
                                <ul className="ml-4 list-disc">
                                    {order.items.map((item) => (
                                        <li key={item.product} className="flex items-center gap-2 mb-1">
                                            <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded" />
                                            <span>{item.name}</span> x <span>{item.quantity}</span> @ Ksh {item.price}
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-2 text-right font-bold">
                                    Total: Ksh {order.items.reduce((sum, i) => sum + i.price * i.quantity, 0)}
                                </div>
                                <div className="text-xs text-gray-400 mt-1">
                                    Placed: {new Date(order.createdAt).toLocaleString()}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
