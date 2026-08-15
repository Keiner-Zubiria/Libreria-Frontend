import "./FilterBar.css";

function FilterBar( {
  category,
  setCategory,
  categorias = [],
  order,
  setOrder,
  price,
  setPrice
} )
{

  return (

    <div className="filter-bar">


      {/* Categorías */ }

      <select

        value={ category }

        onChange={ ( e ) =>
          setCategory( e.target.value )
        }

      >

        <option value="">

          Todas las categorías

        </option>


        { categorias.map( ( item ) => (
          <option
            key={ item.id }
            value={ item.nombre }
          >
            { item.nombre }
          </option>
        ) ) }

      </select>



      {/* Orden */ }

      <select

        value={ order }

        onChange={ ( e ) =>
          setOrder( e.target.value )
        }

      >

        <option value="">

          Ordenar por

        </option>

        <option value="destacados">

          Más destacados

        </option>

        <option value="ventas">

          Más vendidos

        </option>

        <option value="precio-menor">

          Precio menor a mayor

        </option>

        <option value="precio-mayor">

          Precio mayor a menor

        </option>

        <option value="az">

          Nombre A-Z

        </option>

        <option value="za">

          Nombre Z-A

        </option>

      </select>



      {/* Precio */ }

      <select

        value={ price }

        onChange={ ( e ) =>
          setPrice( e.target.value )
        }

      >

        <option value="">

          Todos los precios

        </option>

        <option value="40">

          Menos de $40.000

        </option>

        <option value="60">

          $40.000 - $60.000

        </option>

        <option value="80">

          $60.000 - $80.000

        </option>

        <option value="100">

          Más de $80.000

        </option>

      </select>


    </div>

  );

}


export default FilterBar;