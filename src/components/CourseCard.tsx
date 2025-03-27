
import React, { useState, CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import { BookOpen, Clock, ListOrdered } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  lessonsCount: number;
  duration: string;
  level: string;
  progress: number;
  className?: string;
  style?: CSSProperties;
}

const CourseCard = ({
  id,
  title,
  description,
  image,
  lessonsCount,
  duration,
  level,
  progress,
  className,
  style,
}: CourseCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link 
      to={`/courses/${id}`} 
      className={cn(
        "group block rounded-xl overflow-hidden bg-card border border-border transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-primary/20",
        className
      )}
      style={style}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className={cn(
            "w-full h-full object-cover transition-all duration-700",
            imageLoaded ? "image-loaded" : "image-blur-loading"
          )}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute bottom-3 left-3 right-3">
          <ProgressBar 
            value={progress} 
            max={100} 
            size="sm" 
            animate={false}
            className="opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
          />
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-2">
          <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
            {level}
          </span>
          <div className="h-4 w-px bg-border" />
          <span className="text-xs text-muted-foreground flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {duration}
          </span>
        </div>
        
        <h3 className="font-semibold text-xl mb-1 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{description}</p>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-muted-foreground">
            <ListOrdered className="h-4 w-4 mr-1" />
            <span>{lessonsCount} lecciones</span>
          </div>
          
          <div className="flex items-center text-primary">
            <BookOpen className="h-4 w-4 mr-1" />
            <span className="font-medium">{progress}% completado</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
