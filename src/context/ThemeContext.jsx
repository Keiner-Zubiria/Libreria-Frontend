import { createContext, useEffect, useState } from "react";

// Contexto global del tema claro/oscuro.
const ThemeContext = createContext();

// Aplica la clase "dark" a <html> según el tema guardado.
const aplicarTema = ( tema ) =>
{
    const esOscuro = tema === "oscuro";

    document.documentElement.classList.toggle(
        "dark",
        esOscuro
    );
};


function ThemeProvider( { children } )
{
    const [ tema, setTema ] = useState( () =>
    {
        const temaGuardado =
            localStorage.getItem( "tema" ) || "claro";

        aplicarTema( temaGuardado );

        return temaGuardado;
    } );

    useEffect( () =>
    {
        localStorage.setItem( "tema", tema );

        aplicarTema( tema );
    }, [ tema ] );

    // Cambia entre claro y oscuro.
    const toggleTema = () =>
    {
        setTema(
            ( actual ) =>
                actual === "oscuro"
                    ? "claro"
                    : "oscuro"
        );
    };

    return (
        <ThemeContext.Provider
            value={
                {
                    tema,
                    toggleTema
                }
            }
        >
            { children }
        </ThemeContext.Provider>
    );
}

export { ThemeProvider };

export default ThemeContext;
