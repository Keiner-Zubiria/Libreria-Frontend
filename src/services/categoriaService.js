import cliente from "../config/axiosClient";


// Servicios de categorías: llaman a los endpoints del backend.
export const obtenerCategorias = () =>
{
    return cliente.get( "/categorias" );
};
