import React from 'react';

function About() {
  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          About FurniNest
        </h1>

        {/* Introduction */}
        <div className="text-center mb-12">
          <p className="text-lg text-gray-700">
            Welcome to <strong>FurniNest</strong>, your go-to destination for high-quality, stylish, and affordable furniture. We are dedicated to offering a wide selection of home furnishings that cater to every taste, style, and budget.
          </p>
        </div>

        {/* Our Mission */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700 text-center">
            At FurniNest, our mission is simple: to provide our customers with the best furniture shopping experience possible. We carefully curate our collection, ensuring each piece is both stylish and functional for modern living. Whether you're furnishing your first home or upgrading your space, we're here to help you find the perfect piece.
          </p>
        </div>

        {/* Our Values */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Quality */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Quality Craftsmanship</h3>
            <p className="text-gray-600">
              We believe in quality above all else. Every piece of furniture in our collection is crafted with care and attention to detail, ensuring durability and comfort.
            </p>
          </div>

          {/* Customer Satisfaction */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Customer Satisfaction</h3>
            <p className="text-gray-600">
              We prioritize customer satisfaction. Our team is here to support you throughout your shopping experience, from browsing to delivery.
            </p>
          </div>

          {/* Sustainability */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Sustainability</h3>
            <p className="text-gray-600">
              We are committed to sustainable practices. Many of our pieces are made from eco-friendly materials and are built to last, reducing waste and promoting responsible living.
            </p>
          </div>
        </div>

        {/* Our Story */}
        <div className="bg-white p-8 rounded-lg shadow-md mt-12">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-4">Our Story</h2>
          <p className="text-lg text-gray-700">
            Founded in [2024], FurniNest started with a simple vision: to offer furniture that combines style, quality, and value. What started as a small local business has now grown into a trusted brand that serves customers across the country. We take pride in our journey and continue to evolve by adapting to the latest trends and meeting the changing needs of our customers.
          </p>
        </div>

        {/* Contact Information */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get in Touch</h2>
          <p className="text-lg text-gray-700 mb-4">
            Have questions or need help with your order? We're here to assist you! Reach out to us anytime.
          </p>
          <a
            href="mailto:support@furninest.com"
            className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}

export default About;
