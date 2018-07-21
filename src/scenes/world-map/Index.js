import React from 'react';

import {
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
} from 'react-simple-maps';
import {Motion} from 'react-motion';
import geographyMap from 'root/static/world-map.json';

import {
  geographyStyle,
  motionStyle,
  Wrap,
  ComponentMap,
} from './style';

const cities = [
  {name: "Zurich", coordinates: [8.5417, 47.3769]},
  {name: "Singapore", coordinates: [103.8198, 1.3521]},
  {name: "San Francisco", coordinates: [-122.4194, 37.7749]},
  {name: "Sydney", coordinates: [151.2093, -33.8688]},
  {name: "Lagos", coordinates: [3.3792, 6.5244]},
  {name: "Buenos Aires", coordinates: [-58.3816, -34.6037]},
  {name: "Shanghai", coordinates: [121.4737, 31.2304]},
];


class WorldMap extends React.PureComponent {
  state = {
    center: [0, 20],
    zoom: 1,
    selectedCountry: '',
    disableOptimization: false,
  };

  handleZoomIn = () => this.setState({zoom: this.state.zoom * 2});

  handleZoomOut = () => this.setState({zoom: this.state.zoom / 2,});

  /*  handleCountryClick = coordinates => this.setState({
      center: coordinates,
      zoom: 2,
    });*/

  handleCountryClick = ({properties}) => {
    this.setState({
        selectedCountry: properties.name,
        disableOptimization: true,
      },
      () => {
        this.setState({
          disableOptimization: false,
        })
      }
    );

  };

  handleReset = () => this.setState({
    center: [0, 20],
    zoom: 1,
  });

  handleMove = (geography, evt) => {
    // console.log(geography);

    /*   const x = evt.clientX
       const y = evt.clientY + window.pageYOffset;
       this.props.dispatch(
         show({
           origin: { x, y },
           content: geography.properties.name,
         })
       )*/
  };

  handleLeave = () => {
    //this.props.dispatch(hide())
  };

  render() {
    const {zoom, center, selectedCountry, disableOptimization} = this.state;
    let dummy;


    return (
      <Wrap>
        {/*    <button onClick={this.handleZoomIn}>
          {"Zoom in"}
        </button>
        <button onClick={this.handleZoomOut}>
          {"Zoom out"}
        </button>
        <button onClick={this.handleReset}>
          {"Reset"}
        </button>*/}
        <Motion
          defaultStyle={motionStyle.default}
          style={motionStyle.motion(zoom, center)}
        >
          {({zoom, x, y}) => (
            <ComponentMap
              projectionConfig={{scale: 205}}
              width={980}
              height={551}
            >
              <ZoomableGroup center={[x, y]} zoom={zoom}>
                <Geographies
                  disableOptimization={disableOptimization}
                  geography={geographyMap}>
                  {(geographies, projection) =>
                    geographies.map((geography, index) => {
                      const isSelected = selectedCountry === geography.properties.name;

                      return (
                        geography.id !== "010" && (
                          <Geography
                            key={String(index)}
                            geography={geography}
                            projection={projection}
                            onMouseMove={this.handleMove}
                            onMouseLeave={this.handleLeave}
                            style={geographyStyle(isSelected)}
                            onClick={this.handleCountryClick}
                          />
                        )
                      )
                    })
                  }

                </Geographies>
                {/*  <Markers>
                  {cities.map((city, i) => (
                    <Marker
                      key={i}
                      marker={city}
                      onClick={this.handleCityClick}
                    >
                      <circle
                        cx={0}
                        cy={0}
                        r={6}
                        fill="#FF5722"
                        stroke="#DF3702"
                      />
                    </Marker>
                  ))}
                </Markers>*/}
              </ZoomableGroup>
            </ComponentMap>
          )}
        </Motion>
      </Wrap>
    )
  }
}

export default WorldMap