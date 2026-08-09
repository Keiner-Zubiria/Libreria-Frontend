import "./BookList.css";
import ProductGrid from "../ProductGrid/ProductGrid";
import books from "../../data/books";

// Componente encargado de mostrar los libros destacados en la página principal.
function BookList() {

    return (
        <section className="book-list">

            <div className="section-title">

                <h2>
                    Libros destacados
                </h2>

                <p>
                    Explora algunos de nuestros libros más recomendados.
                </p>

            </div>

            <ProductGrid books={books.slice(0, 5)} />

        </section>
    );

}

export default BookList;