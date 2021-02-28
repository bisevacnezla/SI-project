import React from "react";
import LicniPod from "./licniPod";
import kontakt from "./kontaktPod";

class Profil extends React.Component {
    constructor() {
        super();
        this.state = {
            selected: 0 //indeks odabranog taba
        };
    }
    _renderContent() {
        return (
            <div className="tab-content">
                {this.props.children[this.state.selected]}
            </div>
        );
    }
    setTab(index) {
        this.setState({
          selected: index,
        });
      }
    _renderLabels() {
        return (
            <ul className="nav nav-tabs">
                {this.props.children.map((child, index) =>
                    <li className="nav-item">
                        <a key={child.props.label} className="nav-link" data-toggle="tab" href={"#"+child.props.label} onClick={() => { this.setTab(index) }}> {child.props.label}</a>
                    </li>
                )}
            </ul>
        );
    }

    render() {
        return (
            <div>
                {this._renderLabels()}
                {this._renderContent()}
            </div>
        );
    }
}

export default Profil;