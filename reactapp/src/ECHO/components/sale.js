import React, { Component } from "react";
import DodajNovuSalu from "./DodajNovuSalu";
import PrikaziSaleForma from "./PrikaziSaleForma";
class Sale extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMeniId: 1,
      styles: ["active", ""],
      isActive: ["true", "false"]
    };
  }
  changeActiveId = id => {
    const styles2 = [];
    const isActive2 = [];
    if (id == 1) {
      styles2.push("active");
      isActive2.push("true");

      styles2.push("");
      isActive2.push("false");
    } else {
      styles2.push("");
      isActive2.push("false");

      styles2.push("active");
      isActive2.push("true");
    }

    this.setState({
      activeMeniId: id,
      styles: styles2,
      isActive: isActive2
    });
  };
  render() {
    return (
      <main>
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a
              class={"nav-link " + this.state.styles[0]}
              aria-selected={this.state.isActive[0]}
              data-toggle="tab"
              href="#"
              onClick={() => this.changeActiveId(1)}
            >
              Unos sale
            </a>
          </li>
          <li class="nav-item">
            <a
              class={"nav-link " + this.state.styles[1]}
              aria-selected={this.state.isActive[1]}
              data-toggle="tab"
              href="#"
              onClick={() => this.changeActiveId(2)}
            >
              Prikaz sale
            </a>
          </li>
        </ul>

        <div
          id="unosSaleDiv"
          style={{
            display: this.state.activeMeniId == 1 ? "inherit" : "none"
          }}
        >
          <DodajNovuSalu />
        </div>
        <div
          id="prikazSalaDiv"
          style={{
            display: this.state.activeMeniId == 2 ? "inherit" : "none"
          }}
        >
          <PrikaziSaleForma />
        </div>
      </main>
    );
  }
}

export default Sale;
