import React, { Component } from "react";
import "./Calculator.css";

import Button from "../components/Button";
import Display from "../components/Display";

const initialState = {
  displayValue: "0",
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
};

export default class Calculator extends Component {
  state = { ...initialState };

  // Resets the state to the initial state
  clearMemory = (_) => {
    this.setState({ ...initialState });
  };

  setOperation = (op) => {
    console.log(this.state)
    if (this.state.current === 0) {
      this.setState({ operation: op, clearDisplay: true, current: 1});
    } else {
      if (op !== "=") {
        const values = [ ...this.state.values ];
        let calculated;
        try {
          calculated = eval(`${values[0]} ${this.state.operation} ${values[1]}`);
        } catch (e) {
          console.error(e);
        }
        values[0] = calculated;
        values[1] = 0;

        console.log(calculated)
        this.setState({
          operation: op,
          clearDisplay: true,
          displayValue: calculated.toString(),
          values,
          current: 1
        });
      } else {
        const values = [ ...this.state.values ];
        let calculatedEq;
        try {
          calculatedEq = eval(`${values[0]} ${this.state.operation} ${values[1]}`);
        } catch (e) {
          console.error(e);
        }
        values[0] = calculatedEq;
        values[1] = 0;

        this.setState({
          operation: null,
          clearDisplay: false,
          displayValue: calculatedEq.toString(),
          values,
          current: 0
        })
      }
    }
  };

  setDigit = (n) => {
    if (n === "." && this.state.displayValue.includes(".")) {
      return; // Don't do anything
    }

    const clearDisplay =
      this.state.displayValue === "0" || this.state.clearDisplay;
    const currentValue = clearDisplay ? "" : this.state.displayValue;
    const displayValue = currentValue + n;
    // Sets new state
    this.setState({ displayValue, clearDisplay: false});

    if (n !== ".") {
      const i = this.state.current;
      const newValue = parseFloat(displayValue);
      const values = [...this.state.values];
      values[i] = newValue;
      this.setState({ values });
    }
  };

  render() {
    return (
      <div className="Calculator">
        <Display value={this.state.displayValue} />
        <Button label="AC" click={this.clearMemory} triple />
        <Button label="/" click={this.setOperation} operation />
        <Button label="7" click={this.setDigit} />
        <Button label="8" click={this.setDigit} />
        <Button label="9" click={this.setDigit} />
        <Button label="*" click={this.setOperation} operation />
        <Button label="4" click={this.setDigit} />
        <Button label="5" click={this.setDigit} />
        <Button label="6" click={this.setDigit} />
        <Button label="-" click={this.setOperation} operation />
        <Button label="1" click={this.setDigit} />
        <Button label="2" click={this.setDigit} />
        <Button label="3" click={this.setDigit} />
        <Button label="+" click={this.setOperation} operation />
        <Button label="0" click={this.setDigit} double />
        <Button label="." click={this.setDigit} />
        <Button label="=" click={this.setOperation} operation />
      </div>
    );
  }
}
