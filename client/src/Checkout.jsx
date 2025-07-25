import React, { useState } from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const { cartItems, clearCart } = useCart();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

    const handlePayment = async () => {
        if (!phoneNumber || cartItems.length === 0) {
            setMessage('Please enter a phone number and ensure your cart is not empty.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/mpesa/stkpush', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    phone: phoneNumber,
                    amount: totalPrice
                })
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Payment initiated successfully!');
                clearCart();
                setTimeout(() => navigate('/'), 2000);
            } else {
                setMessage(data.message || 'Payment failed');
            }
        } catch (error) {
            console.error(error);
            setMessage('Error initiating payment.');
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-4 bg-white shadow rounded">
            <h1 className="text-2xl font-bold mb-4">Checkout</h1>

            {cartItems.length === 0 ? (
                <p className="text-red-500">Your cart is empty.</p>
            ) : (
                <>
                    <ul className="mb-4">
                        {cartItems.map((item, index) => (
                            <li key={index} className="border-b py-2 flex justify-between">
                                <span>{item.name}</span>
                                <span>KES {item.price}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="font-semibold mb-4">Total: KES {totalPrice}</p>

                    <input
                        type="tel"
                        placeholder="Enter Safaricom phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full p-2 border rounded mb-4"
                    />

                    <button
                        onClick={handlePayment}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
                    >
                        Pay with M-Pesa
                    </button>
                </>
            )}

            {message && <p className="mt-4 text-blue-600">{message}</p>}
        </div>
    );
};

export default Checkout;
