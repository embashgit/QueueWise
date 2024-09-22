// src/components/Footer/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className=" text-gray-500 border-t p-4 text-center">
      <p>© {new Date().getFullYear()} Embash QueueWise. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
