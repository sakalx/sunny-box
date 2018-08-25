import React from 'react';
import Pulse from "root/components/pulse";

import cacheConfig from 'root/config/cache';
import {getCache} from 'root/api';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setStationsByCountry} from 'root/redux-core/actions/stations';


import {ZoomableGroup, Geographies, Geography} from 'react-simple-maps';
import {Motion} from 'react-motion';

/*import Pulse from 'root/components/pulse';*/
import CountryTabs from '../country-tabs';
import CountryInfo from '../country-info';

import {
  ComponentMap,
  CountryName,
  geographyStyle,
  Head,
  motionStyle,
  tooltipStyle,
  WraMapTitle,
  Wrap,
  WrapMap,
  ZoomOutButton,
  ZoomOutIcon,
} from './style';

let geo = null;

class WorldMap extends React.PureComponent {
  state = {
    center: [0, 20],
    disableOptimization: false,
    selectedCountry: this.props.countries.list[this.props.countries.index],
    tooltip: '',
    tooltipPosition: [0, 0],
    zoom: 1,
  };

  componentDidMount() {
    getCache(cacheConfig.geographyMap).then(geoCache => geo = geoCache)
  }

  handleZoomOut = () => {
    this.setState({
      zoom: 1,
      center: [0, 20],
    });
  };

  handleCountryClick = ({properties}) => {
    const {countries, setStationsByCountry} = this.props;
    const index = countries.list.indexOf(properties.name);

    if (index >= 0) {
      setStationsByCountry(index);

      this._moving(properties);
    }
  };

  handleCountryTabClick = country => {
    const {geometries} = geo.objects.countries1;

    const properties = geometries.find(({properties}) =>
      properties.name === country).properties;

    this._moving(properties);
  };

  handleMoveTooltip = ({properties}, event) => {
    const x = event.clientX;
    const y = event.clientY + window.pageYOffset;

    this.setState({
      tooltipPosition: [x, y],
      tooltip: properties.name,
    });
  };

  _moving = properties =>
    this.setState({
        center: [properties.latlng[1], properties.latlng[0]],
        disableOptimization: true,
        selectedCountry: properties.name,
        tooltip: '',
        zoom: 2,
      },
      () => {
        this.setState({disableOptimization: false})
      }
    );

  render() {
    const {countries, stations} = this.props;
    const {
      center,
      disableOptimization,
      selectedCountry,
      tooltip,
      tooltipPosition,
      zoom,
    } = this.state;


    const countryName = countries.list[countries.index];

    return (
      <React.Fragment>
        <CountryTabs onTabClick={this.handleCountryTabClick}/>
        <Wrap>
          <WrapMap>
            <Head>
              {stations.fetching
                ? <WraMapTitle><Pulse/></WraMapTitle>
                : <CountryName color="textSecondary" variant="headline">
                  {countryName}
                </CountryName>
              }
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
                      geography={geo}>
                      {(geographies, projection) =>
                        geographies.map((geography) => {
                          const isSelected = selectedCountry === geography.properties.name;
                          const hasStations = countries.list.includes(geography.properties.name);

                          return (
                            <Geography
                              key={geography.properties.name}
                              geography={geography}
                              projection={projection}
                              onMouseMove={this.handleMoveTooltip}
                              onMouseLeave={() => this.setState({tooltip: ''})}
                              style={geographyStyle(isSelected, hasStations)}
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
      </React.Fragment>

    )
  }
}

const mapStateToProps = ({countries, stations}) => ({
  countries,
  stations,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setStationsByCountry,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WorldMap);