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
    // console.log(newHosts);
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

  getActiveHosts = () => {
    const hosts = this.getHosts();
    return hosts.filter(host => {
      return host.active
    })
  }

  getInactiveHosts = () => {
    return this.getHosts().filter(host => {
      return !(host.active);
    })
  }

  getSelected = () => {
    return this.state.selected
  }


  countInArea = (hosts, area) => {
    let count = 0;
    for (let i = 0; i < hosts.length; i++) {
      if ((hosts[i].active) && (hosts[i].area === area)) {
        count += 1;
      }
    }
    return count;
  }
  moveHost = (host, targetArea) => {
    console.log("moving host: ", host);
    console.log("to area: ", targetArea);
    const hosts = this.getHosts();
    const found = hosts.findIndex(hostInHosts => {
      return hostInHosts.id === host.id;
    })
    console.assert(found !== -1);
    if (found === -1) {
      console.error("hmmm. Logic error.");
      debugger;
    }
    // const count = this.countInArea(hosts, targetArea);
    const area = this.getAreas().find(area => area.name === targetArea);
    console.assert(area !== undefined);
    if (area === undefined) {
      console.error("Hmm. Logic error.");
    }
    hosts[found].area = targetArea;
    console.log("new host state: ", hosts[found]);
    this.setState({hosts});
    // if (area.limit > count) {
    //   return true;
    // }
    // else {
    //   alert(`Host limit in ${targetArea} reached. Host not moved.`);
    //   return false;
    // }
  }

  toggleActive = (host, newActive) => {
    console.log("setting host: ", host);
    console.log("to active state: ", newActive);
    const hosts = this.getHosts();
    const found = hosts.findIndex(hostInHosts => {
      return hostInHosts.id === host.id;
    })
    console.assert(found !== -1);
    if (found === -1) {
      console.error("hmmm. Logic error.");
      debugger;
    }
    const count = this.countInArea(hosts, host.area);
    const area = this.getAreas().find(area => area.name === host.area);
    console.assert(area !== undefined);
    if (area === undefined) {
      console.error("Hmm. Logic error.");
    }
    if (area.limit > count) {
      // hosts[found].area = targetArea;
      // console.log("new host state: ", hosts[found]);
      // this.setState({hosts});
      // return true;
      hosts[found].active = newActive;
      console.log("new host state: ", hosts[found]);
      this.setState({hosts});
      }
    else {
      alert(`Host limit in ${host.area} reached. Host not moved.`);
      return false;
    }

    // hosts[found].active = newActive;
    // console.log("new host state: ", hosts[found]);
    // this.setState({hosts});
  }

  coldStorageClickHandler = (event, data, item) => {
    // console.log("not implemented yet")
    // console.log(data);
    // const thisID = data.id;
    // const clickedItem = this.state.hosts
    // const hosts = this.getHosts()
    // const thisSelected = hosts.findIndex(host => host.id === thisID);
    // console.log(item);
    // console.log(this.state.selected)
    // if (this.state.selected != null) {
      // const oldSelected = hosts.findIndex(host => this.state.selected.props.host.id === host.id);
      // this.state.selected.setState({selected: false})
    // }
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
        <WestworldMap
          getActiveHosts={this.getActiveHosts.bind(this)}
          getAreas={this.getAreas.bind(this)}
          coldStorageClickHandler={this.coldStorageClickHandler.bind(this)}
        />
        <br />
        <br />
        <br />
        <Headquarters
          getInactiveHosts={this.getInactiveHosts.bind(this)}
          coldStorageClickHandler={this.coldStorageClickHandler.bind(this)}
          getSelected={this.getSelected.bind(this)}
          getAreas={this.getAreas.bind(this)}
          moveHost={this.moveHost}
          toggleActive={this.toggleActive}
          host={this.state.selected}
          />
      </Segment>
    )
  }
}

export default App;
