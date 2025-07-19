export default function SectorSearch({ busqueda, setBusqueda, handleBuscar }) {
  return (
    <div className="buscador">
      <input
        type="text"
        placeholder="Buscar sector..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        onKeyDown={handleBuscar}
      />
    </div>
  )
}
