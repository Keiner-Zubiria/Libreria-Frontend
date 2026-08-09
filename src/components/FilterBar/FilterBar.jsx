import "./FilterBar.css";

function FilterBar({
  category,
  setCategory,
  order,
  setOrder,
  price,
  setPrice,
}) {
  return (
    <div className="filter-bar">
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Todas las categorías</option>

        <option value="Novela">Novela</option>

        <option value="Tecnología">Tecnología</option>

        <option value="Ciencia">Ciencia</option>

        <option value="Historia">Historia</option>

        <option value="Desarrollo personal">Desarrollo personal</option>

        <option value="Fantasía">Fantasía</option>

        <option value="Ciencia ficción">Ciencia ficción</option>
      </select>

      <select value={order} onChange={(e) => setOrder(e.target.value)}>
        <option value="">Ordenar por</option>

        <option value="destacados">Más destacados</option>

        <option value="ventas">Más vendidos</option>

        <option value="precio-menor">Precio menor a mayor</option>

        <option value="precio-mayor">Precio mayor a menor</option>

        <option value="az">Nombre A-Z</option>

        <option value="za">Nombre Z-A</option>
      </select>

      <select value={price} onChange={(e) => setPrice(e.target.value)}>
        <option value="">Todos los precios</option>

        <option value="40">Menos de $40.000</option>

        <option value="60">$40.000 - $60.000</option>

        <option value="80">$60.000 - $80.000</option>

        <option value="100">Más de $80.000</option>
      </select>
    </div>
  );
}

export default FilterBar;
