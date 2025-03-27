
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getCourseById, getLessonById, markLessonAsCompleted } from '@/lib/data';
import Navbar from '@/components/Navbar';
import ProgressBar from '@/components/ProgressBar';
import { ArrowDown, ArrowUp, Check, ChartLine, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

const LessonView = () => {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const navigate = useNavigate();
  
  const [isCompleteDialogOpen, setIsCompleteDialogOpen] = useState(false);
  
  const course = getCourseById(courseId || '');
  const lesson = getLessonById(courseId || '', lessonId || '');
  
  useEffect(() => {
    if (!course || !lesson) {
      console.error(`Course or lesson not found: ${courseId}, ${lessonId}`);
      navigate('/courses');
    }
    
    window.scrollTo(0, 0);
  }, [courseId, lessonId, course, lesson, navigate]);
  
  if (!course || !lesson) {
    return null;
  }
  
  // Find module containing this lesson
  const currentModule = course.modules.find(module => 
    module.lessons.some(l => l.id === lessonId)
  );
  
  if (!currentModule) {
    return null;
  }
  
  // Find lesson index
  const moduleIndex = course.modules.indexOf(currentModule);
  const lessonIndex = currentModule.lessons.findIndex(l => l.id === lessonId);
  
  // Calculate next and previous lessons
  const getNextLesson = () => {
    if (lessonIndex < currentModule.lessons.length - 1) {
      // Next lesson in same module
      return currentModule.lessons[lessonIndex + 1];
    } else if (moduleIndex < course.modules.length - 1) {
      // First lesson in next module
      return course.modules[moduleIndex + 1].lessons[0];
    }
    return null;
  };
  
  const getPrevLesson = () => {
    if (lessonIndex > 0) {
      // Previous lesson in same module
      return currentModule.lessons[lessonIndex - 1];
    } else if (moduleIndex > 0) {
      // Last lesson in previous module
      const prevModule = course.modules[moduleIndex - 1];
      return prevModule.lessons[prevModule.lessons.length - 1];
    }
    return null;
  };
  
  const nextLesson = getNextLesson();
  const prevLesson = getPrevLesson();
  
  // Calculate overall progress
  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);
  const completedLessons = course.modules.reduce(
    (acc, module) => acc + module.lessons.filter(l => l.isCompleted).length,
    0
  );
  
  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'reading':
        return <BookOpen className="h-5 w-5" />;
      case 'interactive':
        return <ChartLine className="h-5 w-5" />;
      default:
        return <BookOpen className="h-5 w-5" />;
    }
  };
  
  const handleCompleteLesson = () => {
    markLessonAsCompleted(courseId!, lessonId!);
    setIsCompleteDialogOpen(true);
    
    // In a real app, we would update the state or refetch the data
    // For demo purposes, we just show a dialog and navigate to next lesson after a delay
    if (nextLesson) {
      setTimeout(() => {
        setIsCompleteDialogOpen(false);
        navigate(`/courses/${courseId}/lessons/${nextLesson.id}`);
      }, 2000);
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20 pb-20">
        {/* Course Progress Bar */}
        <div className="fixed top-16 left-0 right-0 z-30 bg-background/80 backdrop-blur-sm border-b border-border">
          <div className="container mx-auto max-w-6xl px-4 md:px-6 py-3">
            <div className="flex items-center justify-between mb-1">
              <Link to={`/courses/${courseId}`} className="text-sm font-medium hover:text-primary">
                {course.title}
              </Link>
              <span className="text-sm font-medium">
                {completedLessons} / {totalLessons} lecciones
              </span>
            </div>
            <ProgressBar 
              value={completedLessons} 
              max={totalLessons} 
              size="sm" 
              animate={false}
            />
          </div>
        </div>
        
        <div className="container mx-auto max-w-6xl px-4 md:px-6 mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Lesson Content */}
              <div className="bg-card border border-border rounded-xl p-4 md:p-8 shadow-sm animate-fade-in">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    {getLessonIcon(lesson.type)}
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">
                      {currentModule.title} • Lección {lessonIndex + 1}
                    </div>
                    <h1 className="text-2xl font-bold">{lesson.title}</h1>
                  </div>
                </div>
                
                <div className="prose prose-lg max-w-none text-foreground">
                  <p className="text-lg mb-6 leading-relaxed">
                    {lesson.content || 'Contenido de la lección...'}
                  </p>
                  
                  <p className="text-lg mb-6 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus magna at eros vehicula, sit amet rhoncus magna tempus. Proin nec odio vel urna iaculis iaculis. Nulla facilisi. Maecenas eget iaculis leo, a bibendum ipsum.
                  </p>
                  
                  <h3 className="text-xl font-semibold mt-8 mb-4">Puntos clave</h3>
                  
                  <ul className="space-y-4 mb-6 list-none pl-0">
                    <li className="flex items-start bg-secondary/20 p-4 rounded-lg">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-base">Entiende los conceptos fundamentales del trading</span>
                    </li>
                    <li className="flex items-start bg-secondary/20 p-4 rounded-lg">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-base">Aprende a analizar tendencias y patrones</span>
                    </li>
                    <li className="flex items-start bg-secondary/20 p-4 rounded-lg">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-base">Implementa estrategias efectivas basadas en análisis</span>
                    </li>
                  </ul>
                  
                  {lesson.type === 'interactive' && (
                    <div className="my-8 bg-secondary/20 p-6 rounded-lg border border-border">
                      <h3 className="text-xl font-semibold mb-4">Ejercicio Práctico</h3>
                      <p className="text-base mb-6">
                        Analiza el siguiente caso y responde las preguntas a continuación:
                      </p>
                      
                      <div className="space-y-6">
                        <div className="bg-card p-5 rounded-lg shadow-sm border border-border">
                          <p className="font-medium mb-4">Imagina que estás analizando un gráfico de precios con las siguientes características:</p>
                          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                            <li>Una tendencia alcista que ha durado tres meses</li>
                            <li>Volumen decreciente en las últimas dos semanas</li>
                            <li>Formación de un patrón de doble techo</li>
                          </ul>
                        </div>
                        
                        <div>
                          <p className="font-medium mb-3">¿Qué tipo de señales observas en este escenario?</p>
                          <div className="space-y-2">
                            <label className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/30 cursor-pointer">
                              <input type="radio" name="q1" className="h-5 w-5 text-primary" />
                              <span className="text-base">Señales de continuación de tendencia alcista</span>
                            </label>
                            <label className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/30 cursor-pointer">
                              <input type="radio" name="q1" className="h-5 w-5 text-primary" />
                              <span className="text-base">Señales de posible reversión de tendencia</span>
                            </label>
                            <label className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/30 cursor-pointer">
                              <input type="radio" name="q1" className="h-5 w-5 text-primary" />
                              <span className="text-base">Señales de consolidación lateral</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="bg-secondary/20 p-6 rounded-lg mt-8 border border-border">
                    <h3 className="text-xl font-semibold mb-4">Resumen</h3>
                    <p className="text-base leading-relaxed">
                      En esta lección has aprendido conceptos fundamentales sobre análisis de mercado y estrategias de trading.
                      Recuerda aplicar estos conocimientos de manera práctica y seguir estudiando el material complementario
                      para fortalecer tu comprensión.
                    </p>
                  </div>
                </div>
                
                {/* Lesson Navigation */}
                <div className="flex flex-col sm:flex-row justify-between mt-8 pt-8 border-t border-border">
                  {prevLesson ? (
                    <Link
                      to={`/courses/${courseId}/lessons/${prevLesson.id}`}
                      className="flex items-center text-muted-foreground hover:text-foreground mb-4 sm:mb-0"
                    >
                      <ArrowUp className="h-5 w-5 mr-2 rotate-90" />
                      <span>Lección anterior</span>
                    </Link>
                  ) : (
                    <div></div>
                  )}
                  
                  <button
                    onClick={handleCompleteLesson}
                    className="px-6 py-3 bg-primary text-white rounded-lg font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:translate-y-[-2px] transition-all"
                  >
                    {nextLesson ? 'Completar y Continuar' : 'Completar Curso'}
                  </button>
                  
                  {nextLesson ? (
                    <Link
                      to={`/courses/${courseId}/lessons/${nextLesson.id}`}
                      className="flex items-center text-muted-foreground hover:text-foreground mt-4 sm:mt-0"
                    >
                      <span>Siguiente lección</span>
                      <ArrowDown className="h-5 w-5 ml-2 rotate-90" />
                    </Link>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="order-first lg:order-last">
              <div className="bg-card border border-border rounded-xl overflow-hidden sticky top-32">
                <div className="p-4 border-b border-border bg-secondary/50">
                  <h3 className="font-semibold">Contenido del módulo</h3>
                </div>
                
                <div className="p-2 max-h-[calc(100vh-200px)] overflow-y-auto">
                  {currentModule.lessons.map((moduleLesson, idx) => (
                    <Link
                      key={moduleLesson.id}
                      to={`/courses/${courseId}/lessons/${moduleLesson.id}`}
                      className={cn(
                        "flex items-center py-2 px-3 rounded-lg my-1 transition-colors",
                        moduleLesson.id === lessonId
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-muted/50",
                        moduleLesson.isCompleted && moduleLesson.id !== lessonId && "text-muted-foreground"
                      )}
                    >
                      <div className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0",
                        moduleLesson.isCompleted ? "bg-primary/10" : "bg-secondary"
                      )}>
                        {moduleLesson.isCompleted ? (
                          <Check className="h-3 w-3 text-primary" />
                        ) : (
                          <span className="text-xs font-medium">{idx + 1}</span>
                        )}
                      </div>
                      <span className="text-sm truncate">{moduleLesson.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Completion Dialog */}
      {isCompleteDialogOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-card rounded-xl p-6 shadow-2xl max-w-md w-full animate-scale-in">
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center mb-4">
              <Check className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-center mb-2">¡Lección Completada!</h3>
            <p className="text-muted-foreground text-center mb-6">
              {nextLesson ? '¡Excelente trabajo! Continuando a la siguiente lección...' : '¡Felicidades! Has completado el curso.'}
            </p>
            
            <div className="flex justify-center">
              <div className="w-8 h-8 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonView;
