
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Book, ChartBar, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', path: '/', icon: <ChartBar className="h-5 w-5" /> },
    { name: 'Cursos', path: '/courses', icon: <Book className="h-5 w-5" /> },
    { name: 'Perfil', path: '/profile', icon: <User className="h-5 w-5" /> },
  ];

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out", 
          scrolled ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
        )}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-primary rounded-lg p-1.5">
                <ChartBar className="h-5 w-5 text-white" />
              </div>
              <span className="font-display text-xl font-semibold text-foreground">Trade Master</span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    location.pathname === link.path ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>
      
      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-lg border-t border-border">
        <div className="flex items-center justify-around">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={cn(
                "flex flex-col items-center py-3 px-5 transition-colors",
                location.pathname === link.path 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.icon}
              <span className="text-xs mt-1">{link.name}</span>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Add bottom padding to main content to account for bottom navigation */}
      <div className="pb-16 md:pb-0"></div>
    </>
  );
};

export default Navbar;
