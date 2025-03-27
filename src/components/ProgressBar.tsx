
import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  labelClassName?: string;
  animate?: boolean;
}

const ProgressBar = ({
  value,
  max,
  showLabel = false,
  size = 'md',
  className,
  labelClassName,
  animate = true,
}: ProgressBarProps) => {
  const percentage = Math.round((value / max) * 100);
  
  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };
  
  return (
    <div className={cn("w-full", className)}>
      <div className="w-full bg-secondary rounded-full overflow-hidden">
        <div
          className={cn(
            "bg-primary transition-all duration-700 ease-out rounded-full",
            sizeClasses[size],
            animate && "animate-progress"
          )}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
      
      {showLabel && (
        <div className={cn("text-xs text-muted-foreground mt-1", labelClassName)}>
          {percentage}% Completado
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
