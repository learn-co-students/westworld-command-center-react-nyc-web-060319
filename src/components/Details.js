import React from 'react'
import { Segment, Image } from 'semantic-ui-react'
import * as Images from '../services/Images'
import HostInfo from './HostInfo.js'

class Details extends React.Component {
  // We'll render the logo if no host is selected. But if a host does get selected....
  // Watch the video to see how this works in the app.

  renderSomething = () => {
    console.log("rendering details, props.checked: ", this.props.checked);
    return ((this.props.host !== null) ?
      <HostInfo
        // key={`host-detail-${this.props.getSelected().name}`}
        host={this.props.host}
        getAreas={this.props.getAreas}
        moveHost={this.props.moveHost}
        toggleActive={this.props.toggleActive}
        // host={this.props.selected}
        checked={this.props.checked}
      /> : 
      <Image size='medium' src={Images.westworldLogo}/>
      )
  }

  render() {
    return(
      <Segment id="details" className="HQComps">
        {this.renderSomething()}
      </Segment>
    )
    };
}

export default Details
