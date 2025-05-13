import Link from "next/link";
import React from "react";
import '@/assets/styles/globals.css'
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata={
  title: 'PropertyPulse | Find The Perfect Rental',
  description: 'Find your dream rental property',
  keywords: 'rental, find rentals, find properties'
};

// // Basic Header component
// const Header = () => (
//   <header>
//     <nav>
//       <ul>
//         <li>
//           <Link href="/">Home</Link>
//         </li>
//         <li>
//           <Link href="/about">About</Link>
//         </li>
//         <li>
//           <Link href="/contact">Contact</Link>
//         </li>
//       </ul>
//     </nav>
//   </header>
// );

// // Basic Footer component
// const Footer = () => (
//   <footer>
//     <p>&copy; 2025 Your Company. All rights reserved.</p>
//   </footer>
// );

// Layout Component that wraps around page content
const Layout = ({ children }) => {
  return (
      <html lang='e'>
        <body>
          <Navbar/>
          <main>{children}</main>
          <Footer/>
        </body>
      </html>
  );
};

export default Layout;
