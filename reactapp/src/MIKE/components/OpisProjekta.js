import React from "react";


class OpisProjekta extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
    
        
      }
render() {
    return (
      <form >
        <label>
          Opis projekta:
        </label> 
        <br/>
        <textarea></textarea>
        <br/>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default OpisProjekta;
