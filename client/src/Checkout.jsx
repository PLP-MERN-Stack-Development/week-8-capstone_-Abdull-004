import { useState } from 'react';
import { useCart } from './CartContext';
import { apiRequest } from './api';

export default function Checkout() {
    const { cartItems, clearCart } = useCart();
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        address: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (cartItems.length === 0) {
            setError('Your cart is empty.');
            return;
        }

        const { fullName, phoneNumber, address } = formData;
        if (!fullName || !phoneNumber || !address) {
            setError('Please fill all fields');
            return;
        }

        try {
            setLoading(true);

            const response = await apiRequest('/orders', 'POST', {
                customer: fullName,
                phone: phoneNumber,
                address,
                items: cartItems,
            });

            if (response.success) {
                setSuccess('Order placed successfully. Await M-Pesa prompt.');
                clearCart(); // clear only after success
            } else {
                setError(response.message || 'Order failed');
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg mt-10">
            <h2 className="text-2xl font-bold mb-4 text-green-800">Checkout</h2>

            {error && <div className="bg-red-100 text-red-800 px-4 py-2 rounded mb-4">{error}</div>}
            {success && <div className="bg-green-100 text-green-800 px-4 py-2 rounded mb-4">{success}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    className="w-full px-4 py-2 border rounded"
                    value={formData.fullName}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    className="w-full px-4 py-2 border rounded"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Delivery Address"
                    className="w-full px-4 py-2 border rounded"
                    value={formData.address}
                    onChange={handleChange}
                />

                <button
                    type="submit"
                    className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800"
                    disabled={loading}
                >
                    {loading ? 'Processing...' : 'Place Order'}
                </button>
            </form>
        </div>
    );
}
