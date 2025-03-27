
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import CourseCard from '@/components/CourseCard';
import { Search } from 'lucide-react';
import { courses } from '@/lib/data';
import { cn } from '@/lib/utils';

type CourseLevel = 'Todos' | 'Principiante' | 'Intermedio' | 'Avanzado';

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<CourseLevel>('Todos');
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [isLoading, setIsLoading] = useState(true);
  
  const levels: CourseLevel[] = ['Todos', 'Principiante', 'Intermedio', 'Avanzado'];
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    // Filter courses based on search term and selected level
    const filtered = courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            course.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesLevel = selectedLevel === 'Todos' || course.level === selectedLevel;
      
      return matchesSearch && matchesLevel;
    });
    
    setFilteredCourses(filtered);
  }, [searchTerm, selectedLevel]);
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-20 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Explora Nuestros Cursos</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Descubre cursos diseñados para todos los niveles y mejora tus habilidades de trading
            </p>
          </div>
          
          {/* Search and Filters */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  type="text"
                  placeholder="Buscar cursos..."
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-background"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex overflow-x-auto gap-2 pb-2 md:pb-0">
                {levels.map((level) => (
                  <button
                    key={level}
                    className={cn(
                      "flex-shrink-0 px-4 py-2 rounded-full border transition-colors",
                      selectedLevel === level
                        ? "bg-primary text-white border-primary"
                        : "bg-background border-border hover:border-primary/50"
                    )}
                    onClick={() => setSelectedLevel(level)}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Courses Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="bg-muted animate-pulse rounded-xl h-[360px]"></div>
              ))}
            </div>
          ) : filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course, index) => (
                <CourseCard
                  key={course.id}
                  id={course.id}
                  title={course.title}
                  description={course.description}
                  image={course.image}
                  lessonsCount={course.lessonsCount}
                  duration={course.duration}
                  level={course.level}
                  progress={course.progress}
                  className={`animate-scale-in opacity-0`}
                  style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' } as React.CSSProperties}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No se encontraron cursos con los filtros seleccionados.</p>
              <button 
                className="mt-4 px-4 py-2 text-primary border border-primary rounded-lg hover:bg-primary/5 transition-colors"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedLevel('Todos');
                }}
              >
                Limpiar filtros
              </button>
            </div>
          )}
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

export default Courses;
