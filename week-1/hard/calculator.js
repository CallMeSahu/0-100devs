/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
*/

class Calculator {
  constructor() {
    this.result;
  }
  add(num) {
    this.result = (this.result || 0) + num;
  }
  subtract(num) {
    this.result = (this.result || 0) - num;
  }
  multiply(num) {
    this.result = (this.result || 1) * num;
  }
  divide(num) {
    if (num === 0 || num === Infinity || num === -Infinity) {
      throw new Error(`Cannot divide by this ${num}`);
    }
    this.result = (this.result || 1) / num;
  }
  clear() {
    this.result = 0;
  }
  getResult() {
    return this.result;
  }
  calculate(string) {
    string = string.replace(/\s+/g, '');

    const containAlphabets = string.match(/[a-z,A-Z]/);

    if (containAlphabets) {
      throw new Error('Expression contain non number');
    }

    if (string.includes('/0')) {
      throw new Error('Invalid expression: Division by zero');
    }

    try {
      this.result = eval(string);

      // Check if the result is a finite number
      if (!isFinite(this.result)) {
        throw new Error('Invalid expression: Result is not a finite number');
      }
    } catch (error) {
      throw new Error('Invalid expression: Unable to evaluate');
    }
  }
}

module.exports = Calculator;
