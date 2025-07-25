import { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { apiRequest } from './api';

/* ⬇️  Cloudinary settings for image uploads */
const CLOUDINARY_UPLOAD_PRESET = 'market-hub-unsigned';
const CLOUDINARY_CLOUD_NAME = 'dwtxstchf';

export default function AdminDashboard() {
    const { user, token, logout } = useAuth();

    /* state */
    const [tab, setTab] = useState('overview');  // overview | products | orders
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /* product‑form state */
    const emptyForm = { name: '', price: '', image: '', category: '', description: '', location: '' };
    const [form, setForm] = useState(emptyForm);
    const [editingId, setEdit] = useState(null);          // null = add  | id = edit
    const [imgBusy, setImgBusy] = useState(false);         // Cloudinary upload spinner
    const [formBusy, setFormBusy] = useState(false);       // Add / update spinner
    const [formMsg, setFormMsg] = useState(null);        // success | fail message

    /* initial load */
    useEffect(() => {
        if (user?.isAdmin) fetchAll();
    }, [user]);

    /** ─────────────────────────────────────────────
     * Fetch orders + products in parallel
     * ────────────────────────────────────────────*/
    const fetchAll = async () => {
        setLoading(true);
        try {
            const [ordersRes, productsRes] = await Promise.all([
                apiRequest('/orders', 'GET', null, token),
                apiRequest('/products', 'GET', null, token),
            ]);
            setOrders(ordersRes);
            setProducts(productsRes);
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    /** ─────────────────────────────────────────────
     * IMAGE UPLOAD  →  Cloudinary
     * ────────────────────────────────────────────*/
    const uploadImg = async (file) => {
        if (!file) return;
        setImgBusy(true);
        try {
            const fd = new FormData();
            fd.append('file', file);
            fd.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
            const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, { method: 'POST', body: fd });
            const data = await res.json();
            if (data.secure_url) setForm(f => ({ ...f, image: data.secure_url }));
            else throw new Error('Image upload failed');
        } catch {
            alert('Image upload failed. Try again.');
        }
        setImgBusy(false);
    };

    /** ─────────────────────────────────────────────
     * ADD / UPDATE  product
     * ────────────────────────────────────────────*/
    const saveProduct = async (e) => {
        e.preventDefault();
        setFormBusy(true);
        setFormMsg(null);
        try {
            if (editingId) {
                /* update */
                await apiRequest(`/products/${editingId}`, 'PUT', form, token);
                setFormMsg('Product updated ✔');
            } else {
                /* add    */
                await apiRequest('/products', 'POST', form, token);
                setFormMsg('Product added ✔');
            }
            /* refresh list */
            fetchAll();
            /* reset */
            setForm(emptyForm);
            setEdit(null);
        } catch (err) {
            setFormMsg(err.message);
        }
        setFormBusy(false);
    };

    /** ─────────────────────────────────────────────
     * DELETE product
     * ────────────────────────────────────────────*/
    const delProduct = async (id) => {
        if (!window.confirm('Delete this product?')) return;
        try {
            await apiRequest(`/products/${id}`, 'DELETE', null, token);
            fetchAll();
        } catch (err) {
            alert(err.message);
        }
    };

    /** ─────────────────────────────────────────────
     * RENDER
     * ────────────────────────────────────────────*/
    if (!user?.isAdmin) {
        return <div className="text-center mt-10 text-red-600 font-semibold">Access denied. Admins only.</div>;
    }

    if (loading) return <div className="p-8 text-center">Loading dashboard…</div>;
    if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

    /* ⬇️  metrics for Overview */
    const totalSales = orders.filter(o => o.paymentStatus === 'paid')
        .reduce((sum, o) => sum + o.items.reduce((s, i) => s + i.price * i.quantity, 0), 0);
    const totalOrders = orders.length;
    const totalProds = products.length;

    /* helper for pretty money */
    const money = (n) => n.toLocaleString();

    return (
        <div className="max-w-7xl mx-auto p-6">
            {/* header */}
            <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
                <h1 className="text-3xl font-bold text-green-800">Admin Dashboard</h1>
                <button onClick={logout} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
                    Logout
                </button>
            </div>

            {/* nav tabs */}
            <div className="flex gap-2 mb-6">
                {['overview', 'products', 'orders'].map(t => (
                    <button key={t}
                        className={`px-4 py-2 rounded font-semibold capitalize ${tab === t ? 'bg-green-700 text-white' : 'bg-gray-200 text-gray-700'
                            }`}
                        onClick={() => setTab(t)}
                    >{t}</button>
                ))}
            </div>

            {/* -------- OVERVIEW TAB -------- */}
            {tab === 'overview' && (
                <div className="grid md:grid-cols-3 gap-6">
                    {/* metrics cards */}
                    <div className="bg-white shadow rounded p-6">
                        <h3 className="text-lg font-semibold text-gray-600">Total Sales (paid)</h3>
                        <p className="text-2xl font-bold text-green-700 mt-2">Ksh {money(totalSales)}</p>
                    </div>
                    <div className="bg-white shadow rounded p-6">
                        <h3 className="text-lg font-semibold text-gray-600">Total Orders</h3>
                        <p className="text-2xl font-bold text-green-700 mt-2">{totalOrders}</p>
                    </div>
                    <div className="bg-white shadow rounded p-6">
                        <h3 className="text-lg font-semibold text-gray-600">Products Listed</h3>
                        <p className="text-2xl font-bold text-green-700 mt-2">{totalProds}</p>
                    </div>

                    {/* recent orders */}
                    <div className="md:col-span-2 bg-white shadow rounded p-6">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">Recent Orders</h2>
                        <div className="max-h-72 overflow-y-auto divide-y">
                            {orders.slice(0, 8).map(o => (
                                <div key={o._id} className="py-3 flex justify-between text-sm">
                                    <div>#{o._id.slice(-6).toUpperCase()}</div>
                                    <div>{new Date(o.createdAt).toLocaleDateString()}</div>
                                    <div className={`${o.paymentStatus === 'paid' ? 'text-green-700' : 'text-red-600'}`}>{o.paymentStatus}</div>
                                    <div>Ksh {money(o.items.reduce((s, i) => s + i.price * i.quantity, 0))}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* -------- PRODUCTS TAB -------- */}
            {tab === 'products' && (
                <div className="grid md:grid-cols-3 gap-6">
                    {/* product form */}
                    <div className="bg-white shadow rounded p-6">
                        <h2 className="text-lg font-semibold mb-4">{editingId ? 'Edit Product' : 'Add Product'}</h2>
                        {formMsg && <div className="mb-3 text-center text-green-700">{formMsg}</div>}
                        <form onSubmit={saveProduct} className="space-y-3">
                            <input className="w-full border rounded px-3 py-2" placeholder="Name" name="name" value={form.name} onChange={e => setForm({ ...form, [e.target.name]: e.target.value })} required />
                            <input className="w-full border rounded px-3 py-2" placeholder="Price" name="price" value={form.price} onChange={e => setForm({ ...form, [e.target.name]: e.target.value })} required />
                            <input className="w-full border rounded px-3 py-2" placeholder="Category" name="category" value={form.category} onChange={e => setForm({ ...form, [e.target.name]: e.target.value })} />
                            <input className="w-full border rounded px-3 py-2" placeholder="Location" name="location" value={form.location} onChange={e => setForm({ ...form, [e.target.name]: e.target.value })} />
                            <textarea className="w-full border rounded px-3 py-2" placeholder="Description"
                                name="description" value={form.description}
                                onChange={e => setForm({ ...form, [e.target.name]: e.target.value })} />
                            {/* image uploader */}
                            <div className="flex items-center gap-3">
                                <input type="file" accept="image/*" onChange={e => uploadImg(e.target.files[0])} />
                                {imgBusy && <span className="text-xs">Uploading…</span>}
                            </div>
                            {form.image && <img src={form.image} alt="preview" className="w-20 h-20 object-cover rounded border" />}
                            <div className="flex gap-2">
                                <button type="submit" disabled={formBusy}
                                    className={`flex-1 py-2 rounded text-white font-semibold ${formBusy ? 'bg-green-400' : 'bg-green-700 hover:bg-green-800'}`}>
                                    {formBusy ? 'Saving…' : editingId ? 'Update' : 'Add'}
                                </button>
                                {editingId && (
                                    <button type="button" onClick={() => { setEdit(null); setForm(emptyForm); }}
                                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded font-semibold">Cancel</button>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* product list */}
                    <div className="md:col-span-2 bg-white shadow rounded p-6 overflow-x-auto">
                        <h2 className="text-lg font-semibold mb-4">Products</h2>
                        <table className="min-w-full text-sm">
                            <thead>
                                <tr className="text-left bg-gray-50">
                                    <th className="p-2">Image</th><th className="p-2">Name</th><th className="p-2">Price</th>
                                    <th className="p-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(p => (
                                    <tr key={p._id} className="border-t">
                                        <td className="p-2"><img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded" /></td>
                                        <td className="p-2">{p.name}</td>
                                        <td className="p-2">Ksh {money(p.price)}</td>
                                        <td className="p-2 space-x-2">
                                            <button onClick={() => { setEdit(p._id); setForm({ ...p }); }}
                                                className="text-blue-600 hover:underline">Edit</button>
                                            <button onClick={() => delProduct(p._id)}
                                                className="text-red-600 hover:underline">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* -------- ORDERS TAB -------- */}
            {tab === 'orders' && (
                <div className="bg-white shadow rounded p-6 overflow-x-auto">
                    <h2 className="text-lg font-semibold mb-4">All Orders</h2>
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr className="text-left bg-gray-50">
                                <th className="p-2">#ID</th><th className="p-2">Date</th>
                                <th className="p-2">Customer</th><th className="p-2">Total (Ksh)</th>
                                <th className="p-2">Payment</th><th className="p-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(o => (
                                <tr key={o._id} className="border-t">
                                    <td className="p-2">#{o._id.slice(-6).toUpperCase()}</td>
                                    <td className="p-2">{new Date(o.createdAt).toLocaleDateString()}</td>
                                    <td className="p-2">{o.customerName}</td>
                                    <td className="p-2">{money(o.items.reduce((s, i) => s + i.price * i.quantity, 0))}</td>
                                    <td className={`p-2 ${o.paymentStatus === 'paid' ? 'text-green-700' : 'text-red-600'}`}>{o.paymentStatus}</td>
                                    <td className="p-2">{o.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
