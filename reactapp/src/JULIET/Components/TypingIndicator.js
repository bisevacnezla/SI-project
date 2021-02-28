import React, { Component } from 'react'
class TypingIndicator extends Component {
    render(){
        if (this.props.typingUsers.length > 0) {
            return (
              <div style={divStyle}>
                {this.props.typingUsers.join(', ') + ' pišu...' }
              </div>
            )
          }
        return (
            <div> {''} </div>
        )
    }
}

const divStyle = {
    // border: '1px solid #fcfcfc',
    marginTop: '0px',
    fontSize: '12px',
    color: 'rgb(0,0,0,0.5)',
    padding: '4px 10px',
    height: '20px'
}

export default TypingIndicator