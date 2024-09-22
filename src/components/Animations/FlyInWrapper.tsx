import React from 'react';
import { motion } from 'framer-motion';

interface AnimationWrapperProps {
  children: React.ReactNode;
  stagger?: number;
  initialY?: number;
  duration?: number;
}

const AnimationWrapper: React.FC<AnimationWrapperProps> = ({
  children,
  stagger = 0.2,
  initialY = 20,
  duration = 0.2,
}) => {
  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
      },
    },
  };

  // Animation variants for individual items
  const itemVariants = {
    hidden: { opacity: 0, y: initialY },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: duration,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {React.Children.map(children, (child) => (
        <motion.div variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AnimationWrapper;
