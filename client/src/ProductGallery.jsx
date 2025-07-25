import { useEffect, useState } from 'react';
import { apiRequest } from './api';
import { useNavigate } from 'react-router-dom';

export default function ProductGallery() {
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const navigate = useNavigate();

    const categories = ['All', 'Crops', 'Livestock', 'Services', 'Tools/Inputs'];

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        filterProducts();
    }, [search, category, products]);

    const fetchProducts = async () => {
        setLoading(true); setError(null);
        try {
            const res = await apiRequest('/products');
            setProducts(res);
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    const filterProducts = () => {
        let result = [...products];
        if (category !== 'All') {
            result = result.filter(p => p.category === category);
        }
        if (search.trim()) {
            result = result.filter(p =>
                p.name.toLowerCase().includes(search.toLowerCase())
            );
        }
        setFiltered(result);
    };

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h2 className="text-3xl font-extrabold text-green-800 mb-6 text-center">Available Products</h2>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search product name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border px-4 py-2 rounded w-full sm:w-1/2"
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border px-4 py-2 rounded w-full sm:w-1/3"
                >
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            {/* Status */}
            {loading && <div className="text-center text-gray-500">Loading products...</div>}
            {error && <div className="text-center text-red-600">{error}</div>}
            {!loading && filtered.length === 0 && (
                <div className="text-center text-gray-500">No products found.</div>
            )}

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(product => (
                    <div
                        key={product._id}
                        onClick={() => navigate(`/product/${product._id}`)}
                        className="bg-white rounded-xl shadow-lg p-5 flex flex-col cursor-pointer hover:shadow-2xl border border-gray-100 transition"
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-40 object-cover rounded mb-2"
                        />
                        <h3 className="text-lg font-bold text-green-800 mb-1">{product.name}</h3>
                        <div className="text-gray-700 mb-1">Ksh {product.price}</div>
                        <div className="text-sm text-gray-500 mb-1">Category: {product.category}</div>
                        <div className="text-sm text-gray-500 mb-2">
                            {product.description.length > 60
                                ? product.description.slice(0, 60) + '...'
                                : product.description}
                        </div>
                        {product.stock === 0 && (
                            <span className="inline-block bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-semibold self-start">
                                Out of Stock
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
