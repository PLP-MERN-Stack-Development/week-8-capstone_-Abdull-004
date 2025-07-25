import { Link } from 'react-router-dom';

// Reusable Footer component
function Footer() {
    return (
        <footer className="mt-20 bg-green-800 text-white py-8 text-center rounded-t-3xl shadow-inner">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="mb-2 font-bold text-lg">Farmcare Agrovet Online Store</h2>
                <p className="mb-2">Empowering farmers and communities in Northern Kenya</p>
                <p className="text-sm text-green-100">&copy; {new Date().getFullYear()} Farmcare Agrovet. All rights reserved.</p>
            </div>
        </footer>
    );
}

// Reusable card component
function ServiceCard({ icon, title, description }) {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl transition duration-300">
            <span className="text-4xl mb-3">{icon}</span>
            <h3 className="text-xl font-bold text-green-800 mb-2">{title}</h3>
            <p className="text-gray-700">{description}</p>
        </div>
    );
}

export default function Services() {
    return (
        <div className="bg-gradient-to-br from-green-50 via-white to-green-100 min-h-screen pb-20">
            {/* Hero Section */}
            <section className="py-16 bg-gradient-to-r from-green-700 to-green-400 text-white shadow-xl rounded-b-3xl">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">Our Services</h1>
                    <p className="text-xl font-medium mb-6 max-w-2xl mx-auto drop-shadow">
                        More than products—Farmcare Agrovet delivers value-added services to help you grow, learn, and thrive in agriculture and livestock management.
                    </p>
                </div>
            </section>

            {/* Main Services */}
            <section className="max-w-5xl mx-auto px-4 mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                <ServiceCard
                    icon="🧑‍🌾"
                    title="Farm Advisory"
                    description="Personalized guidance on crop selection, pest management, and best practices."
                />
                <ServiceCard
                    icon="🧪"
                    title="Soil Testing"
                    description="Accurate soil analysis and fertilizer recommendations for better yields."
                />
                <ServiceCard
                    icon="🐄"
                    title="Animal Health Clinics"
                    description="On-site and virtual vet consultations, vaccination drives, and disease prevention."
                />
            </section>

            {/* Additional Services */}
            <section className="max-w-5xl mx-auto px-4 mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                <ServiceCard
                    icon="🎓"
                    title="Training & Workshops"
                    description="Capacity building for farmers, youth, and women’s groups on modern agri-techniques."
                />
                <ServiceCard
                    icon="🤝"
                    title="Community Events"
                    description="Field days, demo plots, and networking for local agri-entrepreneurs."
                />
            </section>

            {/* CTA Section */}
            <section className="max-w-3xl mx-auto mt-20 text-center">
                <div className="bg-green-700 rounded-2xl p-10 shadow-xl">
                    <h2 className="text-3xl font-bold text-white mb-2">Book a Service or Learn More</h2>
                    <p className="text-white mb-4 text-lg">Contact us to schedule a service, join a workshop, or get expert advice for your farm or business.</p>
                    <Link
                        to="/contact"
                        className="inline-block bg-white text-green-700 font-bold px-10 py-4 rounded-xl text-xl shadow-lg hover:bg-green-100 transition"
                    >
                        Contact Us
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}
