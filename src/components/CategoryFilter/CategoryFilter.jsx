import "./CategoryFilter.css";

// Componente encargado de mostrar las categorías disponibles para filtrar libros.
function CategoryFilter({ selectedCategory, onCategoryChange }) {

    // Lista de categorías que podrá utilizar el catálogo.
    const categories = [
        "Todos",
        "Novela",
        "Tecnología",
        "Ciencia",
        "Historia",
        "Fantasía"
    ];

    return (
        <div className="category-filter">

            {/* Genera un botón por cada categoría disponible */}
            {categories.map((category) => (
                <button
                    key={category}
                    className={
                        selectedCategory === category
                            ? "active"
                            : ""
                    }
                    onClick={() => onCategoryChange(category)}
                >
                    {category}
                </button>
            ))}

        </div>
    );
}

export default CategoryFilter;