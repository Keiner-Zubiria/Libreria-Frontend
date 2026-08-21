import "./LibroModal.css";

import { useEffect, useState } from "react";

import { createPortal } from "react-dom";

import { X } from "lucide-react";

import { API_URL, imagenUrl } from "../../config/api";



// Modal para agregar o editar un libro.
function LibroModal( { onClose, onGuardar, libroEditar } )
{

    // Datos iniciales del formulario.
    const datosIniciales = {
        titulo: "",
        autor: "",
        categoria: "",
        precioFisico: "",
        precioVirtual: "",
        stock: "",
        imagen: "",
        descripcion: "",
        calificacion: 5,
        formatos: [ "Fisico", "Virtual" ],
        destacado: false,
        vendidos: 0
    };

    // Si estamos editando, carga los datos del libro.
    // Si estamos agregando, utiliza los datos vacíos.
    const [ libro, setLibro ] = useState( () =>
    {

        if ( libroEditar )
        {

            return {

                ...datosIniciales,

                ...libroEditar,

                precioFisico:

                    libroEditar.precioFisico ?? "",

                precioVirtual:

                    libroEditar.precioVirtual ?? "",

                stock:

                    libroEditar.stock ?? "",

                calificacion:

                    libroEditar.calificacion ?? 5,

                vendidos:

                    libroEditar.vendidos ?? 0,

                formatos:
                    Array.isArray( libroEditar.formatos )
                        ? libroEditar.formatos
                        : libroEditar.formatos
                            ? libroEditar.formatos.split( "," )
                            : [
                                "Fisico",
                                "Virtual"
                            ]

            };

        }


        return datosIniciales;

    } );


    // Vista previa de la imagen.
    const [ imagenPreview, setImagenPreview ] = useState(
        libroEditar?.imagen
            ? imagenUrl( libroEditar.imagen )
            : ""
    );

    const [ archivoImagen, setArchivoImagen ] = useState( null );

    // Archivo PDF del libro digital.
    const [ archivoPdf, setArchivoPdf ] = useState( null );

    const [ categorias, setCategorias ] = useState( [] );


    useEffect( () =>
    {
        fetch( `${API_URL}/categorias` )
            .then( respuesta => respuesta.json() )
            .then( datos => setCategorias( datos ) )
            .catch( error =>
            {
                console.error(
                    "Error al cargar categorías:",
                    error
                );
            } );

    }, [] );




    // Actualiza los campos del formulario.
    const cambiarCampo = ( e ) =>
    {

        const { name, value } = e.target;


        setLibro( ( anterior ) => ( {

            ...anterior,

            [ name ]: value

        } ) );

    };



    // Selecciona una imagen.
    const seleccionarImagen = ( e ) =>
    {

        const archivo = e.target.files[ 0 ];

        if ( !archivo ) return;

        setArchivoImagen( archivo );

        setImagenPreview( URL.createObjectURL( archivo ) );

    };



    // Elimina la imagen.
    const eliminarImagen = () =>
    {

        setImagenPreview( "" );

        setArchivoImagen( null );

        setLibro( ( anterior ) => ( {
            ...anterior,
            imagen: ""
        } ) );

    };


    // Selecciona el archivo PDF del libro.
    const seleccionarPdf = ( e ) =>
    {

        const archivo = e.target.files[ 0 ];

        if ( !archivo ) return;

        setArchivoPdf( archivo );

    };



    // Guarda el libro.
    const guardarLibro = ( e ) =>
    {

        e.preventDefault();

        const formData = new FormData();

        formData.append( "titulo", libro.titulo );
        formData.append( "autor", libro.autor );
        formData.append( "categoria", libro.categoria );

        formData.append( "precioFisico", Number( libro.precioFisico ) || 0 );
        formData.append( "precioVirtual", Number( libro.precioVirtual ) || 0 );

        formData.append( "stock", Number( libro.stock ) || 0 );
        formData.append( "stockVirtual", 0 );

        formData.append( "formatos", libro.formatos.join( "," ) );

        formData.append( "descripcion", libro.descripcion );

        formData.append( "calificacion", libro.calificacion );

        formData.append(
            "vendidos",
            libroEditar ? libroEditar.vendidos ?? 0 : 0
        );

        formData.append( "destacado", libro.destacado );

        if ( libroEditar )
        {
            formData.append(
                "activo",
                libro.activo !== undefined ? libro.activo : true
            );
        }

        if ( archivoImagen )
        {
            formData.append( "imagen", archivoImagen );
        }

        if ( archivoPdf )
        {
            formData.append( "archivo", archivoPdf );
        }

        onGuardar( formData );

    };



    return createPortal(

        <div className="modal-overlay">


            <div className="modal-container">


                {/* Encabezado */ }
                <div className="modal-header">

                    <h2>

                        {

                            libroEditar

                                ? "Editar libro"

                                : "Agregar libro"

                        }

                    </h2>


                    <button

                        type="button"

                        className="close-button"

                        onClick={ onClose }

                    >

                        <X size={ 20 } />

                    </button>

                </div>



                {/* Formulario */ }
                <form

                    className="modal-form"

                    onSubmit={ guardarLibro }

                >


                    {/* Título */ }
                    <div className="form-group">

                        <label>

                            Título

                        </label>


                        <input

                            type="text"

                            name="titulo"

                            value={ libro.titulo }

                            onChange={ cambiarCampo }

                            required

                        />

                    </div>



                    {/* Autor */ }
                    <div className="form-group">

                        <label>

                            Autor

                        </label>


                        <input

                            type="text"

                            name="autor"

                            value={ libro.autor }

                            onChange={ cambiarCampo }

                            required

                        />

                    </div>



                    {/* Categoría */ }
                    <div className="form-group">

                        <label>
                            Categoría
                        </label>

                        <select
                            name="categoria"
                            value={ libro.categoria }
                            onChange={ cambiarCampo }
                            required
                        >

                            <option value="">
                                Seleccione una categoría
                            </option>

                            {
                                categorias.map( categoria => (

                                    <option
                                        key={ categoria.id }
                                        value={ categoria.nombre }
                                    >

                                        { categoria.nombre }

                                    </option>

                                ) )
                            }

                        </select>

                    </div>



                    {/* Precio físico */ }
                    <div className="form-group">

                        <label>

                            Precio físico

                        </label>


                        <input

                            type="number"

                            name="precioFisico"

                            value={ libro.precioFisico }

                            onChange={ cambiarCampo }

                        />

                    </div>



                    {/* Precio virtual */ }
                    <div className="form-group">

                        <label>

                            Precio virtual

                        </label>


                        <input

                            type="number"

                            name="precioVirtual"

                            value={ libro.precioVirtual }

                            onChange={ cambiarCampo }

                        />

                    </div>



                    {/* Stock */ }
                    <div className="form-group">

                        <label>

                            Stock

                        </label>


                        <input

                            type="number"

                            name="stock"

                            value={ libro.stock }

                            onChange={ cambiarCampo }

                        />

                    </div>



                    {/* Imagen */ }
                    <div className="form-group">

                        <label>

                            Imagen

                        </label>


                        <input

                            type="file"

                            accept="image/*"

                            onChange={ seleccionarImagen }

                        />


                        {

                            imagenPreview && (

                                <div className="preview-image">

                                    <img

                                        src={ imagenPreview }

                                        alt="Vista previa"

                                    />


                                    <button

                                        type="button"

                                        className="remove-image"

                                        onClick={ eliminarImagen }

                                    >

                                        Eliminar imagen

                                    </button>

                                </div>

                            )

                        }

                    </div>



                    {/* Archivo digital (PDF) */ }
                    <div className="form-group">

                        <label>

                            Archivo digital (PDF)

                        </label>


                        <input

                            type="file"

                            accept="application/pdf"

                            onChange={ seleccionarPdf }

                        />


                        {
                            libroEditar?.archivo && !archivoPdf && (

                                <p className="pdf-info">

                                    Archivo actual: { libroEditar.archivo }

                                </p>

                            )
                        }

                        {
                            archivoPdf && (

                                <p className="pdf-info">

                                    Nuevo archivo: { archivoPdf.name }

                                </p>

                            )
                        }

                    </div>



                    {/* Descripción */ }
                    <div className="form-group full-width">

                        <label>

                            Descripción

                        </label>


                        <textarea

                            rows="4"

                            name="descripcion"

                            value={ libro.descripcion }

                            onChange={ cambiarCampo }

                        />

                    </div>



                    {/* Calificación */ }
                    <div className="form-group">

                        <label>

                            Calificación

                        </label>


                        <input

                            type="number"

                            name="calificacion"

                            step="0.1"

                            min="1"

                            max="5"

                            value={ libro.calificacion }

                            onChange={ cambiarCampo }

                        />

                    </div>



                    {/* Formato */ }
                    <div className="form-group">

                        <label>

                            Formato

                        </label>


                        <select

                            value={

                                libro.formatos.length === 2

                                    ? "Ambos"

                                    : libro.formatos[ 0 ]

                            }

                            onChange={ ( e ) =>
                            {

                                const valor = e.target.value;


                                setLibro( ( anterior ) => ( {

                                    ...anterior,

                                    formatos:

                                        valor === "Ambos"

                                            ?

                                            [

                                                "Fisico",
                                                "Virtual"

                                            ]

                                            :

                                            [

                                                valor

                                            ]

                                } ) );

                            } }

                        >

                            <option value="Fisico">

                                Físico

                            </option>


                            <option value="Virtual">

                                Virtual

                            </option>


                            <option value="Ambos">

                                Ambos

                            </option>

                        </select>

                    </div>



                    {/* Destacado */ }
                    <div className="form-group checkbox-group">

                        <label>

                            <input

                                type="checkbox"

                                checked={ libro.destacado }

                                onChange={ ( e ) =>

                                    setLibro( ( anterior ) => ( {

                                        ...anterior,

                                        destacado:

                                            e.target.checked

                                    } ) )

                                }

                            />


                            Destacado

                        </label>

                        { libroEditar && (

                            <label>

                                <input

                                    type="checkbox"

                                    checked={ libro.activo !== false }

                                    onChange={ ( e ) =>

                                        setLibro( ( anterior ) => ( {

                                            ...anterior,

                                            activo: e.target.checked

                                        } ) )

                                    }

                                />

                                Activo

                            </label>

                        ) }

                    </div>



                    {/* Botones */ }
                    <div className="modal-buttons">


                        <button

                            type="button"

                            className="cancel-button"

                            onClick={ onClose }

                        >

                            Cancelar

                        </button>



                        <button

                            type="submit"

                            className="save-button"

                        >

                            {

                                libroEditar

                                    ? "Guardar cambios"

                                    : "Guardar"

                            }

                        </button>


                    </div>


                </form>


            </div>


        </div>,

        document.body

    );

}


export default LibroModal;