
import React from 'react';
import Navbar from '@/components/Navbar';
import { Avatar } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, ChevronRight, Clock, Medal, Settings, Star, User } from 'lucide-react';
import { courses } from '@/lib/data';

const Profile = () => {
  // Calculate total completed lessons and total progress
  const totalLessons = courses.reduce((acc, course) => acc + course.lessonsCount, 0);
  const completedLessons = courses.reduce((acc, course) => {
    const completed = course.modules.reduce((mAcc, module) => {
      return mAcc + module.lessons.filter(lesson => lesson.isCompleted).length;
    }, 0);
    return acc + completed;
  }, 0);
  
  const averageProgress = courses.reduce((acc, course) => acc + course.progress, 0) / courses.length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container max-w-4xl mx-auto px-4 pt-20 pb-24">
        <div className="flex flex-col items-center mb-8 text-center">
          <Avatar className="h-24 w-24 mb-4">
            <img src="https://randomuser.me/api/portraits/men/42.jpg" alt="Profile" />
          </Avatar>
          <h1 className="text-2xl font-bold">Carlos Rodríguez</h1>
          <p className="text-muted-foreground">Estudiante de Trading</p>
          
          <Button variant="outline" size="sm" className="mt-4">
            <Settings className="mr-2 h-4 w-4" />
            Editar Perfil
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Cursos</p>
                    <p className="font-semibold">{courses.length}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Lecciones Completadas</p>
                    <p className="font-semibold">{completedLessons} de {totalLessons}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <Medal className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Progreso Promedio</p>
                    <p className="font-semibold">{Math.round(averageProgress)}%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Mis Cursos</CardTitle>
            <CardDescription>Continúa desde donde lo dejaste</CardDescription>
          </CardHeader>
          <CardContent>
            {courses.map((course) => (
              <div key={course.id} className="mb-4 last:mb-0">
                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0 mr-4">
                      <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-medium">{course.title}</h3>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <span className="flex items-center mr-3">
                          <BookOpen className="h-3 w-3 mr-1" />
                          {course.lessonsCount} lecciones
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {course.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-4 text-right">
                      <span className="text-sm font-medium text-primary">{course.progress}%</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Ajustes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="ghost" className="w-full justify-start">
              <User className="mr-2 h-4 w-4" />
              Información Personal
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Preferencias de Cuenta
            </Button>
            <Button variant="ghost" className="w-full justify-start text-destructive">
              Cerrar Sesión
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Profile;
