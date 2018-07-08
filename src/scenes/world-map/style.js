import React from 'react';

import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';

class WorldMap extends React.PureComponent {
  render() {
    return (
      <div>
        <ComposableMap>
          <ZoomableGroup>
            <Geographies geography={ "/path/to/your/topojson-map-file.json or geography object" }>
              {(geographies, projection) => geographies.map(geography => (
                <Geography
                  key={ geography.id }
                  geography={ geography }
                  projection={ projection }
                />
              ))}
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    )
  }
}

export default WorldMap