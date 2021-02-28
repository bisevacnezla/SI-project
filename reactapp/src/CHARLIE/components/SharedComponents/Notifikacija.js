import React from 'react'

const Notifikacija = (props) => {
  return (<div style={{backgroundColor:props.background}}>
    {props.poruka}
    <i className="fas fa-times" style={{float:'right'}}
      onClick={props.onClick}
    />
  </div>)
}

export default Notifikacija