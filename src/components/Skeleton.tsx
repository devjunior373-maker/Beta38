import React from 'react';
import { motion } from 'motion/react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = "" }) => {
  return (
    <motion.div
      className={`bg-gray-200 rounded-sm relative overflow-hidden ${className}`}
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.5, 0.8, 0.5] }}
      transition={{ 
        duration: 1.5, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      />
    </motion.div>
  );
};

export const AppCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-sm shadow-sm border border-gray-100 flex flex-col gap-3 h-full">
      <Skeleton className="w-16 h-16 rounded-lg self-center mb-2" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-3/4 mx-auto" />
        <Skeleton className="h-4 w-1/2 mx-auto" />
      </div>
      <div className="mt-auto pt-4 border-t border-gray-50">
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
};
