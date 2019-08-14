import React from 'react';
import '../stylesheets/Host.css'
import { Card } from 'semantic-ui-react'

class Host extends React.Component {
  state = {
    selected: false
  }

  thisClick = (event, data) => {
    this.setState({selected: !this.state.selected})
    this.props.clickHandler(event, data, this);
  }

  render() {
    return(
    <Card
      className={`host ${this.state.selected ? 'selected' : ''}`}
      // key={`host-card-${this.props.id}`}
      /* NOTE: The className "host selected" renders a different style than simply "host". */
      onClick={this.thisClick}
      image={this.props.host.imageUrl}
      id={this.props.host.id}
      raised
    />
    );
  }
}

export default Host
