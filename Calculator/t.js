class Calculator {
  constructor(_previousOperandEl, _currentOperandEl) {
    this.previousOperandEl = _previousOperandEl;
    this.currentOperandEl = _currentOperandEl;
    this.clear();
  }
  clear() {
    this.previousOperand = ``;
    this.currentOperand = ``;
    this.operation = undefined;
  }
  delete() {
    this.currentOperand = this.currentOperand.slice(0, -1);
  }
  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand + number;
  }
  getDisplayNumber(number) {
    number = String(number);
    const integerNumber = parseFloat(number.split(".")[0]);
    const decimalNumber = number.split(".")[1];
    let integerDisplay;
    if (isNaN(integerNumber)) {
      integerDisplay = ``;
    } else {
      integerDisplay = integerNumber.toLocaleString(`en`, {
        maximumFractionDigits: 0,
      });
    }
    if (decimalNumber != null) {
      return `${integerDisplay}.${decimalNumber}`;
    }
    return integerDisplay;
  }
  chooseOperation(operation) {
    if (this.previousOperand && this.currentOperand === "") {
      this.operation = operation;
      return;
    }
    this.compute();
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = ``;
  }
  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case `+`:
        computation = prev + current;
        break;
      case `-`:
        computation = prev - current;
        break;
      case `*`:
        computation = prev * current;
        break;
      case `/`:
        computation = prev / current;
        break;
    }
    this.currentOperand = String(computation);
    this.operation = undefined;
    this.previousOperand = ``;
  }
  updateDisplay() {
    this.currentOperandEl.textContent = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation) {
      this.previousOperandEl.textContent = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandEl.textContent = ``;
    }
  }
}

const numbersBtns = [...document.querySelectorAll(`[data-number]`)];
const operationsBtns = [...document.querySelectorAll(`[data-operation]`)];
const clearAllBtn = document.querySelector(`[data-clear-all]`);
const deleteBtn = document.querySelector(`[data-delete]`);
const equalsBtn = document.getElementById(`equal`);
const output = document.getElementById(`output`);
const previousOperandEl = document.getElementById(`previous-operand`);
const currentOperandEl = document.getElementById(`current-operand`);
const calculator = new Calculator(previousOperandEl, currentOperandEl);

numbersBtns.forEach((number) => {
  number.addEventListener(`click`, () => {
    calculator.appendNumber(number.textContent);
    calculator.updateDisplay();
  });
});
operationsBtns.forEach((operation) => {
  operation.addEventListener(`click`, () => {
    calculator.chooseOperation(operation.textContent);
    calculator.updateDisplay();
  });
});
equalsBtn.addEventListener(`click`, () => {
  calculator.compute();
  calculator.updateDisplay();
});
clearAllBtn.addEventListener(`click`, () => {
  calculator.clear();
  calculator.updateDisplay();
});
deleteBtn.addEventListener(`click`, () => {
    calculator.delete();
  calculator.updateDisplay();
});

/* add keyboard event listeners */
const btns = [...document.getElementsByTagName("button")];
document.addEventListener(`keydown`, ({ key }) => {
  btns.forEach((btn) => {
    if (btn.textContent.toLowerCase() === key) btn.click();
  });
});
