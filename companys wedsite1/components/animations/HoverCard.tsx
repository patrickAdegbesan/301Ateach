'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface HoverCardProps {
  children: ReactNode;
  className?: string;
}

export default function HoverCard({ children, className = '' }: HoverCardProps) {
  return (
    <motion.div
      whileHover={{ 
        y: -8,
        boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
      }}
      transition={{ 
        duration: 0.3,
        ease: 'easeOut'
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
