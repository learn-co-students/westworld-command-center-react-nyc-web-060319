import React, { Component } from 'react';
import './stylesheets/App.css'
import { Segment } from 'semantic-ui-react';
import WestworldMap from './components/WestworldMap.js'
import Headquarters from './components/Headquarters.js'

const SERVER_URL = "http://localhost:4000";

class App extends Component {

  state = {
    hosts: [{}],
    selected: null
  }

  async fetchHosts() {
    const resp = await fetch(`${SERVER_URL}/hosts`);
    const parsed = await resp.json();
    return parsed;
  }

  async componentDidMount() {
    const newHosts = await this.fetchHosts();
    console.log(newHosts);
    this.setState({hosts: newHosts});
    this.fetchAreas();
  }

  async fetchAreas() {
    const resp = await fetch(`${SERVER_URL}/areas`);
    const parsed = await resp.json();
    this.setState({areas: parsed})
    // return await parsed;
  }

  getAreas() {
    return this.state.areas
  }

  // async getAreas() {
  //   return await this.fetchAreas();
  // }
  // As you go through the components given you'll see a lot of functional components.
  // But feel free to change them to whatever you want.
  // It's up to you whether they should be stateful or not.
  getHosts = () => {
    return [...this.state.hosts];
  }

  // getSelected = () => {
  //   return this.state.selected;
  // }

  getSelected = () => {
    return this.state.selected
  }


  coldStorageClickHandler = (event, data, item) => {
    // console.log("not implemented yet")
    console.log(data);
    // const thisID = data.id;
    // const clickedItem = this.state.hosts
    // const hosts = this.getHosts()
    // const thisSelected = hosts.findIndex(host => host.id === thisID);
  
    if (this.state.selected != null) {
      // const oldSelected = hosts.findIndex(host => this.state.selected.props.host.id === host.id);
      this.state.selected.setState({selected: false})
    }
    this.setState({
      selected: item,
    })
    // console.log(event.target);
    // console.log(event.target.value);
    // console.log(data.key);

  }

  render(){
    return (
      <Segment id='app'>
        {/* What components should go here? Check out Checkpoint 1 of the Readme if you're confused */}
        <WestworldMap getHosts={this.getHosts}/>
        <Headquarters
          getHosts={this.getHosts}
          coldStorageClickHandler={this.coldStorageClickHandler.bind(this)}
          getSelected={this.getSelected.bind(this)}
          getAreas={this.getAreas.bind(this)}
          />
      </Segment>
    )
  }
}

export default App;
