
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ProgressBar from '@/components/ProgressBar';
import CourseContent, { Module } from '@/components/CourseContent';
import { ChartLine, Clock, ListOrdered, Play, User } from 'lucide-react';
import { getCourseById } from '@/lib/data';
import { cn } from '@/lib/utils';

const CourseDetail = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const course = getCourseById(courseId || '');
  
  useEffect(() => {
    if (!course) {
      console.error(`Course with id ${courseId} not found`);
    }
    
    window.scrollTo(0, 0);
  }, [courseId, course]);
  
  if (!course) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-24 pb-20 px-4 md:px-6 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Curso no encontrado</h1>
            <p className="text-muted-foreground mb-8">El curso que estás buscando no existe o ha sido eliminado.</p>
            <Link
              to="/courses"
              className="px-6 py-3 bg-primary text-white rounded-lg font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
            >
              Volver a Cursos
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);
  const completedLessons = course.modules.reduce(
    (acc, module) => acc + module.lessons.filter(lesson => lesson.isCompleted).length,
    0
  );
  
  const firstIncompleteLesson = (() => {
    for (const module of course.modules) {
      for (const lesson of module.lessons) {
        if (!lesson.isCompleted) {
          return lesson;
        }
      }
    }
    return course.modules[0].lessons[0];
  })();
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-20">
        {/* Course Header */}
        <div className="relative h-[300px] md:h-[400px] overflow-hidden">
          <img
            src={course.image}
            alt={course.title}
            className={cn(
              "w-full h-full object-cover transition-all duration-700",
              imageLoaded ? "image-loaded" : "image-blur-loading"
            )}
            onLoad={() => setImageLoaded(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="container mx-auto max-w-6xl">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                      {course.level}
                    </span>
                    <div className="h-4 w-px bg-border" />
                    <span className="text-sm text-muted-foreground flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {course.duration}
                    </span>
                    <div className="h-4 w-px bg-border" />
                    <span className="text-sm text-muted-foreground flex items-center">
                      <ListOrdered className="h-4 w-4 mr-1" />
                      {course.lessonsCount} lecciones
                    </span>
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">{course.title}</h1>
                  
                  <div className="flex items-center mt-3">
                    <img 
                      src={course.instructor.avatar} 
                      alt={course.instructor.name}
                      className="w-10 h-10 rounded-full mr-3 border-2 border-white"
                    />
                    <div>
                      <div className="font-medium">{course.instructor.name}</div>
                      <div className="text-sm text-muted-foreground">{course.instructor.title}</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col md:items-end">
                  <div className="flex items-center mb-2">
                    <span className="text-sm font-medium mr-2">
                      Progreso: {completedLessons} de {totalLessons} lecciones
                    </span>
                    <span className="text-primary font-semibold">
                      {Math.round((completedLessons / totalLessons) * 100)}%
                    </span>
                  </div>
                  <ProgressBar 
                    value={completedLessons} 
                    max={totalLessons} 
                    size="md" 
                    className="w-full md:w-64"
                  />
                  
                  <Link
                    to={`/courses/${course.id}/lessons/${firstIncompleteLesson.id}`}
                    className="mt-4 px-6 py-3 bg-primary text-white rounded-lg font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:translate-y-[-2px] transition-all flex items-center justify-center"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    {completedLessons > 0 ? 'Continuar Aprendiendo' : 'Comenzar Curso'}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto max-w-6xl px-4 md:px-6 mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-4">Acerca del Curso</h2>
              <p className="text-muted-foreground mb-8">
                {course.fullDescription}
              </p>
              
              <h2 className="text-2xl font-bold mb-4">Contenido del Curso</h2>
              <CourseContent 
                courseId={course.id} 
                modules={course.modules as Module[]} 
              />
            </div>
            
            <div>
              <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-4">Este curso incluye:</h3>
                
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Play className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <span>
                      <span className="font-medium">{course.lessonsCount} lecciones</span>
                      <span className="text-muted-foreground block text-sm">Con videos y contenido interactivo</span>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Clock className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <span>
                      <span className="font-medium">{course.duration} de contenido</span>
                      <span className="text-muted-foreground block text-sm">Aprende a tu propio ritmo</span>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <User className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <span>
                      <span className="font-medium">Instructor experto</span>
                      <span className="text-muted-foreground block text-sm">Aprende con {course.instructor.name}</span>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <ChartLine className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <span>
                      <span className="font-medium">Seguimiento de progreso</span>
                      <span className="text-muted-foreground block text-sm">Rastrea tu avance en el curso</span>
                    </span>
                  </li>
                </ul>
                
                <div className="mt-6 pt-6 border-t border-border">
                  <Link
                    to={`/courses/${course.id}/lessons/${firstIncompleteLesson.id}`}
                    className="w-full px-6 py-3 bg-primary text-white rounded-lg font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:translate-y-[-2px] transition-all flex items-center justify-center"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    {completedLessons > 0 ? 'Continuar Aprendiendo' : 'Comenzar Curso'}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-8 px-4 md:px-6 border-t border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <span className="font-display text-xl font-semibold text-foreground">Trade Master</span>
            </div>
            
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Trade Master. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CourseDetail;
