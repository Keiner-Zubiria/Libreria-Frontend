// Archivo encargado de almacenar la información inicial del catálogo de libros.

const books = [
    // Literatura
    {
        id: 1,
        titulo: "Cien años de soledad",
        autor: "Gabriel García Márquez",
        categoria: "Novela",
        precioFisico: 45000,
        precioVirtual: 25000,
        stock: 10,
        stockVirtual: Infinity,
        formatos: [ "Fisico", "Virtual" ],
        imagen: "/images/books/cien-años-de-soledad.jpg",
        descripcion:
            "Considerada una de las obras más importantes de la literatura latinoamericana, esta novela narra la historia de la familia Buendía a lo largo de varias generaciones en el mítico pueblo de Macondo. Una obra maestra del realismo mágico que ha conquistado millones de lectores en todo el mundo.",
        calificacion: 4.9,
        vendidos: 325,
        destacado: true,
    },

    {
        id: 2,
        titulo: "El principito",
        autor: "Antoine de Saint-Exupéry",
        categoria: "Novela",
        precioFisico: 30000,
        precioVirtual: 18000,
        stock: 15,
        stockVirtual: Infinity,
        formatos: [ "Fisico", "Virtual" ],
        imagen: "/images/books/el-principito.webp",
        descripcion:
            "Un clásico universal que, mediante una historia sencilla y emotiva, invita a reflexionar sobre la amistad, el amor, la imaginación y el verdadero significado de la vida. Ideal para lectores de todas las edades.",
        calificacion: 4.9,
        vendidos: 410,
    },

    {
        id: 3,
        titulo: "Don Quijote de la Mancha",
        autor: "Miguel de Cervantes",
        categoria: "Novela",
        precioFisico: 60000,
        precioVirtual: 35000,
        stock: 7,
        stockVirtual: Infinity,
        formatos: [ "Fisico", "Virtual" ],
        imagen: "/images/books/don-quijote.jpg",
        descripcion:
            "La obra cumbre de Miguel de Cervantes y una de las novelas más influyentes de la literatura universal. Sigue las aventuras del ingenioso hidalgo Don Quijote y su fiel escudero Sancho Panza.",
        calificacion: 4.8,
        vendidos: 285,
        destacado: true,
    },

    {
        id: 4,
        titulo: "1984",
        autor: "George Orwell",
        categoria: "Novela",
        precioFisico: 42000,
        precioVirtual: 25000,
        stock: 12,
        stockVirtual: Infinity,
        formatos: [ "Fisico", "Virtual" ],
        imagen: "/images/books/1984.webp",
        descripcion:
            "Una novela distópica que presenta una sociedad controlada por la vigilancia constante, la manipulación de la información y la pérdida de la libertad individual. Un clásico imprescindible.",
        calificacion: 4.8,
        vendidos: 340,
    },

    {
        id: 5,
        titulo: "La metamorfosis",
        autor: "Franz Kafka",
        categoria: "Novela",
        precioFisico: 28000,
        precioVirtual: 17000,
        stock: 9,
        stockVirtual: Infinity,
        formatos: [ "Fisico", "Virtual" ],
        imagen: "/images/books/la-metamorfosis.jpg",
        descripcion:
            "Una de las obras más reconocidas de Franz Kafka. La transformación de Gregor Samsa en un enorme insecto sirve como metáfora para explorar la soledad, la incomprensión y la condición humana.",
        calificacion: 4.7,
        vendidos: 198,
    },


    // Tecnología
    {
        id: 6,
        titulo: "Clean Code",
        autor: "Robert C. Martin",
        categoria: "Tecnología",
        precioFisico: 85000,
        precioVirtual: 55000,
        stock: 8,
        stockVirtual: Infinity,
        formatos: [ "Fisico", "Virtual" ],
        imagen: "/images/books/clean-code.webp",
        descripcion:
            "Un referente para desarrolladores de software. Robert C. Martin enseña principios, técnicas y buenas prácticas para escribir código limpio, legible, escalable y fácil de mantener en proyectos profesionales.",
        calificacion: 4.9,
        vendidos: 520,
        destacado: true,
    },

    {
        id: 7,
        titulo: "El programador pragmático",
        autor: "Andrew Hunt y David Thomas",
        categoria: "Tecnología",
        precioFisico: 90000,
        precioVirtual: 60000,
        stock: 6,
        stockVirtual: Infinity,
        formatos: [ "Fisico", "Virtual" ],
        imagen: "/images/books/programador-pragmatico.webp",
        descripcion:
            "Una guía esencial para cualquier desarrollador que quiera mejorar sus habilidades técnicas y su forma de resolver problemas. Incluye consejos prácticos aplicables en proyectos reales.",
        calificacion: 4.9,
        vendidos: 460,
    },

    {
        id: 8,
        titulo: "Java: Cómo programar",
        autor: "Paul Deitel",
        categoria: "Tecnología",
        precioFisico: 95000,
        precioVirtual: 65000,
        stock: 5,
        stockVirtual: Infinity,
        formatos: [ "Fisico", "Virtual" ],
        imagen: "/images/books/java-como-programar.webp",
        descripcion:
            "Uno de los libros más completos para aprender Java. Explica desde los fundamentos de la programación orientada a objetos hasta conceptos avanzados mediante ejemplos claros y ejercicios prácticos.",
        calificacion: 4.8,
        vendidos: 350,
        destacado: true,
    },

    {
        id: 9,
        titulo: "Eloquent JavaScript",
        autor: "Marijn Haverbeke",
        categoria: "Tecnología",
        precioFisico: 75000,
        precioVirtual: 50000,
        stock: 10,
        stockVirtual: Infinity,
        formatos: [ "Fisico", "Virtual" ],
        imagen: "/images/books/eloquent-javascript.jpg",
        descripcion:
            "Una excelente introducción al desarrollo con JavaScript moderno. Explica el lenguaje desde los conceptos básicos hasta temas avanzados mediante ejemplos prácticos y proyectos.",
        calificacion: 4.8,
        vendidos: 295,
    },

    {
        id: 10,
        titulo: "Python Crash Course",
        autor: "Eric Matthes",
        categoria: "Tecnología",
        precioFisico: 80000,
        precioVirtual: 55000,
        stock: 11,
        stockVirtual: Infinity,
        formatos: [ "Fisico", "Virtual" ],
        imagen: "/images/books/python-crash-course.webp",
        descripcion:
            "Curso práctico diseñado para aprender Python desde cero mediante proyectos, ejercicios y ejemplos que facilitan el desarrollo de aplicaciones reales.",
        calificacion: 4.8,
        vendidos: 312,
    },


    // Ciencia
    {
        id: 11,
        titulo: "Breve historia del tiempo",
        autor: "Stephen Hawking",
        categoria: "Ciencia",
        precioFisico: 55000,
        precioVirtual: 35000,
        stock: 8,
        stockVirtual: Infinity,
        formatos: [ "Fisico", "Virtual" ],
        imagen: "/images/books/breve-historia-tiempo.jpg",
        descripcion:
            "Stephen Hawking explica de manera sencilla conceptos como los agujeros negros, el Big Bang, el espacio y el tiempo. Una obra imprescindible para quienes desean comprender los grandes misterios del universo.",
        calificacion: 4.8,
        vendidos: 275,
    },

    {
        id: 12,
        titulo: "El universo en una cáscara de nuez",
        autor: "Stephen Hawking",
        categoria: "Ciencia",
        precioFisico: 60000,
        precioVirtual: 40000,
        stock: 6,
        stockVirtual: Infinity,
        formatos: [ "Fisico", "Virtual" ],
        imagen: "/images/books/universo-cascara-nuez.webp",
        descripcion:
            "Una fascinante exploración de las teorías modernas de la física, donde Hawking explica de forma accesible los avances científicos sobre el origen y funcionamiento del universo.",
        calificacion: 4.7,
        vendidos: 180,
    },

    {
        id: 13,
        titulo: "Cosmos",
        autor: "Carl Sagan",
        categoria: "Ciencia",
        precioFisico: 65000,
        precioVirtual: 40000,
        stock: 7,
        stockVirtual: Infinity,
        formatos: [ "Fisico", "Virtual" ],
        imagen: "/images/books/cosmos.webp",
        descripcion:
            "Carl Sagan invita al lector a recorrer la historia del universo, la evolución de la vida y los descubrimientos científicos que cambiaron nuestra forma de entender el cosmos.",
        calificacion: 4.9,
        vendidos: 390,
    },

    {
        id: 14,
        titulo: "La teoría del todo",
        autor: "Stephen Hawking",
        categoria: "Ciencia",
        precioFisico: 45000,
        precioVirtual: 28000,
        stock: 9,
        stockVirtual: Infinity,
        formatos: [ "Fisico", "Virtual" ],
        imagen: "/images/books/teoria-del-todo.webp",
        descripcion:
            "Una recopilación de conferencias donde Stephen Hawking presenta las ideas fundamentales sobre el origen, evolución y futuro del universo de una forma clara y entretenida.",
        calificacion: 4.7,
        vendidos: 205,
    },


    // Historia
    {
        id: 15,
        titulo: "Sapiens",
        autor: "Yuval Noah Harari",
        categoria: "Historia",
        precioFisico: 70000,
        precioVirtual: 45000,
        stock: 12,
        stockVirtual: Infinity,
        formatos: [ "Fisico", "Virtual" ],
        imagen: "/images/books/sapiens.webp",
        descripcion:
            "Un recorrido por la historia de la humanidad desde la aparición del Homo sapiens hasta la actualidad, explicando cómo surgieron las civilizaciones y el mundo moderno.",
        calificacion: 4.9,
        vendidos: 615,
        destacado: true,
    },

    {
        id: 16,
        titulo: "Homo Deus",
        autor: "Yuval Noah Harari",
        categoria: "Historia",
        precioFisico: 72000,
        precioVirtual: 45000,
        stock: 5,
        stockVirtual: Infinity,
        formatos: [ "Fisico", "Virtual" ],
        imagen: "/images/books/homo-deus.jpg",
        descripcion:
            "Harari analiza los desafíos y oportunidades que enfrentará la humanidad con el desarrollo de la inteligencia artificial, la biotecnología y los avances tecnológicos.",
        calificacion: 4.8,
        vendidos: 290,
    },

    {
        id: 17,
        titulo: "El arte de la guerra",
        autor: "Sun Tzu",
        categoria: "Historia",
        precioFisico: 35000,
        precioVirtual: 22000,
        stock: 14,
        stockVirtual: Infinity,
        formatos: [ "Fisico", "Virtual" ],
        imagen: "/images/books/arte-guerra.webp",
        descripcion:
            "Clásico de la estrategia militar cuyos principios continúan aplicándose en el liderazgo, los negocios y la toma de decisiones en la actualidad.",
        calificacion: 4.8,
        vendidos: 430,
        destacado: true,
    },


    // Desarrollo personal
    {
        id: 18,
        titulo: "Hábitos Atómicos",
        autor: "James Clear",
        categoria: "Desarrollo personal",
        precioFisico: 55000,
        precioVirtual: 35000,
        stock: 15,
        stockVirtual: Infinity,
        formatos: [ "Fisico", "Virtual" ],
        imagen: "/images/books/habitos-atomicos.webp",
        descripcion:
            "James Clear demuestra cómo pequeños cambios diarios pueden generar grandes resultados mediante la creación de hábitos positivos y la eliminación de malos hábitos.",
        calificacion: 4.9,
        vendidos: 720,
        destacado: true,
    },

    {
        id: 19,
        titulo: "Padre rico, padre pobre",
        autor: "Robert Kiyosaki",
        categoria: "Desarrollo personal",
        precioFisico: 50000,
        precioVirtual: 32000,
        stock: 13,
        stockVirtual: Infinity,
        formatos: [ "Fisico", "Virtual" ],
        imagen: "/images/books/padre-rico-padre-pobre.jpg",
        descripcion:
            "Uno de los libros de finanzas personales más influyentes del mundo. Enseña principios fundamentales sobre inversión, ahorro y educación financiera.",
        calificacion: 4.8,
        vendidos: 680,
    },

    {
        id: 20,
        titulo: "Los 7 hábitos de la gente altamente efectiva",
        autor: "Stephen Covey",
        categoria: "Desarrollo personal",
        precioFisico: 60000,
        precioVirtual: 38000,
        stock: 8,
        stockVirtual: Infinity,
        formatos: [ "Fisico", "Virtual" ],
        imagen: "/images/books/7-habitos.webp",
        descripcion:
            "Stephen Covey presenta siete hábitos que ayudan a desarrollar liderazgo, productividad, disciplina y mejores relaciones personales y profesionales.",
        calificacion: 4.8,
        vendidos: 410,
    },


    // Fantasía
    {
        id: 21,
        titulo: "Harry Potter y la piedra filosofal",
        autor: "J.K. Rowling",
        categoria: "Fantasía",
        precioFisico: 50000,
        precioVirtual: 32000,
        stock: 10,
        stockVirtual: Infinity,
        formatos: [ "Fisico", "Virtual" ],
        imagen: "/images/books/Harry-Potter-y-la-piedra-filosofal.jpg",
        descripcion:
            "El comienzo de la famosa saga de Harry Potter, donde un joven descubre que pertenece al mundo de la magia y comienza su formación en Hogwarts.",
        calificacion: 4.9,
        vendidos: 980,
        destacado: true,
    },

    {
        id: 22,
        titulo: "El Hobbit",
        autor: "J.R.R. Tolkien",
        categoria: "Fantasía",
        precioFisico: 55000,
        precioVirtual: 35000,
        stock: 7,
        stockVirtual: Infinity,
        formatos: [ "Fisico", "Virtual" ],
        imagen: "/images/books/el-hobbit.jpg",
        descripcion:
            "Bilbo Bolsón emprende una aventura inesperada llena de dragones, enanos, magia y tesoros, convirtiéndose en uno de los grandes clásicos de la fantasía.",
        calificacion: 4.8,
        vendidos: 520,
    },

    {
        id: 23,
        titulo: "El señor de los anillos",
        autor: "J.R.R. Tolkien",
        categoria: "Fantasía",
        precioFisico: 95000,
        precioVirtual: 60000,
        stock: 4,
        stockVirtual: Infinity,
        formatos: [ "Fisico", "Virtual" ],
        imagen: "/images/books/señor-anillos.webp",
        descripcion:
            "Una obra maestra de la fantasía épica que sigue la misión de Frodo Bolsón y la Comunidad del Anillo para destruir el Anillo Único y salvar la Tierra Media.",
        calificacion: 5.0,
        vendidos: 1150,
        destacado: true,
    },

    {
        id: 24,
        titulo: "Juego de tronos",
        autor: "George R.R. Martin",
        categoria: "Fantasía",
        precioFisico: 80000,
        precioVirtual: 50000,
        stock: 6,
        stockVirtual: Infinity,
        formatos: [ "Fisico", "Virtual" ],
        imagen: "/images/books/juego-tronos.jpg",
        descripcion:
            "Primera entrega de la saga Canción de Hielo y Fuego, donde varias familias nobles luchan por el control del Trono de Hierro en un mundo lleno de intrigas y guerras.",
        calificacion: 4.9,
        vendidos: 690,
        destacado: true,
    },

    {
        id: 25,
        titulo: "Dune",
        autor: "Frank Herbert",
        categoria: "Ciencia ficción",
        precioFisico: 75000,
        precioVirtual: 48000,
        stock: 9,
        stockVirtual: Infinity,
        formatos: [ "Fisico", "Virtual" ],
        imagen: "/images/books/dune.webp",
        descripcion:
            "Considerada una de las mejores novelas de ciencia ficción de todos los tiempos. Narra la historia de Paul Atreides en el desértico planeta Arrakis, donde el poder y la supervivencia dependen de la especia más valiosa del universo.",
        calificacion: 4.9,
        vendidos: 540,
    },
];

export default books;