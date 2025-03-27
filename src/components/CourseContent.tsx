
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ChartLine, Play, Video } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  isCompleted: boolean;
  type: 'video' | 'interactive' | 'reading';
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface CourseContentProps {
  courseId: string;
  modules: Module[];
  className?: string;
}

const CourseContent = ({ courseId, modules, className }: CourseContentProps) => {
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(
    modules.reduce((acc, module) => ({ ...acc, [module.id]: true }), {})
  );

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  const getCompletionPercentage = (lessons: Lesson[]) => {
    if (lessons.length === 0) return 0;
    const completedCount = lessons.filter(lesson => lesson.isCompleted).length;
    return Math.round((completedCount / lessons.length) * 100);
  };

  const getLessonIcon = (type: Lesson['type'], isCompleted: boolean) => {
    if (isCompleted) {
      return <Check className="h-4 w-4 text-primary" />;
    }
    
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4 text-muted-foreground" />;
      case 'interactive':
        return <ChartLine className="h-4 w-4 text-muted-foreground" />;
      case 'reading':
        return <ChartLine className="h-4 w-4 text-muted-foreground" />;
      default:
        return <Play className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className={cn("rounded-xl border border-border", className)}>
      {modules.map((module) => (
        <div key={module.id} className="border-b border-border last:border-b-0">
          <button
            onClick={() => toggleModule(module.id)}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center">
              <span className="font-medium">{module.title}</span>
              <div className="ml-2 px-2 py-0.5 bg-secondary rounded-full text-xs text-muted-foreground">
                {module.lessons.length} lecciones
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {getCompletionPercentage(module.lessons)}% completado
              </span>
              <svg
                className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform duration-200",
                  expandedModules[module.id] ? "rotate-180" : ""
                )}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>
          
          {expandedModules[module.id] && (
            <div className="bg-muted/30 border-t border-border">
              {module.lessons.map((lesson) => (
                <Link
                  key={lesson.id}
                  to={`/courses/${courseId}/lessons/${lesson.id}`}
                  className={cn(
                    "flex items-center justify-between px-6 py-3 hover:bg-muted/50 transition-colors",
                    lesson.isCompleted ? "bg-primary/5" : ""
                  )}
                >
                  <div className="flex items-center">
                    <div className={cn(
                      "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-3",
                      lesson.isCompleted ? "bg-primary/10" : "bg-secondary"
                    )}>
                      {getLessonIcon(lesson.type, lesson.isCompleted)}
                    </div>
                    <span className={cn(
                      "text-sm",
                      lesson.isCompleted ? "text-foreground line-through decoration-[0.5px]" : ""
                    )}>
                      {lesson.title}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CourseContent;
