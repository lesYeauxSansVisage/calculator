// Save the first operand, second operand and operator in a variable
// Every time the user clicks a button, it should add to the first operand
// After clicking an operator, the next click on the operands should go to the second operand to be evaluated
// Finnaly, after clicking the =, the computer should take the two operand and evaluates the results
// Now the first operand should be equal to the result

const operands = document.querySelectorAll(".operand");
const operators = document.querySelectorAll(".operator");
const evaluateBtn = document.getElementById("evaluate");
const resetBtn = document.getElementById("clear");
const display = document.getElementById("display");
const resultEl = document.getElementById("result");
const operationTextEl = document.getElementById("operation-text");

let firstNumber = "";
let secondNumber = "";
let operator = "";
let result = 0;
let operationText = "";

operands.forEach((operand) => {
  operand.addEventListener("click", () => {
    if (operator) {
      secondNumber += operand.value;
      resultEl.textContent = secondNumber;
      operationText = `${firstNumber} ${operator} ${secondNumber} `;
      changeOperationText(operationText);
    } else if (!operator && result == 0) {
      firstNumber += operand.value;
      operationText += operand.value;
      changeOperationText(operationText);
      resultEl.textContent = firstNumber;
    }
  });
});

operators.forEach((signal) => {
  signal.addEventListener("click", () => {
    if (!operator && firstNumber) {
      operator = signal.value;
      operationText = `${firstNumber} ${operator} `;
      changeOperationText(operationText);
    } else if (firstNumber && operator) {
      result = evaluateResult(operator, firstNumber, secondNumber);
      firstNumber = String(result);
      secondNumber = "";
      operator = signal.value;
      resultEl.innerText = result;
      operationText = `${result} ${operator}`;
      changeOperationText(operationText);
    }
  });
});

evaluateBtn.addEventListener("click", () => {
  if (firstNumber && secondNumber && operator) {
    result = evaluateResult(operator, firstNumber, secondNumber);
    firstNumber = String(result);
    secondNumber = "";
    operator = "";
    if (result) {
      operationText += " =";
      changeOperationText(operationText);
      resultEl.innerText = result;
    }
  } else if (firstNumber) {
    operationText = `${firstNumber} `;
    changeOperationText(operationText);
  }
});

resetBtn.addEventListener("click", resetCalculator);

function sum(a, b) {
  return a + b;
}

function divide(a, b) {
  if (b !== 0) {
    return a / b;
  }
  resetCalculator();
  result.innerText = "JUST DON'T";
  return "";
}

function multiply(a, b) {
  return a * b;
}

function subtract(a, b) {
  return a - b;
}

function evaluateResult(signal, a, b) {
  a = Number(a);
  b = Number(b);
  switch (signal) {
    case "+":
      return sum(a, b);
      break;
    case "-":
      return subtract(a, b);
      break;
    case "*":
      return multiply(a, b);
      break;
    case "/":
      return divide(a, b);
      break;
    default:
      break;
  }
}

function resetCalculator() {
  firstNumber = "";
  secondNumber = "";
  operator = "";
  result = 0;
  operationText = "";
  operationTextEl.innerText = "";
  resultEl.innerText = "";
}

function changeOperationText(text) {
  operationTextEl.innerText = text;
}
