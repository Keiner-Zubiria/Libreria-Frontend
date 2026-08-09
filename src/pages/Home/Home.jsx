import "./Home.css";

import Hero from "../../components/Hero/Hero";
import BookList from "../../components/BookList/BookList";

// Página principal de la librería.
function Home() {
    return (
        <>
            <Hero />

            <BookList />
        </>
    );
}

export default Home;