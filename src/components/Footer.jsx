import React from 'react';
import { FaFacebookSquare, FaInstagram, FaTwitterSquare } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8 text-center md:text-left">
        
        
        <div>
          <h1 className="text-2xl font-bold mb-4">FurniNest</h1>
          <p className="text-sm">
            Discover timeless designs and quality craftsmanship with our curated furniture collections. Transform your space with pieces that blend comfort, style, and functionality.
          </p>
        </div>

        
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/home" className="hover:text-gray-400">Home</a></li>
            <li><a href="/shop" className="hover:text-gray-400">Shop</a></li>
            <li><a href="/about" className="hover:text-gray-400">About</a></li>
            <li><a href="/contact" className="hover:text-gray-400">Contact Us</a></li>
          </ul>
        </div>

        
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex justify-center md:justify-start gap-4 text-2xl">
            <a href="https://instagram.com" className="hover:text-gray-400"><FaInstagram /></a>
            <a href="https://facebook.com"  className="hover:text-gray-400"><FaFacebookSquare /></a>
            <a href="https://twitter.com"  className="hover:text-gray-400"><FaTwitterSquare /></a>
          </div>
        </div>

        
        <div>
          <h3 className="text-lg font-semibold mb-4">Customer Care</h3>
          <p>Call: <span className="hover:text-gray-400">9032445628</span></p>
          <p>Email: <span className="hover:text-gray-400">furniNest@gmail.com</span></p>
        </div>
      </div>

     
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
        <p>© 2024 FurniNest. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
