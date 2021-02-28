import React from "react";
import { shallow } from "enzyme";

import Form from "./FormCharlie";

describe("<Form/> tests", () => {
  let component;

  beforeEach(() => {
    component = shallow(<Form />);
  });

  it("should render the form", () => {
    expect(component.find("[className='form-group']").exists()).toBe(true);
  });

  it("shouldn't render an alert initially", () => {
    component.setState({ validationError: false });
    expect(component.find("[className='alert alert-danger']").exists()).toBe(
      false
    );
  });

  it("should render an alert when error is set to true", () => {
    component.setState({
      validationError: true,
      validationErrorMessage: "Validation failed"
    });
    expect(component.find("[className='alert alert-danger']").exists()).toBe(
      true
    );
  });

  it("should render an alert when error is set to true", () => {
    component.setState({
      validationError: true,
      validationErrorMessage: "Validation failed"
    });
    expect(
      component.find("[className='fas fa-exclamation-triangle']").exists()
    ).toBe(true);
  });
});
