import React from "react";

class LeftMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeDivId: 1, //open pokazuje da li formu treba prikazati ili ne
      professorId: -1
    };
  }

  changeActiveId(id) {
    this.props.triggerChangeActiveId(id);
  }
    changeProfessorId(id) {
        this.props.triggerChangeProfessorId(id);
    }
  render() {
    return (
      <div>
        <button
          type="button"
          className="btn btn-primary left-buttons"
          id="moj"
          onClick={() => {
              this.changeActiveId(1);
              this.changeProfessorId(-1);
          }}
        >
          Termini
        </button>
        <button
          type="button"
          className="btn btn-primary left-buttons"
          id="moj"
          onClick={() => this.changeActiveId(2)}
        >
          Sale
        </button>
        <button
          type="button"
          className="btn btn-primary left-buttons"
          id="moj"
          onClick={() => this.changeActiveId(3)}
        >
          Kalendar
        </button>
        <button
          type="button"
          className="btn btn-primary left-buttons"
          id="moj"
          onClick={() => this.changeActiveId(4)}
        >
          Pretraga profesora
        </button>
        <button
          type="button"
          className="btn btn-primary left-buttons"
          id="moj"
          onClick={() => this.changeActiveId(5)}
        >
          Kreiranje rasporeda
        </button>
      </div>
    );
  }
}

export default LeftMenu;
