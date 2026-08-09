import "./LibroModal.css";

import { useState } from "react";

import { X } from "lucide-react";


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

        formatos: [

            "Fisico",
            "Virtual"

        ],

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

                    libroEditar.formatos ||

                    [

                        "Fisico",
                        "Virtual"

                    ]

            };

        }


        return datosIniciales;

    } );


    // Vista previa de la imagen.
    const [ imagenPreview, setImagenPreview ] = useState(

        libroEditar?.imagen || ""

    );



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


        if ( !archivo )
        {

            return;

        }


        const reader = new FileReader();


        reader.onload = () =>
        {

            const imagen = reader.result;


            setImagenPreview( imagen );


            setLibro( ( anterior ) => ( {

                ...anterior,

                imagen

            } ) );

        };


        reader.readAsDataURL( archivo );

    };



    // Elimina la imagen.
    const eliminarImagen = () =>
    {

        setImagenPreview( "" );


        setLibro( ( anterior ) => ( {

            ...anterior,

            imagen: ""

        } ) );

    };



    // Guarda el libro.
    const guardarLibro = ( e ) =>
    {

        e.preventDefault();


        /*
         * Si estamos editando:
         * conserva el mismo ID.
         *
         * Si estamos agregando:
         * genera un ID nuevo.
         */
        const id =

            libroEditar

                ? libroEditar.id

                : Date.now();



        const libroGuardado = {

            ...libro,

            id,


            precioFisico:

                Number( libro.precioFisico ) || 0,


            precioVirtual:

                Number( libro.precioVirtual ) || 0,


            stock:

                Number( libro.stock ) || 0,


            stockVirtual:

                Infinity,


            formatos:

                libro.formatos,


            /*
             * Al editar conserva la cantidad de vendidos.
             *
             * Al agregar empieza en cero.
             */
            vendidos:

                libroEditar

                    ? ( libroEditar.vendidos || 0 )

                    : 0,


            destacado:

                libro.destacado

        };


        onGuardar( libroGuardado );

    };



    return (

        <div className="modal-overlay">


            <div className="modal-container">


                {/* Encabezado */}
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



                {/* Formulario */}
                <form

                    className="modal-form"

                    onSubmit={ guardarLibro }

                >


                    {/* Título */}
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



                    {/* Autor */}
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



                    {/* Categoría */}
                    <div className="form-group">

                        <label>

                            Categoría

                        </label>


                        <input

                            type="text"

                            name="categoria"

                            value={ libro.categoria }

                            onChange={ cambiarCampo }

                            required

                        />

                    </div>



                    {/* Precio físico */}
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



                    {/* Precio virtual */}
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



                    {/* Stock */}
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



                    {/* Imagen */}
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



                    {/* Descripción */}
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



                    {/* Calificación */}
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



                    {/* Formato */}
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



                    {/* Destacado */}
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

                    </div>



                    {/* Botones */}
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


        </div>

    );

}


export default LibroModal;