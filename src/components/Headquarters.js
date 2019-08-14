import React, { Component } from 'react';
import '../stylesheets/Headquarters.css';
import { Grid } from 'semantic-ui-react';
import Details from './Details'
import ColdStorage from './ColdStorage.js'
import LogPanel from './LogPanel.js'

class Headquarters extends Component {
  // Remember, there's many ways to do this. This doesn't have to be a class component. It's up to you.

  // hostClickHandler = (event) => {

  // }

  render(){
    console.log("headquarters render host: ", (this.props.host !== null) ? this.props.host.props.host : null)
    return(
      <Grid celled='internally'>
        <Grid.Column width={8}>
        <ColdStorage
          coldStorageClickHandler={this.props.coldStorageClickHandler}
          getInactiveHosts={this.props.getInactiveHosts}
        />
        {/* Something goes here.... */}

        </Grid.Column>
        <Grid.Column width={5}>
          <Details 
            getSelected={this.props.getSelected}
            getAreas={this.props.getAreas}
            moveHost={this.props.moveHost}
            toggleActive={this.props.toggleActive}
            host={this.props.host}
            // madness below.
            checked={(this.props.host !== null) ? this.props.host.props.host.active : false}
            />
        </Grid.Column>
        <Grid.Column width={3}>

        <LogPanel />
        {/* and here. Take visual cues from the screenshot/video in the Readme. */}

        </Grid.Column>
      </Grid>
    )
  }
}

export default Headquarters;
