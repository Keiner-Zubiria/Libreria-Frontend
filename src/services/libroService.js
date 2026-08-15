import cliente from "../config/axiosClient";


// Servicios de libros: llaman a los endpoints del backend.
export const obtenerLibros = () => cliente.get( "/libros" );

export const obtenerLibro = ( id ) => cliente.get( `/libros/${ id }` );

export const crearLibro = ( formData ) =>
    cliente.post( "/libros", formData );

export const actualizarLibro = ( id, formData ) =>
    cliente.put( `/libros/${ id }`, formData );

export const actualizarStock = ( id, cantidad ) =>
    cliente.put( `/libros/${ id }/stock`, null, {
        params: {
            cantidad
        }
    } );

export const eliminarLibro = ( id ) =>
    cliente.delete( `/libros/${ id }` );
