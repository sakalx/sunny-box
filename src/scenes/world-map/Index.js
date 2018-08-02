import React from 'react';

import cacheConfig from 'root/config/cache';
import waitFetching from 'root/helpers/cache';
import Base64Decode from 'root/helpers/decoder-base64';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getCountryStations} from 'root/redux-core/actions';

import {ZoomableGroup, Geographies, Geography} from 'react-simple-maps';
import {Motion} from 'react-motion';

import CountryTabs from '../country-tabs';
import CountryInfo from '../country-info';

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
    center: [0, 20],
    disableOptimization: false,
    geo: null,
    selectedCountry: this.props.currentCountry.label,
    tooltip: '',
    tooltipPosition: [0, 0],
    zoom: 1,
  };

  componentDidMount() {
    const {geographyMap} = cacheConfig;
    const geographyMapCache = localStorage.getItem(geographyMap.key);

    if (geographyMapCache) {
      this.setState({geo: Base64Decode(geographyMapCache)});
    } else {
      waitFetching(geographyMap.key).then(value => {
        this.setState({geo: Base64Decode(value)})
      })
    }
  }

  handleZoomOut = () => {
    this.setState({
      zoom: 1,
      center: [0, 20],
    });
  };

  handleCountryClick = ({properties}) => {
    const {countryList, getCountryStations} = this.props;
    const index = countryList.indexOf(properties.name);

    if (index >= 0) {
      getCountryStations(properties.name);

      this._moving(properties);
    }
  };

  handleCountryTabClick = country => {
    const {geometries} = this.state.geo.objects.countries1;

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
    const {countryList, currentCountry} = this.props;
    const {
      center,
      disableOptimization,
      geo,
      selectedCountry,
      tooltip,
      tooltipPosition,
      zoom,
    } = this.state;

    if (!geo) {
      return <span>Loading ...</span>
    }

    return (
      <React.Fragment>
        <CountryTabs onTabClick={this.handleCountryTabClick}/>
        <Wrap>
          <WrapMap>
            <Head>
              <CountryName color="textSecondary" variant="headline">
                {currentCountry.label}
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
                      geography={geo}>
                      {(geographies, projection) =>
                        geographies.map((geography) => {
                          const isSelected = selectedCountry === geography.properties.name;
                          const hasStations = countryList.includes(geography.properties.name);

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

const mapStateToProps = ({sunny: {countryList, currentCountry}}) => ({
  countryList,
  currentCountry,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getCountryStations,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WorldMap);