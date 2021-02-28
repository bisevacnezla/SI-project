import React, { Component } from "react";
import PropTypes from "prop-types";

const validate = (e, validations) => {
  return validations
    .map(validation => {
      if (validation === "required" && e.target.value.length === 0)
        return "Polje je obavezno!";
      else if (validation === "deep" && e.target.value.length === 0)
        return "Polje je deep!";
      return "";
    })
    .filter(res => res.length > 0);
};

class FormCharlie extends Component {
  state = { validationError: false, validationErrorMessage: "" };

  render() {
    return (
      <div className="form-group">
       
        {this.state.validationError && (
          <div className="alert alert-danger" role="alert">
            <i
              className="fas fa-exclamation-triangle"
              style={{ marginRight: "5px" }}
            />
            {this.state.validationErrorMessage}
          </div>
        )}
        <textarea
                    autoFocus={this.props.autoFocus}
                    className="form-control"
                    id={this.props.id}
                    placeholder={this.props.placeholder}
                    rows="15"
                    onBlur={e => {
                      const validationResult = validate(e, this.props.validations);
                      let validationErrorMessage = "";
                      validationResult.forEach(el => {
                        validationErrorMessage += el + " ";
                      });
                      this.setState({
                        validationError: validationResult.length > 0,
                        validationErrorMessage
                      });
                    }}
        />
        
      </div>
    );
  }
}

const { array, bool, string } = PropTypes;
FormCharlie.propTypes = {
  autofocus: bool,
  id: string,
  placeholder: string,
  validaitons: array
};

FormCharlie.defautProps = {
  placeholder: "",
  autoFocus: false
};

export default FormCharlie;
