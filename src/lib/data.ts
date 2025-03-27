
// Sample mock data for courses

export interface Course {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  lessonsCount: number;
  duration: string;
  level: 'Principiante' | 'Intermedio' | 'Avanzado';
  progress: number;
  instructor: {
    name: string;
    avatar: string;
    title: string;
  };
  modules: {
    id: string;
    title: string;
    lessons: {
      id: string;
      title: string;
      duration: string;
      isCompleted: boolean;
      type: 'video' | 'interactive' | 'reading';
      content?: string;
      videoUrl?: string;
    }[];
  }[];
}

export const courses: Course[] = [
  {
    id: 'intro-trading',
    title: 'Introducción al Trading',
    description: 'Domina los fundamentos del trading y aprende las estrategias esenciales para comenzar a operar en los mercados financieros.',
    fullDescription: 'Este curso está diseñado para principiantes que desean iniciarse en el mundo del trading. Aprenderás los conceptos básicos de los mercados financieros, las diferentes clases de activos, cómo analizar gráficos, gestionar riesgos y mucho más. Al final del curso, tendrás una base sólida para comenzar a operar con confianza.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop',
    lessonsCount: 12,
    duration: '4 horas',
    level: 'Principiante',
    progress: 35,
    instructor: {
      name: 'Carlos Rodríguez',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      title: 'Trader Profesional'
    },
    modules: [
      {
        id: 'module-1',
        title: 'Fundamentos del Trading',
        lessons: [
          {
            id: 'lesson-1-1',
            title: 'Qué es el Trading y cómo funciona',
            duration: '15 min',
            isCompleted: true,
            type: 'video',
            videoUrl: 'https://example.com/video1',
            content: 'En esta lección, aprenderás los conceptos básicos del trading y cómo funcionan los mercados financieros.'
          },
          {
            id: 'lesson-1-2',
            title: 'Tipos de mercados financieros',
            duration: '18 min',
            isCompleted: true,
            type: 'video',
            videoUrl: 'https://example.com/video2',
            content: 'Conoce los diferentes tipos de mercados financieros: acciones, forex, criptomonedas, futuros y más.'
          },
          {
            id: 'lesson-1-3',
            title: 'Análisis de gráficos básico',
            duration: '22 min',
            isCompleted: false,
            type: 'video',
            videoUrl: 'https://example.com/video3',
            content: 'Aprende a leer y analizar gráficos de precios para tomar decisiones informadas.'
          },
          {
            id: 'lesson-1-4',
            title: 'Práctica: Identificación de tendencias',
            duration: '25 min',
            isCompleted: false,
            type: 'interactive',
            content: 'Pon a prueba tus conocimientos identificando tendencias en gráficos reales.'
          }
        ]
      },
      {
        id: 'module-2',
        title: 'Estrategias de Trading',
        lessons: [
          {
            id: 'lesson-2-1',
            title: 'Estrategias para principiantes',
            duration: '20 min',
            isCompleted: false,
            type: 'video',
            videoUrl: 'https://example.com/video4',
            content: 'Conoce las estrategias más efectivas para traders principiantes.'
          },
          {
            id: 'lesson-2-2',
            title: 'Gestión de riesgos',
            duration: '23 min',
            isCompleted: false,
            type: 'video',
            videoUrl: 'https://example.com/video5',
            content: 'Aprende a proteger tu capital con técnicas efectivas de gestión de riesgos.'
          },
          {
            id: 'lesson-2-3',
            title: 'Psicología del trading',
            duration: '19 min',
            isCompleted: false,
            type: 'reading',
            content: 'Descubre cómo mantener una mentalidad correcta para tener éxito en el trading.'
          }
        ]
      }
    ]
  },
  {
    id: 'advanced-technical-analysis',
    title: 'Análisis Técnico Avanzado',
    description: 'Lleva tus habilidades de análisis técnico al siguiente nivel con patrones avanzados, indicadores y estrategias de trading.',
    fullDescription: 'Este curso profundiza en las técnicas avanzadas de análisis técnico. Aprenderás a utilizar indicadores complejos, identificar patrones de precio sofisticados y desarrollar estrategias de trading basadas en análisis técnico. Ideal para traders con conocimientos básicos que quieren perfeccionar sus habilidades analíticas.',
    image: 'https://images.unsplash.com/photo-1535320903710-d993d3d77d29?q=80&w=2070&auto=format&fit=crop',
    lessonsCount: 14,
    duration: '6 horas',
    level: 'Intermedio',
    progress: 0,
    instructor: {
      name: 'Laura Martínez',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      title: 'Analista Técnico'
    },
    modules: [
      {
        id: 'module-1',
        title: 'Patrones de Velas Japonesas',
        lessons: [
          {
            id: 'lesson-1-1',
            title: 'Patrones de reversión alcista',
            duration: '24 min',
            isCompleted: false,
            type: 'video',
            videoUrl: 'https://example.com/video6',
            content: 'Aprende a identificar patrones de velas que indican posibles reversiones alcistas.'
          },
          {
            id: 'lesson-1-2',
            title: 'Patrones de reversión bajista',
            duration: '22 min',
            isCompleted: false,
            type: 'video',
            videoUrl: 'https://example.com/video7',
            content: 'Reconoce los patrones que sugieren un cambio de tendencia bajista.'
          }
        ]
      },
      {
        id: 'module-2',
        title: 'Indicadores Avanzados',
        lessons: [
          {
            id: 'lesson-2-1',
            title: 'Uso efectivo del RSI',
            duration: '26 min',
            isCompleted: false,
            type: 'video',
            videoUrl: 'https://example.com/video8',
            content: 'Optimiza tu uso del Índice de Fuerza Relativa para mejorar tus entradas y salidas.'
          },
          {
            id: 'lesson-2-2',
            title: 'Estrategias con MACD',
            duration: '28 min',
            isCompleted: false,
            type: 'interactive',
            content: 'Desarrolla estrategias de trading utilizando el indicador MACD.'
          }
        ]
      }
    ]
  },
  {
    id: 'crypto-trading',
    title: 'Trading de Criptomonedas',
    description: 'Aprende estrategias específicas para operar en el mercado de criptomonedas, desde Bitcoin hasta altcoins.',
    fullDescription: 'Este curso se enfoca en las particularidades del mercado de criptomonedas. Aprenderás sobre la tecnología blockchain, cómo analizar proyectos cripto, estrategias específicas para este mercado volátil y cómo gestionar tus inversiones digitales de manera segura y efectiva.',
    image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=2069&auto=format&fit=crop',
    lessonsCount: 16,
    duration: '5.5 horas',
    level: 'Intermedio',
    progress: 0,
    instructor: {
      name: 'Miguel Ángel Vega',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      title: 'Experto en Criptomonedas'
    },
    modules: [
      {
        id: 'module-1',
        title: 'Fundamentos de Criptomonedas',
        lessons: [
          {
            id: 'lesson-1-1',
            title: 'Introducción a Bitcoin y Blockchain',
            duration: '30 min',
            isCompleted: false,
            type: 'video',
            videoUrl: 'https://example.com/video9',
            content: 'Comprende los principios básicos de Bitcoin y la tecnología Blockchain.'
          },
          {
            id: 'lesson-1-2',
            title: 'Principales altcoins y sus casos de uso',
            duration: '25 min',
            isCompleted: false,
            type: 'video',
            videoUrl: 'https://example.com/video10',
            content: 'Conoce las criptomonedas alternativas más importantes y sus aplicaciones prácticas.'
          }
        ]
      },
      {
        id: 'module-2',
        title: 'Estrategias de Trading en Criptomonedas',
        lessons: [
          {
            id: 'lesson-2-1',
            title: 'Análisis del mercado cripto',
            duration: '28 min',
            isCompleted: false,
            type: 'video',
            videoUrl: 'https://example.com/video11',
            content: 'Aprende técnicas específicas para analizar el mercado de criptomonedas.'
          },
          {
            id: 'lesson-2-2',
            title: 'Gestión de riesgos en cripto',
            duration: '22 min',
            isCompleted: false,
            type: 'interactive',
            content: 'Descubre cómo gestionar el riesgo en este mercado altamente volátil.'
          }
        ]
      }
    ]
  },
  {
    id: 'trading-psychology',
    title: 'Psicología del Trading',
    description: 'Desarrolla la mentalidad correcta para el trading y supera los obstáculos emocionales que afectan tus resultados.',
    fullDescription: 'La psicología es un factor crucial en el trading exitoso. Este curso te enseñará técnicas para manejar emociones como el miedo y la codicia, desarrollar disciplina, mantener la consistencia y crear un sistema de trading que se adapte a tu personalidad.',
    image: 'https://images.unsplash.com/photo-1579389083395-4507e98b5e67?q=80&w=2070&auto=format&fit=crop',
    lessonsCount: 10,
    duration: '3.5 horas',
    level: 'Avanzado',
    progress: 0,
    instructor: {
      name: 'Ana Gómez',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      title: 'Psicóloga y Trader'
    },
    modules: [
      {
        id: 'module-1',
        title: 'Fundamentos de Psicología en el Trading',
        lessons: [
          {
            id: 'lesson-1-1',
            title: 'El papel de las emociones en el trading',
            duration: '19 min',
            isCompleted: false,
            type: 'video',
            videoUrl: 'https://example.com/video12',
            content: 'Entiende cómo las emociones influyen en tus decisiones de trading.'
          },
          {
            id: 'lesson-1-2',
            title: 'Sesgos cognitivos comunes',
            duration: '23 min',
            isCompleted: false,
            type: 'video',
            videoUrl: 'https://example.com/video13',
            content: 'Identifica los errores de pensamiento que pueden afectar tu rendimiento.'
          }
        ]
      },
      {
        id: 'module-2',
        title: 'Desarrollo de Disciplina',
        lessons: [
          {
            id: 'lesson-2-1',
            title: 'Creación de un plan de trading',
            duration: '25 min',
            isCompleted: false,
            type: 'video',
            videoUrl: 'https://example.com/video14',
            content: 'Aprende a desarrollar y seguir un plan de trading efectivo.'
          },
          {
            id: 'lesson-2-2',
            title: 'Manejo de pérdidas',
            duration: '21 min',
            isCompleted: false,
            type: 'interactive',
            content: 'Desarrolla estrategias para gestionar emocionalmente las pérdidas.'
          }
        ]
      }
    ]
  }
];

// Function to get a course by ID
export const getCourseById = (id: string): Course | undefined => {
  return courses.find(course => course.id === id);
};

// Function to get a lesson by ID
export const getLessonById = (courseId: string, lessonId: string) => {
  const course = getCourseById(courseId);
  if (!course) return undefined;
  
  for (const module of course.modules) {
    const lesson = module.lessons.find(lesson => lesson.id === lessonId);
    if (lesson) return lesson;
  }
  
  return undefined;
};

// Function to track lesson completion
export const markLessonAsCompleted = (courseId: string, lessonId: string) => {
  // In a real app, this would update a database
  console.log(`Marked lesson ${lessonId} from course ${courseId} as completed`);
};
