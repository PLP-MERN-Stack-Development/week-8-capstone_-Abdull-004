import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';

export default function Cart() {
    const { cart, updateQuantity, removeFromCart } = useCart();
    const navigate = useNavigate();

    const total = useMemo(() =>
        cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
        [cart]
    );

    const handleQuantityChange = (id, value) => {
        const newQty = Math.max(1, Number(value));
        updateQuantity(id, newQty);
    };

    const handleRemove = (id) => {
        if (window.confirm('Remove this item from your cart?')) {
            removeFromCart(id);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6 text-green-800">Your Cart</h2>

            {cart.length === 0 ? (
                <div className="text-center text-gray-500">Your cart is empty.</div>
            ) : (
                <>
                    <div className="space-y-4 mb-6">
                        {cart.map(item => (
                            <div key={item._id} className="flex flex-col sm:flex-row items-center gap-4 bg-white rounded shadow p-4 border border-gray-100">
                                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
                                <div className="flex-1 w-full">
                                    <div className="font-bold text-lg text-green-800">{item.name}</div>
                                    <div className="text-gray-700 mb-2">Ksh {item.price}</div>
                                    <div className="flex items-center gap-2">
                                        <label htmlFor={`qty-${item._id}`} className="text-sm">Qty:</label>
                                        <input
                                            id={`qty-${item._id}`}
                                            type="number"
                                            min={1}
                                            value={item.quantity}
                                            onChange={e => handleQuantityChange(item._id, e.target.value)}
                                            className="w-20 border rounded px-2 py-1"
                                        />
                                    </div>
                                </div>
                                <button
                                    className="bg-red-700 text-white px-3 py-1 rounded hover:bg-red-800 font-semibold"
                                    onClick={() => handleRemove(item._id)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                        <div className="text-xl font-bold mb-4 sm:mb-0">Total: Ksh {total.toLocaleString()}</div>
                        <button
                            className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 font-semibold"
                            onClick={() => navigate('/checkout')}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
