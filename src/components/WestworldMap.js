import React from 'react';
import { Segment } from 'semantic-ui-react';
import Area from './Area'

class WestworldMap extends React.Component {

  renderAreas = () => {
    const areas = this.props.getAreas();
    const hosts = this.props.getActiveHosts();
    // console.log(hosts);
    if (areas !== undefined && areas.length > 0) {
      return areas.map(area => {
        const thisAreaHosts = hosts.filter(host => {
          // GODDAMNIT IT HAS TO BE area.name
          return host.area === area.name;
        })
        return <Area
          key={`${area.name}-map`}
          name={area.name}
          hosts={thisAreaHosts}
          coldStorageClickHandler={this.props.coldStorageClickHandler}
        />
      })  
    }
    return null;
  }

  render() {
    // console.log(this.props.getAreas())
    return (
      <Segment id="map" >
        {this.renderAreas()}
      </Segment>
    )
  }
}

export default WestworldMap
