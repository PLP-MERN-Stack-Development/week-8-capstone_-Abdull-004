import { useState } from 'react';

function Footer() {
    return (
        <footer className="mt-16 bg-green-800 text-white py-8 text-center rounded-t-3xl shadow-inner">
            <div className="max-w-4xl mx-auto px-4">
                <div className="mb-2 font-bold text-lg">Farmcare Agrovet Online Store</div>
                <div className="mb-2">Empowering farmers and communities in Northern Kenya</div>
                <div className="text-sm text-green-100">&copy; {new Date().getFullYear()} Farmcare Agrovet. All rights reserved.</div>
            </div>
        </footer>
    );
}

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can send this to a backend or email service here
        console.log('Contact form submitted:', form);
        setSubmitted(true);
        setForm({ name: '', email: '', message: '' });
    };

    return (
        <div className="bg-gradient-to-br from-green-50 via-white to-green-100 min-h-screen pb-16">
            {/* Hero Section */}
            <section className="py-16 bg-gradient-to-r from-green-700 to-green-400 text-white shadow-xl rounded-b-3xl">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">Contact Us</h1>
                    <p className="text-xl font-medium mb-6 max-w-2xl mx-auto drop-shadow">
                        We’re here to help! Reach out for product inquiries, service bookings, or general support.
                    </p>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="max-w-4xl mx-auto px-4 mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center">
                    <span className="text-3xl mb-2">📧</span>
                    <div className="font-bold text-green-800 mb-1">Email</div>
                    <div className="text-gray-700">info@farmcareagrovet.com</div>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center">
                    <span className="text-3xl mb-2">📞</span>
                    <div className="font-bold text-green-800 mb-1">Phone</div>
                    <div className="text-gray-700">+254 711 123456</div>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center">
                    <span className="text-3xl mb-2">📍</span>
                    <div className="font-bold text-green-800 mb-1">Location</div>
                    <div className="text-gray-700">Garissa Town, Kenya</div>
                </div>
            </section>

            {/* Contact Form */}
            <section className="max-w-3xl mx-auto mt-16">
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
                    <h2 className="text-2xl font-bold text-green-800 mb-2 text-center">Send Us a Message</h2>
                    {submitted && <div className="text-green-700 text-center font-medium mb-2">Message sent successfully!</div>}

                    <div>
                        <label htmlFor="name" className="block mb-1 font-medium">Name</label>
                        <input
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            placeholder="Your Name"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-1 font-medium">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            placeholder="you@email.com"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block mb-1 font-medium">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            rows={4}
                            placeholder="How can we help you?"
                            required
                        />
                    </div>
                    <button type="submit" className="bg-green-700 text-white px-6 py-2 rounded font-semibold hover:bg-green-800 w-full">
                        Send Message
                    </button>
                </form>
            </section>

            {/* Map/Location Section */}
            <section className="max-w-3xl mx-auto mt-12 text-center">
                <div className="bg-gray-100 rounded-lg p-6">
                    <div className="mb-2 font-semibold">Find Us</div>
                    <div className="text-gray-600">Garissa Town, Kenya</div>
                    {/* Embed Google Maps iframe here if needed */}
                </div>
            </section>

            <Footer />
        </div>
    );
}
