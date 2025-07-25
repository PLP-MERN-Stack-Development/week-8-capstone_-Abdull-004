import { useState, useMemo } from 'react';
import { useCart } from './CartContext';
import { apiRequest } from './api';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
    const { cart, clearCart } = useCart();
    const navigate = useNavigate();

    const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [orderId, setOrderId] = useState(null);
    const [mpesaPhone, setMpesaPhone] = useState('');
    const [mpesaStatus, setMpesaStatus] = useState(null);
    const [mpesaLoading, setMpesaLoading] = useState(false);

    const total = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);
    const money = (n) => n.toLocaleString();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const res = await apiRequest('/orders', 'POST', {
                items: cart.map(item => ({
                    product: item._id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.image,
                })),
                customerName: form.name,
                customerEmail: form.email,
                customerPhone: form.phone,
                customerAddress: form.address,
            });
            setOrderId(res._id);
            clearCart();
        } catch (err) {
            setError(err.message || 'Failed to place order');
        }
        setLoading(false);
    };

    const handleMpesaPay = async (e) => {
        e.preventDefault();
        setMpesaLoading(true);
        setMpesaStatus(null);
        try {
            await apiRequest('/payments/simulate', 'POST', {
                orderId,
                phone: mpesaPhone,
            });
            setMpesaStatus('success');
        } catch {
            setMpesaStatus('fail');
        }
        setMpesaLoading(false);
    };

    // M-Pesa payment screen
    if (orderId && !mpesaStatus) {
        return (
            <div className="max-w-xl mx-auto p-6 text-center">
                <h2 className="text-2xl font-bold text-green-700 mb-4">Order Placed!</h2>
                <p className="mb-6 text-gray-700">To complete your order, enter your M-Pesa number below.</p>

                <form onSubmit={handleMpesaPay} className="space-y-4 max-w-xs mx-auto">
                    <div>
                        <label className="block mb-1 font-medium">M-Pesa Phone Number</label>
                        <input
                            type="tel"
                            value={mpesaPhone}
                            onChange={(e) => setMpesaPhone(e.target.value)}
                            required
                            placeholder="07XXXXXXXX"
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={mpesaLoading}
                        className="w-full bg-green-700 text-white py-2 rounded font-semibold hover:bg-green-800"
                    >
                        {mpesaLoading ? 'Processing…' : 'Pay with M-Pesa'}
                    </button>
                </form>

                {mpesaStatus === 'fail' && (
                    <div className="text-red-600 mt-4">Payment failed. Please try again.</div>
                )}
            </div>
        );
    }

    // M-Pesa success screen
    if (orderId && mpesaStatus === 'success') {
        return (
            <div className="max-w-xl mx-auto p-6 text-center">
                <h2 className="text-2xl font-bold text-green-700 mb-4">Payment Successful!</h2>
                <p className="mb-6 text-gray-700">Thank you for your order. We’ll contact you soon.</p>
                <button
                    onClick={() => navigate('/')}
                    className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded"
                >
                    Back to Products
                </button>
            </div>
        );
    }

    // Checkout form
    return (
        <div className="max-w-xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6 text-green-800">Checkout</h2>

            {cart.length === 0 ? (
                <div className="text-center text-gray-500">Your cart is empty.</div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
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
                        <label className="block mb-1 font-medium">Phone</label>
                        <input
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            required
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Address</label>
                        <input
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            required
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>

                    <div className="flex justify-between items-center mt-4">
                        <div className="font-bold text-lg">Total: Ksh {money(total)}</div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 font-semibold"
                        >
                            {loading ? 'Placing Order…' : 'Place Order'}
                        </button>
                    </div>

                    {error && <div className="text-red-600 text-center mt-2">{error}</div>}
                </form>
            )}
        </div>
    );
}
