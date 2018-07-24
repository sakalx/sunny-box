import React from 'react';

import geographyMap from 'root/static/world-map.json';
import countriesList from 'root/static/countries';

import moment from 'moment-timezone';

console.log(moment.tz.guess());
console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)

import {ZoomableGroup, Geographies, Geography} from 'react-simple-maps';
import {Motion} from 'react-motion';

import CountryInfo from './country-info';

import {
  ComponentMap,
  CountryName,
  geographyStyle,
  Head,
  motionStyle,
  tooltipStyle,
  Wrap,
  WrapMap,
  ZoomOutButton,
  ZoomOutIcon,
} from './style';

class WorldMap extends React.PureComponent {
  state = {
    selectedCountry: {
      label: '',
      code: '',
    },
    center: [0, 20],
    zoom: 1,
    tooltip: '',
    tooltipPosition: [0, 0],
    disableOptimization: false,
  };

  handleZoomOut = () => {
    this.setState({
      zoom: 1,
      center: [0, 20],
    });
  };


  handleCountryClick = ({properties}) => {
    const country = countriesList.find(({country_code}) =>
      country_code === properties['Alpha-2']
    );

    this.setState({
        selectedCountry: {
          label: country.label,
          code: country.country_code,
        },
        center: [country.latlng[1], country.latlng[0]],
        zoom: 2,
        disableOptimization: true,
        tooltip: '',
      },
      () => {
        this.setState({disableOptimization: false})
      }
    );
  };

  handleMove = ({properties}, event) => {
    const x = event.clientX;
    const y = event.clientY + window.pageYOffset;

    this.setState({
      tooltipPosition: [x, y],
      tooltip: properties.name,
    });
  };

  render() {
    const {
      center,
      disableOptimization,
      selectedCountry,
      tooltip,
      tooltipPosition,
      zoom,
    } = this.state;

    return (
      <Wrap>
        <WrapMap>
          <Head>
            <CountryName variant="display1">
              {selectedCountry.label}
            </CountryName>
            {zoom > 1 &&
            <ZoomOutButton
              aria-label="Zoom-out-map"
              onClick={this.handleZoomOut}
            >
              <ZoomOutIcon/>
            </ZoomOutButton>
            }
          </Head>

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
                      geographies.map((geography) => {
                        const isSelected = selectedCountry.code === geography.properties['Alpha-2'];

                        return (
                          <Geography
                            key={geography.properties.name}
                            geography={geography}
                            projection={projection}
                            onMouseMove={this.handleMove}
                            onMouseLeave={() => this.setState({tooltip: ''})}
                            style={geographyStyle(isSelected)}
                            onClick={this.handleCountryClick}
                          />
                        )
                      })
                    }
                  </Geographies>
                </ZoomableGroup>
              </ComponentMap>
            )}
          </Motion>

          <h5 style={tooltipStyle(tooltipPosition)}>
            {tooltip}
          </h5>
        </WrapMap>

        <CountryInfo/>
      </Wrap>
    )
  }
}

export default WorldMap