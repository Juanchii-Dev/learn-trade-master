
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Book, ChartLine, Play } from 'lucide-react';
import { courses } from '@/lib/data';
import CourseCard from '@/components/CourseCard';
import Navbar from '@/components/Navbar';
import { cn } from '@/lib/utils';

const Index = () => {
  const featuredCourses = courses.slice(0, 3);
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, { threshold: 0.1 });
    
    const children = heroRef.current?.querySelectorAll('.animate-on-scroll');
    children?.forEach(child => observer.observe(child));
    
    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <ChartLine className="h-6 w-6 text-primary" />,
      title: 'Estrategias Efectivas',
      description: 'Aprende estrategias de trading probadas y utilizadas por profesionales.'
    },
    {
      icon: <Play className="h-6 w-6 text-primary" />,
      title: 'Contenido Interactivo',
      description: 'Aprende de forma práctica con lecciones interactivas y ejemplos reales.'
    },
    {
      icon: <Book className="h-6 w-6 text-primary" />,
      title: 'Cursos Estructurados',
      description: 'Contenido organizado para maximizar tu aprendizaje y progreso.'
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 md:px-6 overflow-hidden" ref={heroRef}>
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2 animate-on-scroll" style={{ opacity: 0 }}>
              <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium inline-block mb-4">
                Trade Master App
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Domina el Arte del <span className="text-primary">Trading</span> con Cursos Interactivos
              </h1>
              <p className="text-muted-foreground text-lg mb-8">
                Aprende estrategias efectivas, análisis técnico y psicología del trading con cursos prácticos y contenido de calidad.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/courses" 
                  className="px-6 py-3 bg-primary text-white rounded-lg font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:translate-y-[-2px] transition-all"
                >
                  Explorar Cursos
                </Link>
                <Link 
                  to="/courses/intro-trading" 
                  className="px-6 py-3 bg-white dark:bg-gray-800 border border-border rounded-lg font-medium hover:bg-muted/50 transition-all"
                >
                  Curso Gratuito
                </Link>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 animate-on-scroll" style={{ opacity: 0, transitionDelay: '200ms' }}>
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-blue-500/30 rounded-xl blur-xl opacity-70"></div>
                <div className="relative bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-border shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1642790551116-18e150f248e9?q=80&w=2070&auto=format&fit=crop" 
                    alt="Trading Dashboard" 
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-40"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4 md:px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">¿Por qué elegir Trade Master?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nuestra plataforma está diseñada para ofrecerte la mejor experiencia de aprendizaje en trading.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md hover:border-primary/20 transition-all"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Courses Section */}
      <section className="py-16 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Cursos Destacados</h2>
            <Link 
              to="/courses" 
              className="text-primary hover:underline font-medium flex items-center"
            >
              Ver todos
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 ml-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
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
                className="animate-scale-in opacity-0"
                style={{ animationDelay: `${featuredCourses.indexOf(course) * 150}ms`, animationFillMode: 'forwards' }}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 bg-primary/5">
        <div className="container mx-auto max-w-6xl">
          <div className="rounded-2xl bg-white dark:bg-gray-900 p-8 md:p-12 border border-border shadow-lg overflow-hidden relative">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 max-w-2xl">
                ¿Listo para convertirte en un trader profesional?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl">
                Comienza hoy mismo a aprender con nuestros cursos y alcanza tus objetivos financieros.
              </p>
              <Link 
                to="/courses" 
                className="px-8 py-3 bg-primary text-white rounded-lg font-medium inline-block shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:translate-y-[-2px] transition-all"
              >
                Comenzar Ahora
              </Link>
            </div>
            
            <div className="absolute right-0 -bottom-10 opacity-10 md:opacity-20">
              <ChartLine className="w-64 h-64 text-primary" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 px-4 md:px-6 border-t border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-primary rounded-lg p-1.5 mr-2">
                <ChartLine className="h-5 w-5 text-white" />
              </div>
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

export default Index;
