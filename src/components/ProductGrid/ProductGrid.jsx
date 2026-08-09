import "./ProductGrid.css";
import BookCard from "../BookCard/BookCard";

// Componente encargado de mostrar los libros recibidos en formato de cuadrícula.
function ProductGrid({ books }) {

    return (
        <div className="product-grid">

            {/* Recorre la lista de libros y genera una tarjeta por cada elemento */}
            {books.map((book) => (
                <BookCard
                    key={book.id}
                    book={book}
                />
            ))}

        </div>
    );
}

export default ProductGrid;