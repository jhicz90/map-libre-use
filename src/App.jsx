import { useState } from 'react'
import MapWithGeoman from './MapWithGeoman';

function App() {
  const [useVector, setUseVector] = useState(false);

  return (
    <div>
      <h2>Mapa con Geoman (Raster o Vector)</h2>
      <button onClick={() => setUseVector(!useVector)}>
        Cambiar a {useVector ? 'Raster' : 'Vector'}
      </button>
      <MapWithGeoman useVector={useVector} />
    </div>
  );
}

export default App
