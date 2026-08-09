import "./Categories.css";
import {
    BookOpen,
    Monitor,
    FlaskConical,
    Landmark,
    Sparkles
} from "lucide-react";

// Componente encargado de mostrar las diferentes categorías disponibles en la librería.
function Categories() {

    // Lista de categorías con sus respectivos iconos para la interfaz.
    const categories = [
        {
            name: "Novelas",
            icon: <BookOpen size={32} />
        },
        {
            name: "Tecnología",
            icon: <Monitor size={32} />
        },
        {
            name: "Ciencia",
            icon: <FlaskConical size={32} />
        },
        {
            name: "Historia",
            icon: <Landmark size={32} />
        },
        {
            name: "Fantasía",
            icon: <Sparkles size={32} />
        }
    ];

    return (
        <section className="categories">

            {/* Título y descripción de la sección de categorías */}
            <div className="section-title">
                <h2>Categorías</h2>
                <p>
                    Encuentra libros según tus intereses.
                </p>
            </div>


            {/* Creación dinámica de las tarjetas de categorías */}
            <div className="category-grid">

                {categories.map((category, index) => (
                    <div
                        className="category-card"
                        key={index}
                    >

                        {/* Icono representativo de cada categoría */}
                        <div className="category-icon">
                            {category.icon}
                        </div>

                        <h3>
                            {category.name}
                        </h3>

                    </div>
                ))}

            </div>

        </section>
    );
}

export default Categories;