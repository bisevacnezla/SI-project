import React from "react";

class PopUp extends React.Component {
  render() {
    return (
      <div className={this.props.class} style={this.props.style}>
        <strong>{this.props.boldiraniTekst}</strong> <br />
        {this.props.ostaliTekst}
      </div>
    );
  }
}

export default PopUp;