import React from 'react';
import { Segment } from 'semantic-ui-react'
import Host from './Host.js'

class ColdStorage extends React.Component {

  // constructor() {
  //   super();
  //   // this.state.hosts = this.props.hosts;
  // }

  // state = {hosts: []};

  renderHosts = () => {
    const hosts = this.props.getHosts();
    // console.log(hosts);
    if (hosts.length === 0) {
      console.log("no hosts");
      return null;
    }

    return hosts.map(host => {
      // console.log(host.id);
      return <Host key={`host-${host.id}`} host={host} clickHandler={this.props.coldStorageClickHandler} />
    });
  }
/* Cold Storage contains hosts....but how? Directly? Or is there something else we could use to contain them... */

  render() {
    return(

      <Segment.Group className="HQComps">
      <Segment compact>
        <h3 className="labels">ColdStorage</h3>
      </Segment>
      <Segment compact>
        {this.renderHosts()}
        

      </Segment>
    </Segment.Group>
    );
  }
}

export default ColdStorage
