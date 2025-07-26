import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiRequest } from './api';
import { useCart } from './CartContext';

export default function ProductDetails() {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [added, setAdded] = useState(false);

    useEffect(() => {
        fetchProduct();
        // eslint-disable-next-line
    }, [id]);

    const fetchProduct = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await apiRequest(`/products/${id}`);
            setProduct(res);
        } catch (err) {
            setError(err.message || 'Failed to load product');
        }
        setLoading(false);
    };

    const handleAddToCart = () => {
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000); // reset after 2s
    };

    if (loading) return <div className="text-center py-10 text-gray-600">Loading product...</div>;
    if (error) return <div className="text-center text-red-600 py-10">{error}</div>;
    if (!product) return <div className="text-center py-10">Product not found.</div>;

    return (
        <div className="max-w-2xl mx-auto p-6 mt-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover rounded mb-6"
            />
            <h2 className="text-3xl font-bold text-green-800 mb-2">{product.name}</h2>
            <p className="text-xl text-gray-700 mb-1">Ksh {product.price.toLocaleString()}</p>
            <p className="mb-1 text-sm text-gray-600">Category: <span className="font-medium">{product.category}</span></p>
            <p className="mb-4 text-sm text-gray-600">In Stock: <span className="font-medium">{product.stock}</span></p>
            <p className="text-gray-700 mb-6">{product.description}</p>

            <button
                onClick={handleAddToCart}
                disabled={added || product.stock === 0}
                className={`px-6 py-2 rounded font-semibold transition ${product.stock === 0
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : added
                            ? 'bg-green-500 text-white'
                            : 'bg-green-700 hover:bg-green-800 text-white'
                    }`}
            >
                {product.stock === 0
                    ? 'Out of Stock'
                    : added
                        ? 'Added to Cart'
                        : 'Add to Cart'}
            </button>
        </div>
    );
}
