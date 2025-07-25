import React from "react";
import { Link } from "react-router-dom";

const About = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col justify-between">
            {/* Hero Section */}
            <section className="bg-green-100 py-20 px-4 text-center">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">
                        Welcome to AgriConnect
                    </h1>
                    <p className="text-lg md:text-xl text-gray-700 mb-8">
                        Connecting livestock producers, veterinary professionals, and buyers
                        for a better agricultural future.
                    </p>
                    <div className="flex justify-center gap-6 flex-wrap">
                        <Link
                            to="/register"
                            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow"
                        >
                            Get Started
                        </Link>
                        <Link
                            to="/login"
                            className="bg-white border-2 border-green-600 hover:bg-green-50 text-green-700 font-semibold py-3 px-6 rounded-lg shadow"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 px-6 bg-gray-50">
                <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">
                    <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
                        <h3 className="text-xl font-bold text-green-700 mb-2">For Farmers</h3>
                        <p className="text-gray-600">
                            Easily find and consult veterinary experts, access agri products, and improve your farm productivity.
                        </p>
                    </div>
                    <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
                        <h3 className="text-xl font-bold text-green-700 mb-2">For Vets & Professionals</h3>
                        <p className="text-gray-600">
                            Offer your services, grow your reputation, and reach more clients directly.
                        </p>
                    </div>
                    <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
                        <h3 className="text-xl font-bold text-green-700 mb-2">For Buyers</h3>
                        <p className="text-gray-600">
                            Discover top-quality agrovet products and connect directly with trusted sellers.
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-green-800 text-white text-center py-6">
                <p>&copy; {new Date().getFullYear()} AgriConnect. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default About;
