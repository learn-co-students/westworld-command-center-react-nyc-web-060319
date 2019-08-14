import React from 'react';
import { Grid } from 'semantic-ui-react';
import '../stylesheets/Area.css'
import Host from './Host'

function renderHosts(hosts, coldStorageClickHandler) {
  return hosts.map(host => {
    return <Host key={`host-area-${host.id}`} host={host} clickHandler={(event, data, item) => {
      coldStorageClickHandler(event, data, item);
    }} />
  })
}

const Area = (props) => (
  
  <div className='area' id={props.name}>
    <h3 className='labels'>{/* Don't just pass in the name from the data...clean that thing up */
      // no, fuck you.
      props.name
  }</h3>
    <Grid key={`${props.name}-map`} container={true}>
      {renderHosts(props.hosts, props.coldStorageClickHandler)}
    </Grid>
  </div>

)

Area.propTypes = {
  hosts: function(props, propName, componentName){
    if(props.hosts.length > props.limit){
      throw Error(
        `HEY!! You got too many hosts in ${props.name}. The limit for that area is ${props.limit}. You gotta fix that!`
      )
    }
  }
}

export default Area;
